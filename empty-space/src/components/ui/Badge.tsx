import * as React from 'react';
import { cn } from './utils';

export const Badge = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'inline-flex items-center rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground transition-colors',
        className
      )}
      {...props}
    />
  )
);
Badge.displayName = 'Badge';
