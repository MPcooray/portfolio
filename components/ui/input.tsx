import * as React from 'react'

import { cn } from '@/lib/utils'

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-12 w-full rounded-2xl border border-[color:var(--border)] bg-black/20 px-4 py-3 text-base text-[color:var(--text)] outline-none ring-offset-transparent placeholder:text-[color:var(--muted)] focus-visible:border-[color:var(--accent)] focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]/15 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }
