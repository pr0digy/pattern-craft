import React, { useMemo } from 'react';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles({
	gradient: ({ colors }) => {
		const step = Math.ceil(100 / (colors.length - 1));
		const lastColor = `${colors.pop()} ${100}%`;

		const stops = colors.reduce((res, color: string, index: number) => {
			res.push(`${color} ${step * index}%`);
			return res;
		}, []);

		stops.push(lastColor);

		return {
			width: '100%',
			height: '20px',
			background: 'linear-gradient(90deg, ' + stops.join(', ') + ')',
		};
	},

	root: {
		padding: '2px 5px',
	},
});

export default function GradientButton({ interpolationName, resolution = 10, ...rest }) {
	const colors = [];
	const step = 1 / resolution;

	let index = 0;
	for (let i = 0; i <= resolution; i++) {
		colors.push(interpolationName(index));
		index += step;
	}

	const classes = useStyles({ colors });

	return (
		<MenuItem className={classes.root} {...rest}>
			<div className={classes.gradient} />
		</MenuItem>
	);
}
