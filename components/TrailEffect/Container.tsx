'use client';

import { forwardRef, ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(({ children }, ref) => {
  return (
    <div
      ref={ref}
      className="relative w-full h-screen overflow-hidden bg-transparent cursor-none"
    >
      {children}
    </div>
  );
});

Container.displayName = 'Container';