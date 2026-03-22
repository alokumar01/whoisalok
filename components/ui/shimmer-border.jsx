import React from 'react';
import { cn } from '@/lib/utils';

export function ShimmerBorder({ children, className, contentClassName }) {
  return (
    <div
      className={cn(
        'animate-shimmer-border rounded-[30px] bg-[linear-gradient(115deg,rgba(56,189,248,0.2),rgba(255,255,255,0.04),rgba(56,189,248,0.2))] bg-[length:200%_100%] p-px dark:bg-[linear-gradient(115deg,rgba(125,211,252,0.18),rgba(255,255,255,0.03),rgba(125,211,252,0.18))]',
        className
      )}
    >
      <div className={cn('rounded-[calc(1.875rem-1px)]', contentClassName)}>
        {children}
      </div>
    </div>
  );
}
