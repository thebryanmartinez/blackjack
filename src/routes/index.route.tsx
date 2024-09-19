import { createFileRoute } from '@tanstack/react-router'
import { Logo } from '@/assets'
import { Layout, Typography, Container, Button } from '@/components/atoms'
import { useNavigate } from '@tanstack/react-router'
import { strings } from '@/constants'

const Home = () => {
  const navigate = useNavigate({ from: '/' })

  const navigateToPlay = () => {
    navigate({ to: '/play' })
  }

  return (
    <Layout className='grid place-items-center'>
      <Container>
        <Typography
          variant='h1'
          className='text-3xl md:text-5xl lg:text-6xl'
        >
          {strings.home.title}
        </Typography>
      </Container>
      <img
        src={Logo}
        alt='Blackjack Logo'
        className='h-72 md:h-80 lg:h-96'
      />
      <Button
        className='nes-btn is-primary !px-12 '
        text={strings.home.play}
        onClick={navigateToPlay}
      />
    </Layout>
  )
}

export const Route = createFileRoute('/')({
  component: Home
})
