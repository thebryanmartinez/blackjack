import { Button } from '@components/atoms'
import { strings } from '@/constants'

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
  return (
    <div className='absolute bottom-8 left-0 flex w-full flex-row justify-center gap-12 '>
      <Button
        onClick={onHit}
        text={strings.play.buttons.hit}
        className='is-primary w-36'
        disabled={isDisabled}
      />
      <Button
        text={strings.play.buttons.stay}
        onClick={onStay}
        className='w-36'
        loading={onStayLoading}
        disabled={isDisabled}
      />
    </div>
  )
}
