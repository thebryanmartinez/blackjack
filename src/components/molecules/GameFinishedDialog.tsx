import { ChipAmount } from '@components/molecules'
import { Button } from '@/components/ui/pixelact-ui/button'
import { useNavigate } from '@tanstack/react-router'
import { CURRENT_BET_KEY, Routes } from '@/constants'
import { useTranslation } from 'react-i18next'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle
} from '@/components/ui/pixelact-ui/dialog'

interface GameFinishedDialogProps {
  isOpen: boolean
  onClickPlay: () => void
  onClickChangeBet?: () => void
}

export const GameFinishedDialog = ({
  isOpen = true,
  onClickPlay,
  onClickChangeBet
}: GameFinishedDialogProps) => {
  const navigate = useNavigate({ from: Routes.PLAY })
  const { t } = useTranslation()

  const navigateToBet = () => {
    onClickChangeBet && onClickChangeBet()
    navigate({ to: Routes.BET })
  }

  return (
    <Dialog open={isOpen}>
      <DialogContent className='bg-white'>
        <DialogTitle className='flex w-full flex-col items-center gap-8'>
          {t('play.dialog.description')}
          <ChipAmount
            amount={Number(sessionStorage.getItem(CURRENT_BET_KEY) || 0)}
            amountClassname='!text-gray-900'
          />
          <DialogDescription className='grid w-full gap-4 lg:w-fit'>
            <Button
              className='w-full lg:w-fit'
              onClick={onClickPlay}
            >
              {t('play.dialog.buttons.playAgain')}
            </Button>
            <Button
              className='w-full lg:w-fit'
              onClick={navigateToBet}
            >
              {t('play.dialog.buttons.changeBet')}
            </Button>
          </DialogDescription>
        </DialogTitle>
      </DialogContent>
    </Dialog>
  )
}
