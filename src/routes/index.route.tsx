import { createFileRoute } from '@tanstack/react-router'
import { Logo } from '@/assets'
import { Layout, Typography, Container, Button } from '@/components/atoms'
import { useNavigate } from '@tanstack/react-router'

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
          Blackjack
        </Typography>
      </Container>
      <img
        src={Logo}
        alt='Blackjack Logo'
        className='h-72 md:h-80 lg:h-96'
      />
      <Button
        type='button'
        className='nes-btn is-primary !px-12 '
        text='Play'
        onClick={navigateToPlay}
      />
    </Layout>
  )
}

export const Route = createFileRoute('/')({
  component: Home
})
