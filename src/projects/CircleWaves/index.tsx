import React from 'react';
import Model from './model';

const Waves = new Model(100, 100, 100);
const waves = Waves.getState();

export default function () {
  const width = window.innerWidth;
  const height = window.innerHeight;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {waves.map((w: any) => w.map((c: any) => <circle key={c.id} cx={c.x} cy={c.y} r={c.r} fill={c.color} />))}
    </svg>
  );
}
