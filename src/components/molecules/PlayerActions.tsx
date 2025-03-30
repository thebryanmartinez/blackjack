import { Button } from '@components/atoms'
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
        text={t('play.buttons.hit')}
        className='is-primary w-fit min-w-36'
        disabled={isDisabled}
      />
      <Button
        text={t('play.buttons.stay')}
        onClick={onStay}
        className='w-fit min-w-36'
        loading={onStayLoading}
        disabled={isDisabled}
      />
    </div>
  )
}
