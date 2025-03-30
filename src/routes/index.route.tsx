import { createFileRoute } from '@tanstack/react-router'
import { Logo } from '@/assets'
import { Layout, Typography, Button } from '@/components/atoms'
import { useNavigate } from '@tanstack/react-router'
import { Routes, strings } from '@/constants'
import { useTableTheme } from '@/contexts'
import { GameFinishedDialog } from '@/components/molecules'

const Home = () => {
  const navigate = useNavigate({ from: Routes.HOME })
  const { toggleTableColor } = useTableTheme()

  const navigateToBet = () => {
    navigate({ to: Routes.BET })
  }

  return (
    <Layout className='grid place-items-center'>
      <Typography
        variant='h1'
        className='text-stroke text-3xl uppercase md:text-5xl lg:text-6xl'
      >
        {strings.home.title}
      </Typography>
      <img
        src={Logo}
        alt='Blackjack Logo'
        className='h-72 md:h-80 lg:h-96'
      />
      <div className='flex w-full flex-col place-items-center gap-4'>
        <Button
          className='nes-btn is-primary w-full md:w-1/2 '
          text={strings.home.play}
          onClick={navigateToBet}
        />
        <div className='flex justify-between gap-4 md:w-1/2'>
          <Button
            text={strings.home.changeColor}
            className='w-full'
            onClick={toggleTableColor}
          />
          <Button text={strings.home.wip} />
        </div>
      </div>
    </Layout>
  )
}

export const Route = createFileRoute(Routes.HOME)({
  component: Home
})
