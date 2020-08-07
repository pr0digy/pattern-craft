import React, { Fragment } from 'react';
import { Normalize } from 'styled-normalize';
import { useWindowSize } from 'react-use';

import App from './App';

export default function IndexPage() {
	return (
		<Fragment>
			<Normalize />
			<App />
		</Fragment>
	);
}
