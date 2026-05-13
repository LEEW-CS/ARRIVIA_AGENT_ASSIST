'use client';

import { cn } from '@/lib/utils';

const basePath =
  process.env.NODE_ENV === 'production' ? '/ARRIVIA_AGENT_ASSIST' : '';

interface ArriviaLogoProps {
  className?: string;
  heightClass?: string;
}

export function ArriviaLogo({ className, heightClass = 'h-9' }: ArriviaLogoProps) {
  return (
    <img
      src={`${basePath}/arrivia-logo.svg`}
      alt="arrivia"
      className={cn(heightClass, 'w-auto select-none', className)}
      draggable={false}
    />
  );
}
