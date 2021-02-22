import React, { memo, useContext } from 'react';
import { motion } from 'framer-motion';
import * as colors from 'd3-scale-chromatic';
import { ModelContext } from '.';

export default memo(function CircleWaves() {
	const { width, height, circles, interpolationName, zoom } = useContext(ModelContext);

	const maxWidth = width * 2;
	const maxHeight = height * 2;

	const zm = zoom;
	const currentWidth = width * zm;
	const currentHeight = height * zm;
	const cx = maxWidth / 2 - currentWidth / 2;
	const cy = maxHeight / 2 - currentHeight / 2;

	const rectSize = 200;
	const gridSize = 10;

	return (
		<svg width={width} height={height} viewBox={`${cx} ${cy} ${currentWidth} ${currentHeight}`}>
			<g transform={`translate(${width / 2 + gridSize * 50}, ${height / 2 + gridSize * 25})`}>{drawTiles(gridSize)}</g>
		</svg>
	);
});

function randomColor() {
	var r = Math.floor(Math.random() * 255);
	var g = Math.floor(Math.random() * 255);
	var b = Math.floor(Math.random() * 255);
	return 'rgb(' + r + ',' + g + ',' + b + ')';
}

function drawTiles(size) {
	const tileWidth = 100;
	const tileHeight = 50;

	const coordinates = [
		[0, 0],
		[tileWidth / 2, tileHeight / 2],
		[0, tileHeight],
		[-tileWidth / 2, tileHeight / 2],
	];

	const points = coordinates.map((c) => c.join(',')).join(' ');

	const res = [];
	let key = 1;
	for (let x = 0; x < size; x++) {
		for (let y = 0; y < size; y++) {
			const tx = ((x - y) * tileWidth) / 2;
			const ty = ((x + y) * tileHeight) / 2;
			res.push(<Tile key={key} {...{ tx, ty, points }} />);
			key++;
		}
	}

	return res;
}

function Tile({ points, fill = randomColor(), tx, ty }) {
	return <polygon points={points} fill={fill} transform={`translate(${tx}, ${ty})`} />;
}

function drawBlocks(size = 10) {
	const res = [];
	for (let x = 0; x < size; x++) {
		for (let y = 0; y < size; y++) {
			var dx = 15 - x,
				dy = 15 - y,
				dist = Math.sqrt(dx * dx + dy * dy),
				z = Math.cos(dist * 0.75) * 2 + 2;
			res.push(Block({ x, y, z }));
		}
	}

	return res;
}

function Block({ x, y, z }) {
	const top = '#eee';
	const right = '#ccc';
	const left = '#999';

	const tileWidth = 100;
	const tileHeight = 50;

	const topCoords = [
		[0, -z * tileHeight],
		[tileWidth / 2, tileHeight / 2 - z * tileHeight],
		[0, tileHeight - z * tileHeight],
		[-tileWidth / 2, tileHeight / 2 - z * tileHeight],
	];

	const topPoints = topCoords.map((c) => c.join(',')).join(' ');

	const leftCoords = [
		[-tileWidth / 2, tileHeight / 2 - z * tileHeight],
		[0, tileHeight - z * tileHeight],
		[0, tileHeight],
		[-tileWidth / 2, tileHeight / 2],
	];

	const leftPoints = leftCoords.map((c) => c.join(',')).join(' ');

	const rightCoords = [
		[tileWidth / 2, tileHeight / 2 - z * tileHeight],
		[0, tileHeight - z * tileHeight],
		[0, tileHeight],
		[tileWidth / 2, tileHeight / 2],
	];

	const rightPoints = rightCoords.map((c) => c.join(',')).join(' ');

	const tx = ((x - y) * tileWidth) / 2;
	const ty = ((x + y) * tileHeight) / 2;

	return (
		<g transform={`translate(${tx}, ${ty})`}>
			<polygon points={topPoints} fill={top} transform={`translate(${tx}, ${ty})`} />
			<polygon points={leftPoints} fill={left} transform={`translate(${tx}, ${ty})`} />
			<polygon points={rightPoints} fill={right} transform={`translate(${tx}, ${ty})`} />
		</g>
	);
}
