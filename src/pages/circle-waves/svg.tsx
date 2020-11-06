import React, { memo, useRef, useEffect, useMemo, useContext } from 'react';
import { animated, useSpring } from 'react-spring';
import * as colors from 'd3-scale-chromatic';

import { ModelContext } from './';

let oz = { z: 1 };

const Waves = memo(function ({ waves }) {
	// const props = useSpring({ opacity: 1, from: { opacity: 0 } });
	// console.log({ ref });
	return waves.map((w: any) =>
		w.map((c: any) => <animated.circle key={c.id} cx={c.x} cy={c.y} r={c.r} fill={c.color} data-test={oz.z} />),
	);
});

class ClassWaves extends React.PureComponent {
	counter: number = 1;

	getCounter() {
		return oz.z;
	}

	constructor(props) {
		super(props);

		setTimeout(() => (this.counter = 5), 5000);
	}

	render() {
		const { waves } = this.props;
		console.log(this.counter);
		return waves.map((w: any) =>
			w.map((c: any) => (
				<animated.circle key={c.id} cx={c.x} cy={c.y} r={c.r} fill={c.color} data-test={this.getCounter()} />
			)),
		);
	}
}

const Circle = memo(({ c }) => {
	const { interpolation } = useContext(ModelContext);
	return <circle cx={c.x} cy={c.y} r={c.r} fill={colors[interpolation](c.colorIndex)} />;
});

const Circles = () => {
	// circles.map((c) => <circle key={c.id} cx={c.x} cy={c.y} r={c.r} fill={c.color} />),
	const { circles, interpolation } = useContext(ModelContext);
	// return circles.map((c) => <Circle key={c.id} {...{ c }} />);
	return circles.map((c) => (
		<circle key={c.key} cx={c.x} cy={c.y} r={c.r} fill={colors[interpolation](c.colorIndex)} />
	));
};

// export default memo(function CircleWaves({ width, height, circles, zoom, interpolation }) {
export default memo(function CircleWaves() {
	const { width, height, circles, interpolation, zoom } = useContext(ModelContext);

	const maxWidth = width * 2;
	const maxHeight = height * 2;

	const zm = zoom;
	const currentWidth = width * zm;
	const currentHeight = height * zm;
	const cx = maxWidth / 2 - currentWidth / 2;
	const cy = maxHeight / 2 - currentHeight / 2;

	// const ref = useRef(zoom);
	// useEffect(() => {
	// 	oz.z = zoom;
	// 	console.log(ref);
	// }, [zoom]);

	// console.log(circles);

	return (
		<svg width={width} height={height} viewBox={`${cx} ${cy} ${currentWidth} ${currentHeight}`}>
			{circles.map((c) => (
				<circle key={c.id} cx={c.x} cy={c.y} r={c.r} fill={colors[interpolation](c.colorIndex)} />
			))}
		</svg>
	);
});
