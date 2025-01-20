'use client'

import { PullsByRepo } from '@/components/github/root/pulls-by-repo/pulls-by-repo'

import { useFilterChange } from '@/contexts/github/root/filter-provider/filter-provider'

// just using a client component not to think too much about it
export default function Page() {
  const { installationFilteredRepos } = useFilterChange()

  return <PullsByRepo repos={installationFilteredRepos} />
}
