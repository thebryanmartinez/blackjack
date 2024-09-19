import { Button } from '@components/atoms'

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
    <div className='flex w-full flex-row justify-center gap-12 pb-8'>
      <Button
        onClick={onHit}
        text='Hit'
        className='is-primary'
        disabled={isDisabled}
      />
      <Button
        text='Stay'
        onClick={onStay}
        loading={onStayLoading}
        disabled={isDisabled}
      />
    </div>
  )
}
