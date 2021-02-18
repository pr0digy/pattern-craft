import React, { memo, useContext } from 'react';
import { motion } from 'framer-motion';
import * as colors from 'd3-scale-chromatic';
import { ModelContext } from './';
import { Circle as CircleInterface } from '../../models/circle-waves';

const Circle = memo(({ c, interpolationName }: { c: CircleInterface; interpolationName: string }) => {
	return (
		<motion.circle
			key={c.id}
			cx={c.x}
			cy={c.y}
			r={c.r}
			fill={colors[interpolationName](c.colorIndex)}
			animate={{ fill: colors[interpolationName](c.colorIndex) }}
			transition={{ ease: 'easeIn', duration: 0.25 }}
		/>
	);
});

export default memo(function CircleWaves() {
	const { width, height, circles, interpolationName, zoom } = useContext(ModelContext);

	const maxWidth = width * 2;
	const maxHeight = height * 2;

	const zm = zoom;
	const currentWidth = width * zm;
	const currentHeight = height * zm;
	const cx = maxWidth / 2 - currentWidth / 2;
	const cy = maxHeight / 2 - currentHeight / 2;

	return (
		<svg width={width} height={height} viewBox={`${cx} ${cy} ${currentWidth} ${currentHeight}`}>
			{circles.map((c: CircleInterface) => {
				return <Circle key={c.id} {...{ c, interpolationName }} />;
			})}
		</svg>
	);
});
