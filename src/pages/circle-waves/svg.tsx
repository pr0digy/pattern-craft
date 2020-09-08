import React, { memo } from 'react';

const Waves = memo(function ({ waves }) {
	return waves.map((w: any) => w.map((c: any) => <circle key={c.id} cx={c.x} cy={c.y} r={c.r} fill={c.color} />));
});

export default memo(function CircleWaves({ width, height, waves, zoom }) {
	const maxWidth = width * 2;
	const maxHeight = height * 2;

	const zm = zoom;
	const currentWidth = width * zm;
	const currentHeight = height * zm;
	const cx = maxWidth / 2 - currentWidth / 2;
	const cy = maxHeight / 2 - currentHeight / 2;

	return (
		<svg width={width} height={height} viewBox={`${cx} ${cy} ${currentWidth} ${currentHeight}`}>
			<Waves {...{ waves }} />
			{/* {waves.map((w: any) =>
				w.map((c: any) => <animated.circle {...props} key={c.id} cx={c.x} cy={c.y} r={c.r} fill={c.color} />),
			)} */}
		</svg>
	);
});
