import { useEffect, useMemo, useState } from 'react'
import './ImposterGame.css'

type PlayerRole = 'Crew' | 'Imposter'
type GamePhase = 'SETUP' | 'ROLE_ASSIGNMENT' | 'PLAYING' | 'DISCUSSION' | 'VOTING' | 'RESULT' | 'GAME_OVER'

type Player = {
  id: number
  name: string
  role: PlayerRole
  alive: boolean
}

type VoteMap = Record<number, number>

type SubmittedVote = {
  voterId: number
  targetId: number
}

const DEFAULT_PLAYER_COUNT = 12
const DEFAULT_IMPOSTER_COUNT = 2
const DISCUSSION_SECONDS = 60
const VOTING_SECONDS = 30

const clampPlayers = (value: number) => Math.min(100, Math.max(5, value))

const getDefaultImposterCount = (count: number) => {
  const suggested = Math.max(1, Math.round(count / 6))
  return Math.min(suggested, count - 1)
}

const getDefaultPlayerNames = (count: number) =>
  Array.from({ length: count }, (_, index) => `Player ${index + 1}`)

const makeUniqueNames = (names: string[]) => {
  const seen = new Map<string, number>()

  return names.map((name, index) => {
    const trimmed = name.trim() || `Player ${index + 1}`
    const key = trimmed.toLowerCase()
    const usedCount = seen.get(key) ?? 0
    seen.set(key, usedCount + 1)

    if (usedCount > 0) {
      return `${trimmed} ${usedCount + 1}`
    }

    return trimmed
  })
}

const shuffle = <T,>(items: T[]) => {
  const next = [...items]

  for (let index = next.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[next[index], next[swapIndex]] = [next[swapIndex], next[index]]
  }

  return next
}

const createPlayers = (names: string[], imposterCount: number): Player[] => {
  const safeCount = Math.min(names.length, Math.max(5, names.length))
  const ids = Array.from({ length: safeCount }, (_, index) => index)
  const shuffledIds = shuffle(ids)
  const imposterIds = new Set(shuffledIds.slice(0, Math.min(imposterCount, safeCount - 1)))

  return names.slice(0, safeCount).map((name, index) => ({
    id: index + 1,
    name,
    role: imposterIds.has(index) ? 'Imposter' : 'Crew',
    alive: true,
  }))
}

const getAlivePlayers = (players: Player[]) => players.filter((player) => player.alive)

const getWinningSide = (players: Player[]): 'Crew' | 'Imposter' | null => {
  const alivePlayers = getAlivePlayers(players)
  const impostersRemaining = alivePlayers.filter((player) => player.role === 'Imposter').length
  const crewRemaining = alivePlayers.filter((player) => player.role === 'Crew').length

  if (impostersRemaining === 0) return 'Crew'
  if (impostersRemaining >= crewRemaining) return 'Imposter'

  return null
}

const ImposterGame = () => {
  const [playerCount, setPlayerCount] = useState(DEFAULT_PLAYER_COUNT)
  const [imposterCount, setImposterCount] = useState(DEFAULT_IMPOSTER_COUNT)
  const [playerNames, setPlayerNames] = useState<string[]>(() => getDefaultPlayerNames(DEFAULT_PLAYER_COUNT))
  const [phase, setPhase] = useState<GamePhase>('SETUP')
  const [players, setPlayers] = useState<Player[]>(() => createPlayers(getDefaultPlayerNames(DEFAULT_PLAYER_COUNT), DEFAULT_IMPOSTER_COUNT))
  const [round, setRound] = useState(1)
  const [revealIndex, setRevealIndex] = useState(0)
  const [showRole, setShowRole] = useState(false)
  const [discussionTimeLeft, setDiscussionTimeLeft] = useState(DISCUSSION_SECONDS)
  const [votingTimeLeft, setVotingTimeLeft] = useState(VOTING_SECONDS)
  const [votes, setVotes] = useState<VoteMap>({})
  const [votingOrder, setVotingOrder] = useState<number[]>([])
  const [currentVoterIndex, setCurrentVoterIndex] = useState(0)
  const [selectedVoteTarget, setSelectedVoteTarget] = useState<number | null>(null)
  const [lastEjected, setLastEjected] = useState<Player | null>(null)
  const [winner, setWinner] = useState<'Crew' | 'Imposter' | null>(null)
  const [roundSummary, setRoundSummary] = useState('')

  const alivePlayers = useMemo(() => getAlivePlayers(players), [players])
  const aliveImposters = useMemo(
    () => alivePlayers.filter((player) => player.role === 'Imposter').length,
    [alivePlayers],
  )
  const aliveCrew = useMemo(
    () => alivePlayers.filter((player) => player.role === 'Crew').length,
    [alivePlayers],
  )

  const currentRevealPlayer = players[revealIndex] ?? null
  const currentVoter = votingOrder[currentVoterIndex] ? players.find((player) => player.id === votingOrder[currentVoterIndex]) ?? null : null
  const voteTargets = useMemo(
    () =>
      players.filter(
        (player) => player.alive && player.id !== currentVoter?.id,
      ),
    [currentVoter, players],
  )

  const resetSetup = () => {
    const nextNames = makeUniqueNames(playerNames)
    setPlayerNames(nextNames)
    setPhase('SETUP')
    setRound(1)
    setRevealIndex(0)
    setShowRole(false)
    setDiscussionTimeLeft(DISCUSSION_SECONDS)
    setVotingTimeLeft(VOTING_SECONDS)
    setVotes({})
    setVotingOrder([])
    setCurrentVoterIndex(0)
    setSelectedVoteTarget(null)
    setLastEjected(null)
    setWinner(null)
    setRoundSummary('')
  }

  const updatePlayerCount = (value: number) => {
    const nextCount = clampPlayers(value)
    setPlayerCount(nextCount)
    setImposterCount((prev) => Math.min(Math.max(1, prev), nextCount - 1))

    setPlayerNames((prev) => {
      const nextNames = [...prev]

      while (nextNames.length < nextCount) {
        nextNames.push(`Player ${nextNames.length + 1}`)
      }

      while (nextNames.length > nextCount) {
        nextNames.pop()
      }

      return makeUniqueNames(nextNames)
    })
  }

  const updatePlayerName = (index: number, value: string) => {
    setPlayerNames((prev) => {
      const next = [...prev]
      next[index] = value
      return makeUniqueNames(next)
    })
  }

  const assignRoles = () => {
    const safeNames = makeUniqueNames(playerNames).slice(0, playerCount)
    const minimumImposters = Math.min(Math.max(1, imposterCount), safeNames.length - 1)
    const finalPlayers = createPlayers(safeNames, minimumImposters)

    setPlayers(finalPlayers)
    setRound(1)
    setRevealIndex(0)
    setShowRole(false)
    setPhase('ROLE_ASSIGNMENT')
    setLastEjected(null)
    setWinner(null)
    setRoundSummary('')
    setVotes({})
    setVotingOrder([])
    setSelectedVoteTarget(null)
    setCurrentVoterIndex(0)
  }

  const restartWithSameConfig = () => {
    const nextNames = makeUniqueNames(playerNames).slice(0, playerCount)
    const nextPlayers = createPlayers(nextNames, imposterCount)
    setPlayers(nextPlayers)
    setRound(1)
    setRevealIndex(0)
    setShowRole(false)
    setPhase('ROLE_ASSIGNMENT')
    setLastEjected(null)
    setWinner(null)
    setRoundSummary('')
    setVotes({})
    setVotingOrder([])
    setSelectedVoteTarget(null)
    setCurrentVoterIndex(0)
  }

  const goToSetup = () => {
    setPhase('SETUP')
    setPlayers([])
    setRound(1)
    setRevealIndex(0)
    setShowRole(false)
    setDiscussionTimeLeft(DISCUSSION_SECONDS)
    setVotingTimeLeft(VOTING_SECONDS)
    setVotes({})
    setVotingOrder([])
    setCurrentVoterIndex(0)
    setSelectedVoteTarget(null)
    setLastEjected(null)
    setWinner(null)
    setRoundSummary('')
  }

  const startDiscussion = () => {
    setDiscussionTimeLeft(DISCUSSION_SECONDS)
    setPhase('DISCUSSION')
    setSelectedVoteTarget(null)
  }

  const buildVotingOrder = () => {
    const alive = getAlivePlayers(players)
    const order = shuffle(alive.map((player) => player.id))
    setVotingOrder(order)
    setCurrentVoterIndex(0)
    setSelectedVoteTarget(null)
    setVotes({})
  }

  const startVoting = () => {
    buildVotingOrder()
    setVotingTimeLeft(VOTING_SECONDS)
    setPhase('VOTING')
  }

  const finishRoleReveal = () => {
    const nextIndex = revealIndex + 1
    if (nextIndex >= players.length) {
      setPhase('PLAYING')
      setRound(1)
      setRevealIndex(0)
      setShowRole(false)
      return
    }

    setRevealIndex(nextIndex)
    setShowRole(false)
  }

  const finalizeVotingRound = (currentVotes: VoteMap) => {
    const voteCounts: Record<number, number> = {}

    Object.values(currentVotes).forEach((targetId) => {
      voteCounts[targetId] = (voteCounts[targetId] ?? 0) + 1
    })

    const entries = Object.entries(voteCounts)
    const sorted = [...entries].sort((a, b) => Number(b[1]) - Number(a[1]))

    if (!sorted.length) {
      setRoundSummary('No votes were cast. The round continues without an ejection.')
      setLastEjected(null)
      setPhase('RESULT')
      return
    }

    const topCount = Number(sorted[0][1])
    const topCandidates = sorted.filter(([, count]) => Number(count) === topCount)

    if (topCandidates.length > 1) {
      setLastEjected(null)
      setRoundSummary('TIE — no player is eliminated this round.')
      setPhase('RESULT')
      return
    }

    const eliminatedId = Number(topCandidates[0][0])
    const eliminatedPlayer = players.find((player) => player.id === eliminatedId)
    if (!eliminatedPlayer) {
      setLastEjected(null)
      setRoundSummary('The vote ended without a valid target.')
      setPhase('RESULT')
      return
    }

    setPlayers((currentPlayers) =>
      currentPlayers.map((player) =>
        player.id === eliminatedId ? { ...player, alive: false } : player,
      ),
    )
    setLastEjected(eliminatedPlayer)

    const voteSummary = Object.entries(currentVotes).reduce<Record<number, number>>((acc, [, targetId]) => {
      acc[targetId] = (acc[targetId] ?? 0) + 1
      return acc
    }, {})

    const resultText = Object.entries(voteSummary)
      .map(([targetId, count]) => {
        const player = players.find((entry) => entry.id === Number(targetId))
        return `${player?.name ?? 'Unknown'}: ${count} vote${count > 1 ? 's' : ''}`
      })
      .join(' | ')

    setRoundSummary(`Voting results: ${resultText}. ${eliminatedPlayer.name} has been ejected.`)
    setPhase('RESULT')
  }

  const continueAfterResult = () => {
    if (lastEjected) {
      const nextWinner = getWinningSide(players)
      if (nextWinner) {
        setWinner(nextWinner)
        setPhase('GAME_OVER')
        return
      }
    }

    if (!lastEjected) {
      const nextWinner = getWinningSide(players)
      if (nextWinner) {
        setWinner(nextWinner)
        setPhase('GAME_OVER')
        return
      }
    }

    setRound((currentRound) => currentRound + 1)
    setPhase('PLAYING')
    setLastEjected(null)
    setRoundSummary('')
    setSelectedVoteTarget(null)
    setVotes({})
    setVotingOrder([])
    setCurrentVoterIndex(0)
  }

  useEffect(() => {
    if (phase !== 'DISCUSSION') return

    const timer = window.setInterval(() => {
      setDiscussionTimeLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer)
          startVoting()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => window.clearInterval(timer)
  }, [phase])

  useEffect(() => {
    if (phase !== 'VOTING') return

    const timer = window.setInterval(() => {
      setVotingTimeLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer)
          finalizeVotingRound(votes)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => window.clearInterval(timer)
  }, [phase, votes])

  useEffect(() => {
    if (phase !== 'ROLE_ASSIGNMENT' || !currentRevealPlayer) return
    setShowRole(false)
  }, [phase, currentRevealPlayer])

  const handleConfirmVote = () => {
    if (!currentVoter || selectedVoteTarget === null) return

    const nextVotes = { ...votes, [currentVoter.id]: selectedVoteTarget }
    setVotes(nextVotes)

    const nextIndex = currentVoterIndex + 1
    if (nextIndex >= votingOrder.length) {
      finalizeVotingRound(nextVotes)
      return
    }

    setCurrentVoterIndex(nextIndex)
    setSelectedVoteTarget(null)
  }

  const settingsReady = playerCount >= 5 && playerCount <= 100 && imposterCount >= 1 && imposterCount < playerCount

  const renderSetup = () => (
    <div className="setup-screen">
      <div className="screen-header">
        <h2>Game Setup</h2>
        <p>Configure the lobby, names, and imposter count.</p>
      </div>

      <div className="setup-grid">
        <div className="setup-card">
          <label htmlFor="player-count">Players: {playerCount}</label>
          <input
            id="player-count"
            type="range"
            min={5}
            max={100}
            value={playerCount}
            onChange={(event) => updatePlayerCount(Number(event.target.value))}
          />
        </div>

        <div className="setup-card">
          <label htmlFor="imposter-count">Imposters: {imposterCount}</label>
          <input
            id="imposter-count"
            type="number"
            min={1}
            max={Math.max(1, playerCount - 1)}
            value={imposterCount}
            onChange={(event) => {
              const nextValue = Number(event.target.value)
              setImposterCount(Math.min(Math.max(1, nextValue), Math.max(1, playerCount - 1)))
            }}
          />
        </div>
      </div>

      <div className="name-list">
        <h3>Player Names</h3>
        <div className="name-grid">
          {playerNames.map((name, index) => (
            <label key={`player-${index + 1}`} className="name-field">
              <span>Player {index + 1}</span>
              <input
                value={name}
                onChange={(event) => updatePlayerName(index, event.target.value)}
                placeholder={`Player ${index + 1}`}
              />
            </label>
          ))}
        </div>
      </div>

      {!settingsReady && (
        <div className="validation-box">
          Enter between 5 and 100 players and make sure the imposter count is less than the total player count.
        </div>
      )}

      <div className="setup-actions">
        <button type="button" className="button button--primary" disabled={!settingsReady} onClick={assignRoles}>
          Start Game
        </button>
      </div>
    </div>
  )

  const renderRoleAssignment = () => {
    if (!currentRevealPlayer) return null

    return (
      <div className="role-assignment-screen">
        <div className="screen-header">
          <h2>Role Assignment</h2>
          <p>Pass the device to {currentRevealPlayer.name}</p>
        </div>

        {!showRole ? (
          <div className="reveal-prompt">
            <button type="button" className="button button--primary" onClick={() => setShowRole(true)}>
              Reveal My Role
            </button>
          </div>
        ) : (
          <div className="role-card">
            <span className="role-label">Your role</span>
            <h3 className={currentRevealPlayer.role === 'Imposter' ? 'role-imposter' : 'role-crew'}>
              {currentRevealPlayer.role}
            </h3>
            <p>
              {currentRevealPlayer.role === 'Imposter'
                ? 'Your objective: eliminate the Crew without being discovered. Stay hidden and mislead the group.'
                : 'Your objective: find and eliminate all imposters. Work together and vote carefully.'}
            </p>

            {currentRevealPlayer.role === 'Imposter' && (
              <div className="fellow-imposters">
                <strong>Your fellow imposters:</strong>
                <ul>
                  {players
                    .filter((player) => player.role === 'Imposter' && player.id !== currentRevealPlayer.id)
                    .map((player) => (
                      <li key={player.id}>{player.name}</li>
                    ))}
                </ul>
              </div>
            )}

            <button type="button" className="button button--secondary" onClick={finishRoleReveal}>
              Hide Role
            </button>
          </div>
        )}
      </div>
    )
  }

  const renderPlaying = () => (
    <div className="playing-screen">
      <div className="screen-header">
        <h2>Round {round}</h2>
        <p>Alive Players: {alivePlayers.length}</p>
      </div>

      <div className="info-grid">
        <div className="info-box"><span>Alive</span><strong>{alivePlayers.length}</strong></div>
        <div className="info-box info-box--imposter"><span>Imposters</span><strong>{aliveImposters}</strong></div>
        <div className="info-box info-box--crew"><span>Crew</span><strong>{aliveCrew}</strong></div>
      </div>

      <div className="player-list-panel">
        <h3>Players</h3>
        <div className="player-grid">
          {players.map((player) => (
            <div key={player.id} className={`player-card ${player.alive ? 'alive' : 'eliminated'}`}>
              <span>{player.name}</span>
              <small>{player.alive ? 'Alive' : 'Ejected'}</small>
            </div>
          ))}
        </div>
      </div>

      <div className="action-row">
        <button type="button" className="button button--primary" onClick={startDiscussion}>
          Start Discussion
        </button>
      </div>
    </div>
  )

  const renderDiscussion = () => (
    <div className="phase-screen">
      <div className="screen-header">
        <h2>Discussion</h2>
        <p>Discuss who you think is the Imposter.</p>
      </div>

      <div className="timer-box">Time remaining: {discussionTimeLeft}s</div>

      <div className="action-row">
        <button type="button" className="button button--primary" onClick={startVoting}>
          Start Voting Now
        </button>
      </div>
    </div>
  )

  const renderVoting = () => (
    <div className="phase-screen">
      <div className="screen-header">
        <h2>Voting</h2>
        <p>
          {currentVoter ? `${currentVoter.name} is voting...` : 'Preparing votes...'}
        </p>
      </div>

      <div className="timer-box timer-box--warning">Time remaining: {votingTimeLeft}s</div>

      <div className="voting-panel">
        <h3>Who do you think is the Imposter?</h3>
        <div className="vote-options">
          {voteTargets.map((player) => (
            <button
              key={player.id}
              type="button"
              className={`vote-option ${selectedVoteTarget === player.id ? 'selected' : ''}`}
              onClick={() => setSelectedVoteTarget(player.id)}
              disabled={!currentVoter}
            >
              {player.name}
            </button>
          ))}
        </div>

        <div className="vote-status">
          {currentVoter ? `${Object.keys(votes).length} / ${votingOrder.length} votes submitted` : 'Waiting for voter...'}
        </div>

        <div className="action-row">
          <button type="button" className="button button--primary" onClick={handleConfirmVote} disabled={!currentVoter || selectedVoteTarget === null}>
            Confirm Vote
          </button>
        </div>
      </div>
    </div>
  )

  const renderResult = () => (
    <div className="phase-screen">
      <div className="screen-header">
        <h2>Voting Results</h2>
      </div>

      <div className="result-box">
        {lastEjected ? (
          <>
            <p>{lastEjected.name} was...</p>
            <h3 className={lastEjected.role === 'Imposter' ? 'role-imposter' : 'role-crew'}>{lastEjected.role}</h3>
          </>
        ) : (
          <>
            <p>Tie</p>
            <h3>No player was ejected.</h3>
          </>
        )}
        <p>{roundSummary}</p>
      </div>

      <div className="action-row">
        <button type="button" className="button button--primary" onClick={continueAfterResult}>
          Continue
        </button>
      </div>
    </div>
  )

  const renderGameOver = () => (
    <div className="game-over-screen">
      <div className="screen-header">
        <h2>Game Over</h2>
        <p>{winner === 'Crew' ? '🎉 CREW WINS!' : '😈 IMPOSTERS WIN!'}</p>
      </div>

      <div className="final-summary">
        <div className="summary-box">
          <span>Rounds Played</span>
          <strong>{round}</strong>
        </div>
        <div className="summary-box">
          <span>Players</span>
          <strong>{playerCount}</strong>
        </div>
        <div className="summary-box">
          <span>Imposters</span>
          <strong>{imposterCount}</strong>
        </div>
      </div>

      <div className="final-roles">
        <h3>Final Roles</h3>
        <div className="reveal-grid">
          {players.map((player) => (
            <div key={player.id} className={`reveal-card ${player.role === 'Imposter' ? 'is-imposter' : 'is-crew'}`}>
              <strong>{player.name}</strong>
              <span>{player.role}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="action-row action-row--stacked">
        <button type="button" className="button button--primary" onClick={restartWithSameConfig}>
          Play Again
        </button>
        <button type="button" className="button button--secondary" onClick={goToSetup}>
          New Game
        </button>
        <a href="/" className="button button--secondary">
          Back to Home
        </a>
      </div>
    </div>
  )

  return (
    <section className="imposter-page">
      <div className="imposter-shell">
        <div className="imposter-header">
          <div>
            <p className="imposter-kicker">Social Match</p>
            <h1>Imposter Game</h1>
          </div>
          <a href="/" className="button button--secondary">
            Back to home
          </a>
        </div>

        <div className="imposter-panel">
          {phase === 'SETUP' && renderSetup()}
          {phase === 'ROLE_ASSIGNMENT' && renderRoleAssignment()}
          {phase === 'PLAYING' && renderPlaying()}
          {phase === 'DISCUSSION' && renderDiscussion()}
          {phase === 'VOTING' && renderVoting()}
          {phase === 'RESULT' && renderResult()}
          {phase === 'GAME_OVER' && renderGameOver()}
        </div>
      </div>
    </section>
  )
}

export default ImposterGame
