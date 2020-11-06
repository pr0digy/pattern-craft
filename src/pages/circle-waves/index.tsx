import React, { useMemo } from 'react';
import { useWindowSize } from 'react-use';
import dynamic from 'next/dynamic';
import Drawer from '@material-ui/core/Drawer';
import Slider from '@material-ui/core/Slider';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: 200,
			padding: 20,
		},
		formControl: {
			margin: theme.spacing(1),
			minWidth: 120,
		},
		selectEmpty: {
			marginTop: theme.spacing(2),
		},
	}),
);

import model from './model';

const Svg = dynamic(() => import('./svg'), { ssr: false });

export const ModelContext = React.createContext(null);

export default function CircleWaves() {
	const classes = useStyles();
	const { width, height } = useWindowSize(0, 0);

	if (!width || !height) return null;

	const [zoom, setZoom] = React.useState(2);

	const handleZoomChange = (event, zoom) => {
		console.log(zoom);
		setZoom(zoom);
	};

	const [interpolation, setInterpolation] = React.useState('interpolateTurbo');

	const handleColorChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		setInterpolation(event.target.value as string);
	};

	const waves = useMemo(() => model({ w: width * 2, h: height * 2, r: 75 }), [width, height]);
	const circles = useMemo(() => waves.reduce((acc, wave) => acc.concat(wave), []), [waves]);
	console.log('circles count: ', circles.length);
	const toggleDrawer = (anchor, state) => console.log(anchor, state);

	return (
		<React.Profiler id="circle-waves" onRender={console.log}>
			<Drawer
				anchor="right"
				open={true}
				ModalProps={{
					BackdropProps: {
						invisible: false,
					},
				}}
				onClose={() => toggleDrawer('right', false)}
			>
				<div className={classes.root}>
					Zoom
					<Slider
						min={0.1}
						max={2}
						step={0.1}
						value={zoom}
						onChange={handleZoomChange}
						aria-labelledby="continuous-slider"
					/>
					<FormControl className={classes.formControl}>
						<InputLabel id="demo-simple-select-label">Colors</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={interpolation}
							onChange={handleColorChange}
						>
							<MenuItem value="interpolateTurbo">interpolateTurbo</MenuItem>
							<MenuItem value="interpolatePlasma">interpolatePlasma</MenuItem>
							<MenuItem value="interpolateViridis">interpolateViridis</MenuItem>
						</Select>
					</FormControl>
				</div>
			</Drawer>
			<ModelContext.Provider value={{ width, height, circles, zoom, interpolation }}>
				<Svg />
			</ModelContext.Provider>
		</React.Profiler>
	);
}
