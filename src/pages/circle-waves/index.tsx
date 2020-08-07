import React from 'react';
import { useWindowSize } from 'react-use';
import dynamic from 'next/dynamic';
import Model from './model';

const Svg = dynamic(() => import('./svg'), { ssr: false });

const Waves = new Model(100, 100, 100);
const waves = Waves.getState();

export default function CircleWaves() {
	const { width, height } = useWindowSize(0, 0);
	console.log(width, height);
	if (!width || !height) return null;

	return <Svg {...{ width, height, waves }} />;
}
