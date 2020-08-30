import React from 'react';
import { useWindowSize } from 'react-use';
import dynamic from 'next/dynamic';
import Drawer from '@material-ui/core/Drawer';
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
	root: {
		width: 200,
	},
});

import model from './model';

const Svg = dynamic(() => import('./svg'), { ssr: false });

export default function CircleWaves() {
	const classes = useStyles();
	const { width, height } = useWindowSize(0, 0);

	if (!width || !height) return null;

	const [r, setValue] = React.useState(60);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const waves = model({ w: width, h: height, r });
	const toggleDrawer = (anchor, state) => console.log(anchor, state);

	return (
		<>
			<Drawer anchor="right" open={true} onClose={toggleDrawer('right', false)}>
				<div className={classes.root}>
					aaa
					<Slider value={r} onChange={handleChange} aria-labelledby="continuous-slider" />
				</div>
			</Drawer>
			<Svg {...{ width, height, waves }} />
		</>
	);
}
