import Modal from 'react-modal'
import { ChipAmount } from '@components/molecules'
import { Button } from '@components/atoms'
import { useNavigate } from '@tanstack/react-router'
import { Routes } from '@/constants'

interface GameFinishedDialogProps {
  isOpen: boolean
  onClickPlay: () => void
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
  onClickPlay
}: GameFinishedDialogProps) => {
  const navigate = useNavigate({ from: Routes.PLAY })
  const navigateToBet = () => {
    navigate({ to: Routes.BET })
  }

  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
      className='nes-container flex w-[50vw] flex-col items-center gap-8 bg-white lg:w-[400px]'
    >
      Would you like to play again with the same bet?
      <ChipAmount
        amount={50}
        amountClassname='text-black'
      />
      <div className='grid w-full gap-4 lg:w-fit'>
        <Button
          text='Play Again'
          type='button'
          className='is-primary w-full lg:w-fit'
          onClick={onClickPlay}
        />
        <Button
          text='Change Bet'
          type='button'
          className='w-full lg:w-fit'
          onClick={navigateToBet}
        />
      </div>
    </Modal>
  )
}
