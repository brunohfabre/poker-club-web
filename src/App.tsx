import { useEffect, useState } from 'react'

import { Card } from './components/Card'
import { api } from './lib/api'

const suits = {
  c: 'clubs',
  h: 'hearts',
  s: 'spades',
  d: 'diamonds',
}

export function App() {
  const [loading, setLoading] = useState(true)
  const [deck, setDeck] = useState<string[]>([])
  const [fired, setFired] = useState<string[]>([])
  const [table, setTable] = useState<string[]>([])
  const [players, setPlayers] = useState<Record<string, string[]>>({})

  useEffect(() => {
    async function loadBoard() {
      try {
        setLoading(true)

        const response = await api.get('/')

        setDeck(response.data.deck)
        setFired(response.data.fired)
        setTable(response.data.table)
        setPlayers(response.data.players)
      } finally {
        setLoading(false)
      }
    }

    loadBoard()
  }, [])

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <span>loading</span>
      </div>
    )
  }

  return (
    <div className="h-screen w-screen flex p-4 flex-col gap-4">
      <div className="flex flex-col gap-2">
        <p>deck</p>

        <div className="flex gap-2 flex-wrap">
          {deck.map((card) => (
            <Card
              key={card}
              number={card.slice(0, card.length - 1)}
              suit={suits[card[card.length - 1]]}
            />
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex flex-col gap-2">
          <p>fired</p>

          <div className="flex gap-2 flex-wrap">
            {fired.map((card) => (
              <Card
                key={card}
                number={card.slice(0, card.length - 1)}
                suit={suits[card[card.length - 1]]}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p>table</p>

          <div className="flex gap-2 flex-wrap">
            {table.map((card) => (
              <Card
                key={card}
                number={card.slice(0, card.length - 1)}
                suit={suits[card[card.length - 1]]}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        {Object.keys(players).map((key, index) => (
          <div className="flex flex-col gap-2" key={key}>
            <p>player {String(index + 1)}</p>

            <div className="flex gap-2 flex-wrap">
              {players[key].map((card) => (
                <Card
                  key={card}
                  number={card.slice(0, card.length - 1)}
                  suit={suits[card[card.length - 1]]}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
