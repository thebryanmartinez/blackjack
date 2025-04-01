import { Container, Typography } from '@components/atoms'

interface GameResultProps {
  text: string
}

export const GameResult = ({ text }: GameResultProps) => {
  return (
    <Container className='!absolute left-[50%] top-[22%] z-10 grid -translate-x-2/4 -translate-y-2/4 place-items-center bg-white '>
      <Typography
        variant='p'
        className='text-center text-2xl font-bold !text-black md:text-3xl lg:text-4xl'
      >
        {text}
      </Typography>
    </Container>
  )
}
