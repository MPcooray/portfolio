import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap text-sm font-medium tracking-normal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'border border-[color:var(--accent)] bg-[color:var(--accent)] text-[color:var(--ink)] hover:bg-transparent hover:text-[color:var(--accent)]',
        outline:
          'border border-[color:var(--border-strong)] bg-transparent text-[color:var(--accent)] hover:bg-[color:var(--accent)]/10',
        ghost: 'text-[color:var(--text)] hover:bg-[color:var(--accent)]/10',
      },
      size: {
        default: 'px-6 py-3',
        sm: 'px-4 py-2',
        lg: 'px-7 py-3.5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
