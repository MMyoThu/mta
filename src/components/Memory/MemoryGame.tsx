import { useEffect, useMemo, useRef, useState } from 'react'
import iconAngular from '../../assets/icons/frontend/angular.jpg'
import iconJavascript from '../../assets/icons/frontend/javascript.jpg'
import iconReact from '../../assets/icons/frontend/react.jpg'
import iconTypescript from '../../assets/icons/frontend/typescript.jpg'
import iconJava from '../../assets/icons/backend/java.jpg'
import iconSpringboot from '../../assets/icons/backend/springboot.jpg'
import iconMysql from '../../assets/icons/database/mysql.jpg'
import iconPostgresql from '../../assets/icons/database/postgresql.jpg'
import iconGit from '../../assets/icons/devops/git.jpg'
import iconDocker from '../../assets/icons/devops/docker.jpg'
import iconAws from '../../assets/icons/devops/aws.jpg'
import iconKubernetes from '../../assets/icons/devops/kubernetes.jpg'
import './MemoryGame.css'

type Difficulty = 'easy' | 'medium' | 'hard'
type GameStatus = 'idle' | 'playing' | 'won'

type TechPair = {
  id: string
  label: string
  icon: string
}

type MemoryCard = {
  uid: string
  pairId: string
  label: string
  icon: string
}

type BestScore = {
  moves: number
  time: number
}

const TECH_PAIRS: TechPair[] = [
  { id: 'java', label: 'Java', icon: iconJava },
  { id: 'spring', label: 'Spring', icon: iconSpringboot },
  { id: 'react', label: 'React', icon: iconReact },
  { id: 'angular', label: 'Angular', icon: iconAngular },
  { id: 'javascript', label: 'JavaScript', icon: iconJavascript },
  { id: 'typescript', label: 'TypeScript', icon: iconTypescript },
  { id: 'mysql', label: 'MySQL', icon: iconMysql },
  { id: 'postgres', label: 'PostgreSQL', icon: iconPostgresql },
  { id: 'docker', label: 'Docker', icon: iconDocker },
  { id: 'git', label: 'Git', icon: iconGit },
  { id: 'aws', label: 'AWS', icon: iconAws },
  { id: 'k8s', label: 'Kubernetes', icon: iconKubernetes },
]

const PAIR_COUNTS: Record<Difficulty, number> = {
  easy: 4,
  medium: 8,
  hard: 12,
}

const BEST_SCORES_KEY = 'portfolio-stack-match-best'

const shuffle = <T,>(items: T[]) => {
  const next = [...items]

  for (let index = next.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[next[index], next[swapIndex]] = [next[swapIndex], next[index]]
  }

  return next
}

const createDeck = (pairCount: number): MemoryCard[] => {
  const selected = shuffle(TECH_PAIRS).slice(0, pairCount)

  return shuffle(
    selected.flatMap((pair) => [
      { uid: `${pair.id}-a`, pairId: pair.id, label: pair.label, icon: pair.icon },
      { uid: `${pair.id}-b`, pairId: pair.id, label: pair.label, icon: pair.icon },
    ]),
  )
}

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const remainder = seconds % 60
  return `${minutes}:${String(remainder).padStart(2, '0')}`
}

const readBestScores = (): Partial<Record<Difficulty, BestScore>> => {
  try {
    const stored = localStorage.getItem(BEST_SCORES_KEY)
    return stored ? (JSON.parse(stored) as Partial<Record<Difficulty, BestScore>>) : {}
  } catch {
    return {}
  }
}

const isBetterScore = (current: BestScore, previous?: BestScore) => {
  if (!previous) return true
  if (current.moves !== previous.moves) return current.moves < previous.moves
  return current.time < previous.time
}

const MemoryGame = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>('medium')
  const [gameId, setGameId] = useState(0)
  const [selected, setSelected] = useState<string[]>([])
  const [matched, setMatched] = useState<Set<string>>(() => new Set())
  const [moves, setMoves] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const [status, setStatus] = useState<GameStatus>('idle')
  const [bestScores, setBestScores] = useState<Partial<Record<Difficulty, BestScore>>>(readBestScores)

  const lockRef = useRef(false)
  const timeoutRef = useRef<number | null>(null)

  const pairCount = PAIR_COUNTS[difficulty]
  const cards = useMemo(() => createDeck(pairCount), [pairCount, gameId])
  const best = bestScores[difficulty]

  const clearCompare = () => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    lockRef.current = false
  }

  const startNewGame = (nextDifficulty: Difficulty = difficulty) => {
    clearCompare()
    setDifficulty(nextDifficulty)
    setGameId((prev) => prev + 1)
    setSelected([])
    setMatched(new Set())
    setMoves(0)
    setElapsed(0)
    setStatus('idle')
  }

  useEffect(() => () => clearCompare(), [])

  useEffect(() => {
    if (status !== 'playing') return

    const timer = window.setInterval(() => {
      setElapsed((prev) => prev + 1)
    }, 1000)

    return () => window.clearInterval(timer)
  }, [status])

  useEffect(() => {
    if (status !== 'playing' || matched.size !== pairCount) return

    const result = { moves, time: elapsed }
    setStatus('won')
    setBestScores((prev) => {
      if (!isBetterScore(result, prev[difficulty])) return prev
      const next = { ...prev, [difficulty]: result }
      localStorage.setItem(BEST_SCORES_KEY, JSON.stringify(next))
      return next
    })
  }, [difficulty, elapsed, matched.size, moves, pairCount, status])

  const handleCardClick = (card: MemoryCard) => {
    if (lockRef.current || status === 'won' || matched.has(card.pairId) || selected.includes(card.uid)) {
      return
    }

    if (status === 'idle') {
      setStatus('playing')
    }

    if (selected.length === 0) {
      setSelected([card.uid])
      return
    }

    const first = cards.find((item) => item.uid === selected[0])
    if (!first) return

    setSelected([first.uid, card.uid])
    setMoves((prev) => prev + 1)
    lockRef.current = true

    const isMatch = first.pairId === card.pairId

    timeoutRef.current = window.setTimeout(() => {
      if (isMatch) {
        setMatched((prev) => new Set(prev).add(card.pairId))
      }
      setSelected([])
      lockRef.current = false
      timeoutRef.current = null
    }, isMatch ? 420 : 820)
  }

  const statusText =
    status === 'won'
      ? 'Every stack matched. Clean work.'
      : status === 'playing'
        ? 'Find the matching pair.'
        : 'Flip a card to start.'

  return (
    <section className="memory-page">
      <div className="memory-shell">
        <div className="memory-header">
          <div>
            <p className="memory-kicker">Memory Arena</p>
            <h1>Stack Match</h1>
          </div>
          <a href="/" className="button button--secondary">
            Back to home
          </a>
        </div>

        <div className="memory-panel">
          <div className="memory-panel__header">
            <div className="memory-modes" role="tablist" aria-label="Difficulty">
              {(['easy', 'medium', 'hard'] as Difficulty[]).map((option) => (
                <button
                  key={option}
                  type="button"
                  className={difficulty === option ? 'is-active' : ''}
                  onClick={() => startNewGame(option)}
                >
                  {option[0].toUpperCase() + option.slice(1)}
                </button>
              ))}
            </div>
            <button type="button" className="button button--primary" onClick={() => startNewGame()}>
              New game
            </button>
          </div>

          <div className="memory-stage">
            <div className="memory-scoreboard">
              <div className="memory-stat">
                <span>Moves</span>
                <strong>{moves}</strong>
              </div>
              <div className="memory-stat">
                <span>Time</span>
                <strong>{formatTime(elapsed)}</strong>
              </div>
              <div className="memory-stat">
                <span>Best</span>
                <strong>{best ? `${best.moves} / ${formatTime(best.time)}` : '—'}</strong>
              </div>
            </div>

            <div
              className="memory-board"
              data-size={difficulty}
              aria-label="Memory match board"
            >
              {cards.map((card) => {
                const isFaceUp = selected.includes(card.uid) || matched.has(card.pairId)
                const isMatched = matched.has(card.pairId)

                return (
                  <button
                    key={card.uid}
                    type="button"
                    className={`memory-card${isFaceUp ? ' is-flipped' : ''}${isMatched ? ' is-matched' : ''}`}
                    onClick={() => handleCardClick(card)}
                    aria-label={isFaceUp ? card.label : 'Hidden card'}
                    aria-pressed={isFaceUp}
                    disabled={status === 'won'}
                  >
                    <span className="memory-card__inner">
                      <span className="memory-card__face memory-card__face--back" aria-hidden="true">
                        {'{ }'}
                      </span>
                      <span className="memory-card__face memory-card__face--front">
                        <img src={card.icon} alt="" />
                        <em>{card.label}</em>
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>

            <div className="memory-status">
              <p>{statusText}</p>
            </div>

            {status === 'won' && (
              <div className="memory-win">
                <p>
                  {pairCount} pairs in {moves} moves · {formatTime(elapsed)}
                </p>
                <button type="button" className="button button--primary" onClick={() => startNewGame()}>
                  Play again
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MemoryGame
