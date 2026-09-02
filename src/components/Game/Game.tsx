import { useEffect, useMemo, useState } from 'react'
import './Game.css'

type GameMode = 'solo' | 'duel' | 'team'
type CellValue = 'X' | 'O' | null
type Winner = CellValue | 'draw' | null

const EMPTY_BOARD: CellValue[] = Array(9).fill(null)
const WINNING_LINES: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

const getWinner = (board: CellValue[]) => {
  for (const [a, b, c] of WINNING_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]
    }
  }

  return board.every(Boolean) ? 'draw' : null
}

const getAiMove = (board: CellValue[]) => {
  const availableMoves = board
    .map((value, index) => (value === null ? index : -1))
    .filter((index) => index !== -1)

  for (const move of availableMoves) {
    const testBoard = [...board]
    testBoard[move] = 'O'
    if (getWinner(testBoard) === 'O') {
      return move
    }
  }

  for (const move of availableMoves) {
    const testBoard = [...board]
    testBoard[move] = 'X'
    if (getWinner(testBoard) === 'X') {
      return move
    }
  }

  const preferredMoves = [4, 0, 2, 6, 8, 1, 3, 5, 7]
  return preferredMoves.find((move) => board[move] === null) ?? null
}

const Game = () => {
  const [mode, setMode] = useState<GameMode>('solo')
  const [board, setBoard] = useState<CellValue[]>(EMPTY_BOARD)
  const [turn, setTurn] = useState<'X' | 'O'>('X')
  const [winner, setWinner] = useState<Winner>(null)
  const [score, setScore] = useState({ X: 0, O: 0, draws: 0 })

  const modeLabel = useMemo(
    () => ({
      solo: 'Solo Match',
      duel: '1 vs 1 Duel',
      team: '2 vs 2 Team Match',
    }),
    [],
  )

  const currentPlayer = useMemo(() => {
    if (mode === 'solo') {
      return turn === 'X' ? 'You' : 'Computer'
    }

    if (mode === 'duel') {
      return turn === 'X' ? 'Player 1' : 'Player 2'
    }

    return turn === 'X' ? 'Team Red' : 'Team Blue'
  }, [mode, turn])

  const winnerText = useMemo(() => {
    if (winner === null) {
      if (mode === 'solo' && turn === 'O') return 'Computer is thinking...'
      if (mode === 'solo') return 'Your turn'
      return `${currentPlayer}'s turn`
    }

    if (winner === 'draw') {
      return 'This round is a draw. Excellent match!'
    }

    if (mode === 'solo') {
      return winner === 'X' ? '🎉 You win this round! Celebration time!' : '🎉 Computer wins this round! Great effort!'
    }

    if (mode === 'duel') {
      return winner === 'X' ? '🎉 Player 1 wins! Celebration time!' : '🎉 Player 2 wins! Celebration time!'
    }

    return winner === 'X' ? '🎉 Team Red wins! Celebration time!' : '🎉 Team Blue wins! Celebration time!'
  }, [currentPlayer, mode, turn, winner])

  const resetBoard = () => {
    setBoard(EMPTY_BOARD)
    setTurn('X')
    setWinner(null)
  }

  const resetScore = () => {
    setScore({ X: 0, O: 0, draws: 0 })
    resetBoard()
  }

  const handleMove = (index: number, nextTurn: 'X' | 'O') => {
    if (board[index] || winner) {
      return
    }

    const nextBoard = [...board]
    nextBoard[index] = nextTurn
    const roundWinner = getWinner(nextBoard)

    setBoard(nextBoard)

    if (roundWinner) {
      setWinner(roundWinner)
      if (roundWinner === 'draw') {
        setScore((prev) => ({ ...prev, draws: prev.draws + 1 }))
      } else {
        setScore((prev) => ({ ...prev, [roundWinner]: prev[roundWinner] + 1 }))
      }
      return
    }

    setTurn(nextTurn === 'X' ? 'O' : 'X')
  }

  useEffect(() => {
    if (mode !== 'solo' || winner || turn !== 'O') {
      return
    }

    const aiIndex = getAiMove(board)
    if (aiIndex === null) {
      return
    }

    const timer = window.setTimeout(() => {
      handleMove(aiIndex, 'O')
    }, 420)

    return () => window.clearTimeout(timer)
  }, [board, mode, turn, winner])

  const handleCellClick = (index: number) => {
    if (mode === 'solo' && turn === 'O') {
      return
    }

    handleMove(index, turn)
  }

  const changeMode = (nextMode: GameMode) => {
    setMode(nextMode)
    resetBoard()
  }

  return (
    <section className="game-page">
      <div className="game-shell">
        <div className="game-header">
          <div>
            <p className="game-kicker">Competition Arena</p>
            <h1>Play a quick match</h1>
          </div>
          <a href="/" className="button button--secondary">
            Back to home
          </a>
        </div>

        <div className="game-panel">
          <div className="game-panel__header">
            <div className="game-modes" role="tablist" aria-label="Game modes">
              {(['solo', 'duel', 'team'] as GameMode[]).map((option) => (
                <button
                  key={option}
                  type="button"
                  className={mode === option ? 'is-active' : ''}
                  onClick={() => changeMode(option)}
                >
                  {modeLabel[option]}
                </button>
              ))}
            </div>
            <div className="game-actions">
              <button type="button" className="button button--secondary" onClick={resetBoard}>
                New round
              </button>
              <button type="button" className="button button--primary" onClick={resetScore}>
                Reset score
              </button>
            </div>
          </div>

          <div className="game-stage">
            <div className="game-scoreboard">
              <div className="score-box score-box--x">
                <span>{mode === 'solo' ? 'You' : mode === 'duel' ? 'Player 1' : 'Team Red'}</span>
                <strong>{score.X}</strong>
              </div>
              <div className="score-box score-box--draw">
                <span>Draws</span>
                <strong>{score.draws}</strong>
              </div>
              <div className="score-box score-box--o">
                <span>{mode === 'solo' ? 'Computer' : mode === 'duel' ? 'Player 2' : 'Team Blue'}</span>
                <strong>{score.O}</strong>
              </div>
            </div>

            <div className="game-board" aria-label="Tic-tac-toe board">
              {board.map((cell, index) => (
                <button
                  key={index}
                  type="button"
                  className="game-cell"
                  onClick={() => handleCellClick(index)}
                  aria-label={`Cell ${index + 1}`}
                  disabled={Boolean(cell) || Boolean(winner)}
                >
                  {cell}
                </button>
              ))}
            </div>

            <div className="game-status">
              <p>{winnerText}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Game
