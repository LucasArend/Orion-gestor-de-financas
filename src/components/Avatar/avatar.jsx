import { useEffect, useState } from 'react';

export default function Avatar({ name, style }) {
  const toneRange = 360;
  const [initial, setInitial] = useState('?');
  const [backgroundColor, setBackgroundColor] = useState('#9CA3AF');

  useEffect(() => {
    const cleanName = (name || '').trim();

    const firstLetter = cleanName ? cleanName[0].toUpperCase() : '?';
    setInitial(firstLetter);

    if (cleanName) {
      let hash = 0;
      for (let i = 0; i < cleanName.length; i++) {
        hash = cleanName.charCodeAt(i) + ((hash << 5) - hash);
      }
      const hue = Math.abs(hash) % toneRange;
      setBackgroundColor(`hsl(${hue}, 70%, 45%)`);
    } else {
      setBackgroundColor('#9CA3AF');
    }
  }, [name]);

  return (
    <div
      className={`flex shrink-0 select-none items-center justify-center rounded-full font-semibold text-white transition-all duration-300 ${style}`}
      style={{
        backgroundColor,
      }}
    >
      {initial}
    </div>
  );
}
