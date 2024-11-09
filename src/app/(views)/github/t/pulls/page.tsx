'use client'

import { BulkPullReviews } from '@/components/github/root/bulk-pull-reviews/bulk-pull-reviews'

import { FilterProviderWidhInstallations } from '@/contexts/github/root/filter-provider/filter-provider-widh-installations'
import { SelectedPullsProvider } from '@/contexts/github/root/selected-pulls-provider'

// just using a client component not to think too much about it
export default function Page() {
  return (
    <SelectedPullsProvider>
      <FilterProviderWidhInstallations>
        <BulkPullReviews />
      </FilterProviderWidhInstallations>
    </SelectedPullsProvider>
  )
}
