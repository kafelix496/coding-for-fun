import { useState } from 'react'
import { Button } from 'src/elements/button/button'
import { PullInputInfoDialog } from 'src/modules/github/components/pull-input-info-dialog/pull-input-info-dialog'
import type { TRepo } from 'src/modules/github/types'

import { Checkbox } from '@/elements/root/checkbox/checkbox'
import { Table } from '@/elements/root/table/table'

interface IPullsSortTable {
  repos: TRepo[] | undefined
}

export const PullsSortTable = ({ repos }: IPullsSortTable) => {
  const pullCheckedFilteredRepos = repos
    ?.map((repo) => ({
      ...repo,
      pulls: repo.pulls?.filter((pull) => pull.checked)
    }))
    .filter((repo) => repo.pulls && repo.pulls.length > 0)
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const handleSetIsOpenDialog = (open: boolean) => {
    setIsDialogOpen(open)
  }

  const handleCheckedChange = () => {
    console.log(handleCheckedChange)
  }

  const handleCellClick = () => {
    console.log(handleCellClick)
    handleSetIsOpenDialog(true)
  }

  if (!pullCheckedFilteredRepos) {
    return null
  }
  const cells = pullCheckedFilteredRepos.flatMap((repo) =>
    repo.pulls!.map((pull) => ({
      key: `row-${repo.name}-${pull.number}`,
      items: [
        {
          key: `cell-checkbox-${pull.number}`,
          children: (
            <Checkbox checked={false} onCheckedChange={handleCheckedChange} />
          )
        },
        {
          key: `cell-${repo.name}`,
          children: repo.name
        },
        {
          key: `cell-${pull.number}`,
          children: pull.title
        },
        {
          key: `cell-0-checkbox`,
          children: (
            <Button onClick={handleCellClick}>Add commit message</Button>
          )
        }
      ]
    }))
  )

  return (
    <div>
      <Table
        headers={[
          {
            key: 'header',
            items: [
              {
                className: 'w-3 content-start',
                key: 'header-cell-0'
              },
              {
                key: 'header-cell-1',
                children: 'Repository'
              },
              {
                key: 'header-cell-2',
                children: 'Pull request'
              },

              {
                key: 'header-cell-3'
              }
            ]
          }
        ]}
        cells={cells}
      />

      <PullInputInfoDialog
        title={'TEST TITLE'}
        isDialogOpen={isDialogOpen}
        handleSetIsOpenDialog={handleSetIsOpenDialog}
      />
    </div>
  )
}
