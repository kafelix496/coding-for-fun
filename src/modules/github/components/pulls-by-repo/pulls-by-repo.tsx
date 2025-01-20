'use client'

import { Checkbox } from '@/elements/root/checkbox/checkbox'
import { Skeleton } from '@/elements/root/skeleton/skeleton'
import { Table } from '@/elements/root/table/table'

import { PullListByRepo } from '@/components/github/root/pull-list-by-repo/pull-list-by-repo'

import { useUpdateRepoOrPull } from '@/contexts/github/root/selected-pulls-provider'

import type { TRepo } from '@/types/github/root/index'

import { useFetchRepositories } from './hooks'
import { checkIfAllReposChecked } from './utils'

const Repositories = ({ repos }: { repos: TRepo[] | undefined }) => {
  const { isLoading } = useFetchRepositories()
  const { toggleRepoCheckStatus, toggleAllRepoCheckStatus } =
    useUpdateRepoOrPull()

  if (isLoading) {
    return Array.from({ length: 25 }).map((_, index) => (
      <li key={index} className="w-1/2">
        <Skeleton variant="rect" />
      </li>
    ))
  }

  // TODO: handle error case
  const hasRepoChild =
    !isLoading && repos && repos.length > 0 && repos.some((repo) => repo.pulls)

  const isAllRepoChecked = checkIfAllReposChecked(isLoading, repos)

  if (!repos) {
    return null
  }

  return (
    <>
      <Table
        headers={[
          {
            key: 'header',
            items: [
              {
                key: 'header-cell-0',
                children: (
                  <Checkbox
                    checked={isAllRepoChecked}
                    onCheckedChange={() => {
                      toggleAllRepoCheckStatus(
                        repos.filter(
                          (repo) => repo.pulls && repo.pulls.length > 0
                        )
                      )
                    }}
                    disabled={!hasRepoChild}
                  />
                )
              },
              {
                key: 'header-cell-1',
                children: 'Repository / Pull request'
              }
            ]
          }
        ]}
        cells={repos.map((repo) => {
          const isRepoChecked = !!repo.pulls
            ? repo.pulls.length > 0 && repo.pulls.every((pull) => pull.checked)
            : false
          const hasChild = !!repo.pulls && repo.pulls.length > 0
          return {
            key: `row-${repo.owner}-${repo.name}`,
            items: [
              {
                key: `row-${repo.owner}-${repo.name}-cell-0`,
                className: 'w-3 content-start',
                children: (
                  <Checkbox
                    checked={isRepoChecked}
                    onCheckedChange={() =>
                      toggleRepoCheckStatus(repo.owner, repo.name)
                    }
                    disabled={!hasChild}
                  />
                )
              },
              {
                key: `row-${repo.owner}-${repo.name}-cell-1`,
                children: (
                  <PullListByRepo
                    key={`${repo.owner}-${repo.name}`}
                    installationId={repo.installationId}
                    owner={repo.owner}
                    repo={repo.name}
                    repoUrl={repo.url}
                    pulls={repo.pulls}
                    isRepoOpen={repo.isOpen}
                  />
                )
              }
            ]
          }
        })}
      />
    </>
  )
}

interface IPullsByRepoProps {
  repos: TRepo[] | undefined
}

export const PullsByRepo = ({ repos }: IPullsByRepoProps) => {
  return (
    <ul className="flex flex-1 flex-col gap-2 overflow-y-auto">
      <Repositories repos={repos} />
    </ul>
  )
}
