import { Slot } from '@radix-ui/react-slot'
import clsx from 'clsx'
import {
  type ButtonHTMLAttributes,
  type FC,
  type ReactNode,
  forwardRef
} from 'react'

interface IVariantProps {
  variant?: 'contained' | 'outline' | 'icon' | 'ghost' | 'link'
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'error'
  size?: 'sm' | 'md' | 'lg' | 'icon'
}

type TButtonLoaderProps = {
  size: IVariantProps['size']
}

export type TButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  (
    | (IVariantProps & {
        asChild?: true
        label?: never
        isLoading?: never
        icon?: never
      })
    | (Omit<IVariantProps, 'size'> & {
        asChild?: false
        isLoading?: boolean
      } & (
          | {
              size?: Exclude<IVariantProps['size'], 'icon'>
              icon?: ReactNode
              label: ReactNode
            }
          | {
              size: 'icon'
              icon: ReactNode
              label?: never
            }
        ))
  )

const ButtonLoader: FC<TButtonLoaderProps> = ({ size }) => {
  const basicClasses = 'loader'
  const sizeClasses: Record<Required<IVariantProps>['size'], string> = {
    sm: 'size--sm',
    md: 'size--md',
    lg: 'size--lg',
    icon: 'size--icon'
  }
  return (
    <svg
      className={clsx(basicClasses, sizeClasses[size ?? 'md'])}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  )
}

/**
 * @description
 * Please check the following condition of props:
 * 1. If asChild is true, label, isLoading and icon must be undefined
 * 2. If asChild is false,
 *   2-1. If size is 'icon', label must be undefined
 *   2-2. If size is not 'icon', label must be defined
 */
export const Button = forwardRef<HTMLButtonElement, TButtonProps>(
  (
    {
      className,
      variant = 'contained',
      size = 'md',
      asChild = false,
      children,
      label,
      icon,
      isLoading,
      ...props
    },
    ref
  ) => {
    const basicClasses = 'button'
    const variantClasses: Record<Required<IVariantProps>['variant'], string> = {
      contained: 'variant--contained',
      outline: 'variant--outline',
      icon: 'variant--icon',
      ghost: 'variant--ghost',
      link: 'variant--link'
    }
    const sizeClasses: Record<Required<IVariantProps>['size'], string> = {
      sm: 'size--sm',
      md: 'size--md',
      lg: 'size--lg',
      icon: 'size--icon'
    }
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        className={clsx(
          basicClasses,
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        disabled={!!isLoading}
        ref={ref}
        {...props}
      >
        <>
          {!children && !asChild && (
            <span className="gap-4 flex items-center">
              {!!isLoading && <ButtonLoader size={size} />}
              {/* If size is icon and isLoading is true, do not display icon */}
              {!!icon && !(isLoading && size === 'icon') && (
                <span className="icon">{icon}</span>
              )}
              {!!label && size !== 'icon' && (
                <span className="label">{label}</span>
              )}
            </span>
          )}
          {children}
        </>
      </Comp>
    )
  }
)
Button.displayName = 'Button'
