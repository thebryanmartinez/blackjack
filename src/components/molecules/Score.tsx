import { Container } from '@components/atoms'

interface ScoreProps {
  score: number
}

export const Score = ({ score }: ScoreProps) => {
  return (
    <Container className='!my-4 grid place-items-center bg-white !px-4 !py-2'>
      {score}
    </Container>
  )
}
