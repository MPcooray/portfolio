import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-3 py-1 text-xs uppercase tracking-[0.18em] transition-colors',
  {
    variants: {
      variant: {
        default: 'border-[color:var(--border)] bg-white/5 text-[color:var(--text)]',
        accent: 'border-[color:var(--border-strong)] bg-black/20 text-[color:var(--accent)]',
        muted: 'border-[color:var(--border)] bg-black/20 text-[color:var(--muted)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
