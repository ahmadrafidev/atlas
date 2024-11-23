'use client'

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function KeyboardNavigation() {
  const [focusedElements, setFocusedElements] = useState<HTMLElement[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setTimeout(() => {
          const activeElement = document.activeElement as HTMLElement | null;
          if (activeElement) {
            setFocusedElements((prev) => [...prev, activeElement]);
          }
        }, 0);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2">Keyboard Navigation Test</h2>
      <p className="mb-2">Press Tab to navigate and see the focus order:</p>
      <div className="space-y-2">
        {focusedElements.map((el, index) => (
          <div key={index} className="p-2 bg-gray-100 rounded">
            {index + 1}. {el.tagName.toLowerCase()}
            {el.id && `#${el.id}`}
            {el.className && `.${el.className.split(' ').join('.')}`}
          </div>
        ))}
      </div>
      <Button className="mt-4" onClick={() => setFocusedElements([])}>
        Reset Test
      </Button>
    </div>
  );
}
