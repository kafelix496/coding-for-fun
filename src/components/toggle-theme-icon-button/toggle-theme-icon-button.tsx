'use client'

import { MoonIcon, SunIcon } from '@radix-ui/react-icons'

import { Button } from '@/elements/root/button/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/elements/root/tooltip/tooltip'

import { useDictionary } from '@/contexts/root/dictionary-provider'
import { useToggleTheme } from '@/contexts/root/theme-provider'

export const ToggleThemeIconButton = () => {
  const { dictionary } = useDictionary()
  const { toggleTheme } = useToggleTheme()

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            toggleTheme()
          }}
        >
          {
            <MoonIcon
              width="16"
              height="16"
              className="absolute hidden dark:block"
            />
          }
          {
            <SunIcon
              width="16"
              height="16"
              className="absolute block dark:hidden"
            />
          }
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <span>{dictionary.HEADER.TOGGLE_THEME_TOOLTIP}</span>
      </TooltipContent>
    </Tooltip>
  )
}
