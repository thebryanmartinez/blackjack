import { Card } from '@/components/ui/pixelact-ui/card'
import { Typography } from '@components/atoms'

interface ScoreProps {
  score: number
  hideDealerScore?: boolean
}

export const Score = ({ score, hideDealerScore }: ScoreProps) => {
  return (
    <Card className='my-4 grid w-fit place-items-center bg-white px-4 py-2'>
      <Typography variant='span' className='!text-black'>
        {!hideDealerScore ? score : '?'}
      </Typography>
    </Card>
  )
}
