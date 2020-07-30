import React from 'react';
import model from './model';
import Model from './model';

const Waves = new Model(100, 100, 100);
const waves = Waves.getState();

export default function () {
  return <svg>{waves.map((w: any) => w.map((c: any) => <circle cx={c} cy={c.y} r="40" />))}</svg>;
}
