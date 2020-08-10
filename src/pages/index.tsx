import React, { Fragment } from 'react';
import { create } from 'jss';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';

// import { Normalize } from 'styled-normalize';
const jss = create({
	plugins: [...jssPreset().plugins],
});

import App from './App';

export default function IndexPage() {
	return (
		<StylesProvider jss={jss}>
			{/* <Normalize /> */}
			<App />
		</StylesProvider>
	);
}
