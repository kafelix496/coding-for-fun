'use client'

import { FilterIcon, SettingsIcon } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/elements/root/button/button'
import { Dropdown } from '@/elements/root/dropdown/dropdown'
import { Tooltip } from '@/elements/root/tooltip/tooltip'

import { useDictionary } from '@/contexts/root/dictionary-provider/dictionary-provider'

import { ELocalStorageKey } from '@/types/root/index'

import { useInstallations } from '@/components/github/root/connections/hooks'
import { PullsReviewDialog } from '@/components/github/root/pulls-review-dialog/pulls-review-dialog'
import { getFlattenCheckedPulls } from '@/components/github/root/pulls-review-dialog/utils'

import {
  ALL_INSTALLATION,
  useFilterChange
} from '@/contexts/github/root/filter-provider/filter-provider'
import {
  useRepos,
  useUpdateRepoOrPull
} from '@/contexts/github/root/selected-pulls-provider'

export enum ESettingsCode {
  EXPAND_ALL_BUTTON = 'EXPAND_ALL_BUTTON',
  SELECT_ALL_DEPENDABOT_PULL_REQUESTS = 'SELECT_ALL_DEPENDABOT_PULL_REQUESTS',
  START_REVIEW_BUTTON = 'START_REVIEW_BUTTON'
}

const DEPENDABOT_USER_NAME = 'dependabot[bot]'

export default function Page() {
  const { repos } = useRepos()
  const flattenCheckedPulls = getFlattenCheckedPulls(repos)
  const { translate } = useDictionary()
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const { openAllRepo, selectAllDependabot } = useUpdateRepoOrPull()
  const { installations } = useInstallations()
  const { filterValue, setFilterValue } = useFilterChange()

  const filterValues = [
    { label: translate('GITHUB.ALL_DROPDOWN'), value: ALL_INSTALLATION },
    ...(installations ?? []).map((installation) => {
      return {
        label: installation.owner,
        value: `${installation.id}`
      }
    })
  ]

  const settingValues = [
    {
      label: translate('GITHUB.EXPAND_ALL_BUTTON'),
      value: ESettingsCode.EXPAND_ALL_BUTTON,
      disabled: repos === undefined
    },
    {
      label: translate('GITHUB.SELECT_ALL_DEPENDABOT_PULL_REQUESTS'),
      value: ESettingsCode.SELECT_ALL_DEPENDABOT_PULL_REQUESTS,
      disabled:
        repos === undefined ||
        (repos ?? []).every(
          (repo) =>
            !(repo.pulls ?? []).some(
              (pull) => pull.user.login === DEPENDABOT_USER_NAME
            )
        )
    },

    {
      label: translate('GITHUB.START_REVIEW_BUTTON'),
      value: ESettingsCode.START_REVIEW_BUTTON,
      disabled: flattenCheckedPulls.length === 0
    }
  ]

  const handleSetIsOpenDialog = (open: boolean) => {
    setIsDialogOpen(open)
  }

  const handleExpandAllClick = () => {
    openAllRepo()
  }

  const handleSelectAllDependabotClick = () => {
    if (!repos) {
      return
    }

    repos.forEach((repo) => {
      if (repo.pulls) {
        repo.pulls.forEach((pull) => {
          if (pull.user.login === DEPENDABOT_USER_NAME) {
            selectAllDependabot(repo.owner, repo.name, pull.number)
          }
        })
      }
    })
  }

  const handleFilterChange = (value: string) => {
    localStorage.setItem(ELocalStorageKey.INSTALLATION_ID, value)
    setFilterValue(value)
  }

  const handleSettingChange = (value: string) => {
    switch (value as ESettingsCode) {
      case ESettingsCode.EXPAND_ALL_BUTTON: {
        handleExpandAllClick()
        break
      }

      case ESettingsCode.SELECT_ALL_DEPENDABOT_PULL_REQUESTS: {
        handleSelectAllDependabotClick()
        break
      }

      case ESettingsCode.START_REVIEW_BUTTON: {
        setTimeout(() => {
          handleSetIsOpenDialog(true)
        }, 0)
        break
      }
    }
  }

  return (
    <>
      <div className="flex gap-4 h-fit">
        <Dropdown
          type="radio"
          data={{
            groups: [{ label: '', items: filterValues }],
            value: filterValue ?? '',
            onValueChange: handleFilterChange
          }}
        >
          <Button
            variant="ghost"
            size="icon"
            icon={
              <Tooltip tooltip={translate('GITHUB.FILTER_DROPDOWN')}>
                <FilterIcon
                  className={`w-full h-full ${filterValue === ALL_INSTALLATION ? '' : 'text-blue-500'}`}
                />
              </Tooltip>
            }
          />
        </Dropdown>

        <Dropdown
          type="radio"
          data={{
            groups: [{ label: '', items: settingValues }],
            value: '',
            onValueChange: handleSettingChange
          }}
        >
          <Button
            variant="ghost"
            size="icon"
            icon={
              <Tooltip tooltip={translate('GITHUB.SETTINGS_DROPDOWN')}>
                <SettingsIcon className="w-full h-full" />
              </Tooltip>
            }
          />
        </Dropdown>
      </div>

      <PullsReviewDialog
        flattenCheckedPulls={flattenCheckedPulls}
        isDialogOpen={isDialogOpen}
        handleSetIsOpenDialog={handleSetIsOpenDialog}
      />
    </>
  )
}
