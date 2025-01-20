import { type ChangeEvent, useEffect, useState } from 'react'

import { Button } from '@/elements/root/button/button'
import { Dialog } from '@/elements/root/dialog/dialog'
import { Textarea } from '@/elements/root/textarea/textarea'

import { useDictionary } from '@/contexts/root/dictionary-provider/dictionary-provider'

interface IPullInputInfoDialogProps {
  title: string
  isDialogOpen: boolean
  handleSetIsOpenDialog: (open: boolean) => void
}

export const PullInputInfoDialog = ({
  title,
  isDialogOpen,
  handleSetIsOpenDialog
}: IPullInputInfoDialogProps) => {
  const [titleInput, setTitleInput] = useState<string>('')
  const [descriptionInput, setDescriptionInput] = useState<string>('')
  const { translate } = useDictionary()

  const handleTitleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTitleInput(event.target.value)
  }

  const handleBodyChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescriptionInput(event.target.value)
  }

  const handleOpenChange = (open: boolean) => {
    handleSetIsOpenDialog(open)
  }

  const handleCancelClick = () => {
    handleSetIsOpenDialog(false)
  }

  const handleSubmit = () => {
    console.log(handleSubmit)
  }

  useEffect(() => {
    if (!isDialogOpen) {
      setTitleInput('')
      setDescriptionInput('')
    }
  }, [isDialogOpen])

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={handleOpenChange}
      title={title}
      widthType="narrow"
      children={<div className=""></div>}
      footer={
        <div className="w-full h-full flex flex-col gap-4">
          <div className="flex w-full h-full flex-col gap-3">
            Title
            <Textarea
              className="resize-none"
              placeholder={translate('GITHUB.PULL_INFO_FORM_TITLE_PLACEHOLDER')}
              value={titleInput}
              onChange={handleTitleChange}
            />
          </div>

          <div className="flex w-full h-full flex-col gap-3">
            Description
            <Textarea
              className="resize-none"
              placeholder={translate(
                'GITHUB.PULL_INFO_FORM_DESCRIPTION_PLACEHOLDER'
              )}
              value={descriptionInput}
              onChange={handleBodyChange}
            />
          </div>

          <div className="flex w-full h-full flex-row justify-between">
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleCancelClick}>
                {translate('COMMON.ALERT_DIALOG_DEFAULT_CANCEL_BUTTON')}
              </Button>

              <Button variant="primary" onClick={() => handleSubmit()}>
                {translate('COMMON.ALERT_DIALOG_DEFAULT_CONFIRM_BUTTON')}
              </Button>
            </div>
          </div>
        </div>
      }
    />
  )
}
