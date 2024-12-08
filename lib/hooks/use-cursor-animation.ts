import { useCallback } from 'react';
import { RefObject } from 'react';

export function useCursorAnimation(cursorRef: RefObject<SVGSVGElement>) {
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!cursorRef.current) return;
    
    const x = e.clientX - 20;
    const y = e.clientY - 20;
    
    cursorRef.current.style.transform = `translate(${x}px, ${y}px)`;
  }, []);

  return { handleMouseMove };
}