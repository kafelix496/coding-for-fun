'use client'

import { type ReactNode } from 'react'

import { FilterProviderWidhInstallations } from '@/contexts/github/root/filter-provider/filter-provider-widh-installations'
import { SelectedPullsProvider } from '@/contexts/github/root/selected-pulls-provider'

export default function Layout({
  children,
  pullButtons
}: {
  children: ReactNode
  pullButtons: ReactNode
}) {
  return (
    <SelectedPullsProvider>
      <FilterProviderWidhInstallations>
        {pullButtons}
        {children}
      </FilterProviderWidhInstallations>
    </SelectedPullsProvider>
  )
}
