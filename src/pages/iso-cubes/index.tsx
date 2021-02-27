import React, { ChangeEvent, useMemo } from 'react';
import { useWindowSize } from 'react-use';
import dynamic from 'next/dynamic';
import Drawer from '@material-ui/core/Drawer';
import Slider from '@material-ui/core/Slider';

import { MenuList } from '@material-ui/core';
import * as colors from 'd3-scale-chromatic';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import GradientMenuItem from 'components/GradientMenuItem';
// import model from '../../models/circle-waves';

export const ModelContext = React.createContext(null);

const gradients = Object.keys(colors).filter((v) => v.includes('interpolate'));
console.log(gradients);

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

const Svg = dynamic(() => import('./svg'), { ssr: false });

export default function CircleWaves() {
	const classes = useStyles();
	const { width, height } = useWindowSize(0, 0);

	if (!width || !height) return null;

	const [zoomMin, zoomMax, zoomStep] = [0.1, 1, 0.1];
	const [zoom, setZoom] = React.useState(1);
	const [interpolationName, setInterpolationName] = React.useState('interpolatePlasma');

	const handleColorChange = (gradientName: string) => () => setInterpolationName(gradientName);
	const handleZoomChange = (event: ChangeEvent<{}>, zoom: number | number[]) => {
		setZoom(Number(zoom));
	};

	// const waves = useMemo(() => model({ w: width * 2, h: height * 2, r: 200 }), [width, height]);
	// const circles = useMemo(() => waves.reduce((acc, wave) => acc.concat(wave), []), [waves]);
	// const toggleDrawer = (anchor: string, state: boolean) => console.log(anchor, state);

	return (
		<ModelContext.Provider value={{ width, height, zoom, interpolationName }}>
			<Svg />
		</ModelContext.Provider>
	);

	return (
		<>
			<Drawer
				anchor="right"
				open={true}
				ModalProps={{
					BackdropProps: {
						invisible: true,
					},
				}}
				// onClose={() => toggleDrawer('right', false)}
			>
				<div className={classes.root}>
					<Typography id="continuous-slider">Zoom</Typography>
					<Slider
						min={zoomMin}
						max={zoomMax}
						step={zoomStep}
						value={zoom}
						onChange={handleZoomChange}
						aria-labelledby="continuous-slider"
					/>

					<MenuList>
						{gradients.map((gradientName) => (
							<GradientMenuItem
								key={gradientName}
								{...{
									interpolate: colors[gradientName],
									selected: gradientName === interpolationName,
									onClick: handleColorChange(gradientName),
								}}
							/>
						))}
					</MenuList>
				</div>
			</Drawer>
			<ModelContext.Provider value={{ width, height, zoom, interpolationName }}>
				<Svg />
			</ModelContext.Provider>
		</>
	);
}
