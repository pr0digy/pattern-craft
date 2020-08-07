import React from 'react';

export default function CircleWaves({ width, height, waves }) {
	return (
		<svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
			{waves.map((w: any) => w.map((c: any) => <circle key={c.id} cx={c.x} cy={c.y} r={c.r} fill={c.color} />))}
		</svg>
	);
}
