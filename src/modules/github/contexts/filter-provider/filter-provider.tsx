import {
  type Dispatch,
  type FC,
  type ReactNode,
  type SetStateAction,
  createContext,
  useContext,
  useState
} from 'react'
import { useRepos } from 'src/modules/github/contexts/selected-pulls-provider'

import { ELocalStorageKey } from '@/types/root/index'

import { type TGithubInstallation, type TRepo } from '@/types/github/root/index'

export interface FilterContextType {
  filterValue: string | null
  setFilterValue: Dispatch<SetStateAction<string | null>>
  installationFilteredRepos: TRepo[] | undefined
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

interface FilterProviderProps {
  children: ReactNode
  installations: TGithubInstallation[]
}

export const ALL_INSTALLATION = 'All'

export const FilterProvider: FC<FilterProviderProps> = ({
  children,
  installations
}) => {
  const { repos } = useRepos()
  const [filterValue, setFilterValue] = useState<string | null>(() => {
    if (installations.length === 0) {
      return null
    }

    const targetInstallation = installations.find(
      (installation) =>
        String(installation.id) ===
        localStorage.getItem(ELocalStorageKey.INSTALLATION_ID)
    )

    if (targetInstallation === undefined) {
      return ALL_INSTALLATION
    }

    return String(targetInstallation.id)
  })

  const installationFilteredRepos =
    filterValue === ALL_INSTALLATION
      ? repos
      : repos?.filter((repo) => String(repo.installationId) === filterValue)
  return (
    <FilterContext.Provider
      value={{ filterValue, setFilterValue, installationFilteredRepos }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export const useFilterChange = () => {
  const context = useContext(FilterContext)

  if (!context) {
    throw new Error('useFilterChange must be used within a FilterProvider')
  }
  return context
}
