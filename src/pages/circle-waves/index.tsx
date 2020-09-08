import React, { useMemo } from 'react';
import { useWindowSize } from 'react-use';
import dynamic from 'next/dynamic';
import Drawer from '@material-ui/core/Drawer';
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
	root: {
		width: 200,
		padding: 20,
	},
});

import model from './model';

const Svg = dynamic(() => import('./svg'), { ssr: false });

export default function CircleWaves() {
	const classes = useStyles();
	const { width, height } = useWindowSize(0, 0);

	if (!width || !height) return null;

	const [zoom, setZoom] = React.useState(2);

	const handleChange = (event, zoom) => {
		console.log(zoom);
		setZoom(zoom);
	};

	const waves = useMemo(() => model({ w: width * 2, h: height * 2, r: 30 }), [width, height]);
	const toggleDrawer = (anchor, state) => console.log(anchor, state);

	return (
		<React.Profiler id="sw" onRender={console.log}>
			<Drawer anchor="right" open={true} onClose={toggleDrawer('right', false)}>
				<div className={classes.root}>
					Zoom
					<Slider
						min={0.1}
						max={2}
						step={0.1}
						value={zoom}
						onChange={handleChange}
						aria-labelledby="continuous-slider"
					/>
				</div>
			</Drawer>
			<Svg {...{ width, height, waves, zoom }} />
		</React.Profiler>
	);
}
