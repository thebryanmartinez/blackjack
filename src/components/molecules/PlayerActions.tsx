import { Button } from '@/components/ui/pixelact-ui/button'
import { useTranslation } from 'react-i18next'

interface PlayerActionsProps {
  onHit: () => void
  onHitLoading?: boolean
  onStay: () => void
  onStayLoading?: boolean
  isDisabled: boolean
}

export const PlayerActions = ({
  onHit,
  onStay,
  onStayLoading,
  isDisabled
}: PlayerActionsProps) => {
  const { t } = useTranslation()

  return (
    <div className='absolute bottom-8 left-0 flex w-full flex-row justify-center gap-12 '>
      <Button
        onClick={onHit}
        className='w-fit min-w-36'
        disabled={isDisabled}
      >
        {t('play.buttons.hit')}
      </Button>
      <Button
        onClick={onStay}
        className='w-fit min-w-36'
        disabled={isDisabled || onStayLoading}
      >
        {t('play.buttons.stay')}
      </Button>
    </div>
  )
}
