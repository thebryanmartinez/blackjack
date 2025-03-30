import Modal from 'react-modal'
import { ChipAmount } from '@components/molecules'
import { Button } from '@components/atoms'
import { useNavigate } from '@tanstack/react-router'
import { CURRENT_BET_KEY, Routes, strings } from '@/constants'

interface GameFinishedDialogProps {
  isOpen: boolean
  onClickPlay: () => void
  onClickChangeBet?: () => void
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.50)'
  }
}

export const GameFinishedDialog = ({
  isOpen = true,
  onClickPlay,
  onClickChangeBet
}: GameFinishedDialogProps) => {
  const navigate = useNavigate({ from: Routes.PLAY })

  const navigateToBet = () => {
    onClickChangeBet && onClickChangeBet()
    navigate({ to: Routes.BET })
  }

  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
      className='nes-container flex w-[50vw] flex-col items-center gap-8 bg-white lg:w-[400px]'
    >
      {strings.play.dialog.description}
      <ChipAmount
        amount={Number(sessionStorage.getItem(CURRENT_BET_KEY) || 0)}
        amountClassname='!text-gray-900'
      />
      <div className='grid w-full gap-4 lg:w-fit'>
        <Button
          text={strings.play.dialog.buttons.playAgain}
          type='button'
          className='is-primary w-full lg:w-fit'
          onClick={onClickPlay}
        />
        <Button
          text={strings.play.dialog.buttons.changeBet}
          type='button'
          className='w-full lg:w-fit'
          onClick={navigateToBet}
        />
      </div>
    </Modal>
  )
}
