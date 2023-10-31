import { twMerge } from 'tailwind-merge'

const suits = {
  clubs: '♣',
  hearts: '♥',
  spades: '♠',
  diamonds: '♦',
}

type Suit = keyof typeof suits

interface CardProps {
  suit: Suit
  number: string
}

export function Card({ number, suit }: CardProps) {
  return (
    <div
      className={twMerge(
        'flex w-20 aspect-1/1.6 bg-zinc-100 flex-col justify-between p-2 rounded-lg',
        ['hearts', 'diamonds'].includes(suit) && 'text-red-500',
      )}
    >
      <div className="flex flex-col">
        <span className="leading-none">{number.toUpperCase()}</span>
        <span className="leading-none">{suits[suit]}</span>
      </div>

      <span className="text-4xl self-center">{suits[suit]}</span>

      <div className="flex flex-col rotate-180">
        <span className="leading-none">{number.toUpperCase()}</span>
        <span className="leading-none">{suits[suit]}</span>
      </div>
    </div>
  )
}
