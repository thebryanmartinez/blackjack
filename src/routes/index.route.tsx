import { createFileRoute } from '@tanstack/react-router'
import { Logo } from '@/assets'
import { Layout, Typography, Button } from '@/components/atoms'
import { useNavigate } from '@tanstack/react-router'
import { Routes } from '@/constants'
import { useTableTheme } from '@/contexts'
import { useTranslation } from 'react-i18next'
import { EnglishFlag, SpanishFlag } from '@/assets/flags'

const Home = () => {
  const navigate = useNavigate({ from: Routes.HOME })
  const { toggleTableColor } = useTableTheme()
  const { t, i18n } = useTranslation()

  const navigateToBet = () => {
    navigate({ to: Routes.BET })
  }

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en')
  }

  return (
    <Layout className='grid place-items-center'>
      <Typography
        variant='h1'
        className='text-stroke text-3xl uppercase md:text-5xl lg:text-6xl'
      >
        {t('home.title')}
      </Typography>
      <img
        src={Logo}
        alt='Blackjack Logo'
        className='h-72 md:h-80 lg:h-96'
      />
      <div className='flex w-full flex-col place-items-center gap-4'>
        <Button
          className='nes-btn is-primary w-full md:w-1/2 '
          text={t('home.play')}
          onClick={navigateToBet}
        />
        <div className='flex justify-between gap-4 md:w-1/2'>
          <Button
            text={t('home.changeColor')}
            className='w-full'
            onClick={toggleTableColor}
          />
          <Button
            text={
              <div className='flex flex-row items-center justify-center gap-2'>
                <img
                  src={i18n.language === 'es' ? SpanishFlag : EnglishFlag}
                  alt=''
                />
                <p className='m-0 p-0'>{t('home.changeLanguage')}</p>
              </div>
            }
            onClick={toggleLanguage}
          />
        </div>
      </div>
    </Layout>
  )
}

export const Route = createFileRoute(Routes.HOME)({
  component: Home
})
