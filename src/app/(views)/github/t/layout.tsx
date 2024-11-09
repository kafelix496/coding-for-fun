'use client'

import { usePathname, useRouter } from 'next/navigation'
import { type ReactNode } from 'react'

import { Tabs } from '@/elements/root/tabs/tabs'

import { useDictionary } from '@/contexts/root/dictionary-provider/dictionary-provider'

import { urlService } from '@/services/root/url'

enum ETabValue {
  CONNECTIONS = 'CONNECTIONS',
  PULLS = 'PULLS',
  MERGE = 'MERGE'
}

const getValue = (pathname: string): ETabValue => {
  switch (pathname) {
    case urlService.github.connections(): {
      return ETabValue.CONNECTIONS
    }

    case urlService.github.pulls(): {
      return ETabValue.PULLS
    }

    case urlService.github.merge(): {
      return ETabValue.MERGE
    }
  }

  throw new Error('Invalid pathname')
}

export default function Layout({ children }: { children: ReactNode }) {
  const { translate } = useDictionary()
  const pathname = usePathname()
  const router = useRouter()
  const value = getValue(pathname)
  const tabValues = [
    {
      label: translate('GITHUB.TAB_CONNECTIONS_LABEL'),
      value: ETabValue.CONNECTIONS,
      children
    },
    {
      label: translate('GITHUB.TAB_BULK_PULL_REVIEWS_LABEL'),
      value: ETabValue.PULLS,
      children
    },
    {
      label: translate('GITHUB.TAB_READY_MERGE_PULL_REQUEST_LABEL'),
      value: ETabValue.MERGE,
      children
    }
  ]

  const handleValueChange = (value: string) => {
    switch (value as ETabValue) {
      case ETabValue.CONNECTIONS: {
        router.replace(urlService.github.connections())
        break
      }

      case ETabValue.PULLS: {
        router.replace(urlService.github.pulls())
        break
      }

      case ETabValue.MERGE: {
        router.replace(urlService.github.merge())
        break
      }
    }
  }

  return (
    <Tabs
      className="bg-background pb-4"
      headerClassName="top-0 h-16 sticky z-20"
      value={value}
      onValueChange={handleValueChange}
      values={tabValues}
    />
  )
}
