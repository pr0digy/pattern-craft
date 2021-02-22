import React from 'react';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';

const useStyles = makeStyles({
	root: {
		position: 'fixed',
		right: 50,
		bottom: '50px',
	},
});

export default function App() {
	const styles = useStyles();
	return (
		<div className="App">
			<ul>
				<li>
					<Link href="/circle-waves">Circle waves</Link>
				</li>
				<li>
					<Link href="/iso-cubes">Isometric cubes</Link>
				</li>
			</ul>
			<Fab color="primary" aria-label="add" className={styles.root}>
				<KeyboardArrowUpIcon />
			</Fab>
		</div>
	);
}
