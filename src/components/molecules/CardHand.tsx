import { cardDictionary } from '@utils/index'
import { Card } from '@models/index'

interface CardHandProps {
  cards: Card[]
  className?: string
}

export const CardHand = ({ cards, className }: CardHandProps) => {
  return (
    <section
      className={`relative flex h-full w-screen justify-center ${className}`}
    >
      {cards.map((card, index) => {
        const cardMargin =
          '[&:nth-child(2)]:ml-[4rem] [&:nth-child(3)]:ml-[8rem] [&:nth-child(4)]:ml-[12rem] [&:nth-child(5)]:ml-[16rem] [&:nth-child(6)]:ml-[20rem] [&:nth-child(7)]:ml-[24rem] [&:nth-child(8)]:ml-[28rem] [&:nth-child(9)]:ml-[32rem] [&:nth-child(10)]:ml-[36rem] [&:nth-child(11)]:ml-[40rem] [&:nth-child(12)]:ml-[44rem]'
        return (
          <div
            className={`absolute flex w-28 flex-col bg-black ${cardMargin}`}
            key={index}
          >
            <img
              src={cardDictionary[card.code]}
              alt={card.code}
            />
          </div>
        )
      })}
    </section>
  )
}
