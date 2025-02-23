import { Container, Typography } from '@components/atoms'

interface ScoreProps {
  score: number
  hideDealerScore?: boolean
}

export const Score = ({ score, hideDealerScore }: ScoreProps) => {
  return (
    <Container className='!my-4 grid w-fit place-items-center bg-white !px-4 !py-2'>
      <Typography
        variant='span'
        className='!text-black'
      >
        {!hideDealerScore ? score : '?'}
      </Typography>
    </Container>
  )
}
