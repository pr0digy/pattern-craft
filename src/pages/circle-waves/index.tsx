import React from 'react';
import { useWindowSize } from 'react-use';
import dynamic from 'next/dynamic';
import model from './model';

const Svg = dynamic(() => import('./svg'), { ssr: false });

export default function CircleWaves() {
	const { width, height } = useWindowSize(0, 0);

	if (!width || !height) return null;

	const waves = model({ w: width, h: height, r: 40 });

	return <Svg {...{ width, height, waves }} />;
}
