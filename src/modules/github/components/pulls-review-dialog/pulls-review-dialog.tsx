import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ExternalLinkIcon
} from 'lucide-react'
import Link from 'next/link'
import { type ChangeEvent, useEffect, useState } from 'react'

import { Alert } from '@/elements/root/alert/alert'
import { Button } from '@/elements/root/button/button'
import { Dialog } from '@/elements/root/dialog/dialog'
import { Progress } from '@/elements/root/progress/progress'
import { RadioGroup } from '@/elements/root/radio-group/radio-group'
import { Textarea } from '@/elements/root/textarea/textarea'
import { Tooltip } from '@/elements/root/tooltip/tooltip'

import { useDictionary } from '@/contexts/root/dictionary-provider/dictionary-provider'

import { PullReviewDialogBody } from '@/components/github/root/pull-review-dialog-body/pull-review-dialog-body'
import { type ICheckedPull } from '@/components/github/root/pulls-review-dialog/types'

import { useCurrentUser } from '@/hooks/github/root/use-current-user'

import { EPullRequestType } from '@/types/github/root/index'

import { useSubmitForm } from './hooks'

interface IPullsReviewDialogProps {
  flattenCheckedPulls: ICheckedPull[]
  isDialogOpen: boolean
  handleSetIsOpenDialog: (open: boolean) => void
}

export const PullsReviewDialog = ({
  flattenCheckedPulls,
  isDialogOpen,
  handleSetIsOpenDialog
}: IPullsReviewDialogProps) => {
  const { user: currentUser } = useCurrentUser()
  const [commentInput, setCommentInput] = useState<string>('')
  const [focusIndex, setFocusIndex] = useState<number>(0)
  const [radioButtonValue, setRadioButtonValue] = useState<EPullRequestType>(
    EPullRequestType.COMMENT
  )
  const { translate } = useDictionary()
  const {
    progressData,
    submit,
    isLoading,
    error: errors,
    reset
  } = useSubmitForm()
  const hasSelfPull = flattenCheckedPulls.some(
    (data) => data.user.login === currentUser!.login
  )
  const radioButtonValues = [
    {
      value: EPullRequestType.COMMENT,
      label: translate('GITHUB.PULL_REVIEW_FORM_COMMENT_BUTTON')
    },
    {
      value: EPullRequestType.APPROVE,
      label: translate('GITHUB.PULL_REVIEW_FORM_APPROVE_BUTTON'),
      disabled: hasSelfPull
    },
    {
      value: EPullRequestType.REQUEST_CHANGES,
      label: translate('GITHUB.PULL_REVIEW_FORM_REQUEST_CHANGES_BUTTON'),
      disabled: hasSelfPull
    }
  ]
  const focusedPull =
    flattenCheckedPulls.length > 0 ? flattenCheckedPulls[focusIndex] : undefined

  const handleRadioButtonChange = (value: string) => {
    setRadioButtonValue(value as EPullRequestType)
  }

  const handleCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentInput(event.target.value)
  }

  const handleOpenChange = (open: boolean) => {
    handleSetIsOpenDialog(open)
  }

  const handleCancelClick = () => {
    handleSetIsOpenDialog(false)
  }

  const handleLeftClick = () => {
    if (focusIndex === 0) {
      return
    }
    setFocusIndex((prev) => prev - 1)
  }

  const handleRightClick = () => {
    if (focusIndex === flattenCheckedPulls.length - 1) {
      return
    }
    setFocusIndex((prev) => prev + 1)
  }

  const handleSubmit = () => {
    submit({
      checkedPulls: flattenCheckedPulls,
      reviewType: radioButtonValue,
      comment: commentInput
    })
      .then(() => {
        handleSetIsOpenDialog(false)
      })
      .catch(console.error)
  }

  useEffect(() => {
    if (!isDialogOpen) {
      reset()
      setCommentInput('')
      setRadioButtonValue(EPullRequestType.COMMENT)
      setFocusIndex(0)
    }
  }, [isDialogOpen])

  // This is not gonna happen.
  if (!focusedPull) {
    return <></>
  }

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={handleOpenChange}
      title={focusedPull.pullTitle}
      widthType="default"
      children={
        <div className="flex flex-col w-full h-full gap-4">
          <div className="flex justify-end items-center gap-3">
            <Button
              role="button"
              variant="ghost"
              size="icon"
              className="!w-4 !h-4 hover:!bg-transparent"
            >
              <Tooltip tooltip={translate('HEADER.LINK_GITHUB_TOOLTIP')}>
                <Link href={focusedPull.url} target="_blank">
                  <ExternalLinkIcon width="17" height="17" />
                </Link>
              </Tooltip>
            </Button>

            <Button
              role="button"
              variant="ghost"
              size="icon"
              className="!w-4 !h-4 hover:!bg-transparent"
              disabled={focusIndex === 0}
              onClick={handleLeftClick}
            >
              <ChevronLeftIcon />
            </Button>

            <Button
              role="button"
              variant="ghost"
              size="icon"
              className="!w-4 !h-4 hover:!bg-transparent"
              onClick={handleRightClick}
              disabled={focusIndex === flattenCheckedPulls.length - 1}
            >
              <ChevronRightIcon />
            </Button>
          </div>
          <div>
            <PullReviewDialogBody description={focusedPull.body} />
          </div>
        </div>
      }
      footer={
        <div className="w-full h-full flex flex-col gap-4">
          <div className="flex w-full h-full flex-col gap-3">
            {progressData.isRunning && (
              <Progress value={progressData.value} max={100} />
            )}

            {errors ? (
              <Alert
                title={translate('COMMON.ALERT_DEFAULT_ERROR_TITLE')}
                description={
                  <div>
                    {errors.map((error, index) => (
                      <div key={index}>
                        <span>
                          {translate(
                            'GITHUB.PULL_REVIEW_FORM_SUBMIT_DESCRIPTION_REPO',
                            { repoName: error.repo }
                          )}
                        </span>
                        <div></div>
                        <span>
                          {translate(
                            'GITHUB.PULL_REVIEW_FORM_SUBMIT_DESCRIPTION_PULL',
                            { pullTitle: error.pullTitle }
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                }
                variant="error"
                className="w-full"
              />
            ) : null}

            <Textarea
              className="resize-none"
              placeholder={translate(
                'GITHUB.PULL_REVIEW_FORM_COMMENT_PLACEHOLDER'
              )}
              value={commentInput}
              onChange={handleCommentChange}
            />
          </div>

          <div className="flex w-full h-full flex-row justify-between">
            <div className="flex">
              <RadioGroup
                className="flex-col"
                value={radioButtonValue}
                onValueChange={handleRadioButtonChange}
                values={radioButtonValues}
              />
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={handleCancelClick}>
                {translate('COMMON.ALERT_DIALOG_DEFAULT_CANCEL_BUTTON')}
              </Button>

              <Button disabled={isLoading} onClick={() => handleSubmit()}>
                {translate('COMMON.DIALOG_REVIEW_BUTTON')}
              </Button>
            </div>
          </div>
        </div>
      }
    />
  )
}
