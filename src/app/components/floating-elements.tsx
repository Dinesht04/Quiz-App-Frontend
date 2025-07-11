'use client';

import { useEffect, useState } from 'react';
import { Brain, Zap, Star, Trophy, Target } from 'lucide-react';

export default function FloatingElements() {
  const [elements, setElements] = useState<
    Array<{
      id: number;
      x: number;
      y: number;
      icon: any;
      size: number;
      speed: number;
      rotation: number;
    }>
  >([]);

  useEffect(() => {
    const icons = [Brain, Zap, Star, Trophy, Target];
    const newElements = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      icon: icons[Math.floor(Math.random() * icons.length)],
      size: Math.random() * 20 + 10,
      speed: Math.random() * 2 + 0.5,
      rotation: Math.random() * 360,
    }));
    setElements(newElements);

    const interval = setInterval(() => {
      setElements((prev) =>
        prev.map((el) => ({
          ...el,
          y: el.y <= -50 ? window.innerHeight + 50 : el.y - el.speed,
          rotation: el.rotation + 1,
        })),
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {elements.map((element) => {
        const Icon = element.icon;
        return (
          <div
            key={element.id}
            className="absolute opacity-10"
            style={{
              left: element.x,
              top: element.y,
              transform: `rotate(${element.rotation}deg)`,
            }}
          >
            <Icon size={element.size} className="text-[#A9F99E]" />
          </div>
        );
      })}
    </div>
  );
}
