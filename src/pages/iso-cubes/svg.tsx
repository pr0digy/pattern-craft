import React, { memo, useContext } from 'react';
import { motion } from 'framer-motion';
import * as colorScales from 'd3-scale-chromatic';
import * as color from 'd3-color';
import { ModelContext } from '.';

export default memo(function IsoCubes() {
	const { width, height, interpolationName, zoom } = useContext(ModelContext);

	const zm = 1;
	const currentWidth = width * zm;
	const currentHeight = height * zm;

	const tileWidth = 150;
	const tileHeight = tileWidth / 2;
	const gridSize = [Math.ceil((width + tileWidth) / tileWidth), Math.ceil((height + tileHeight) / tileHeight)];

	return (
		<svg width={width} height={height} viewBox={`${0} ${0} ${currentWidth} ${currentHeight}`}>
			<g>{drawBlocks({ tileWidth, gridSize })}</g>
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
			res.push(<Tile {...{ tx, ty, points, key }} />);
			key++;
		}
	}

	return res;
}

function Tile({ points, fill = randomColor(), tx, ty }) {
	return <polygon points={points} fill={fill} transform={`translate(${tx}, ${ty})`} />;
}

console.log(colorScales);
function drawBlocks({ tileWidth = 100, gridSize = [10, 10] }) {
	const res = [];
	const [horizontalCount, verticalCount] = gridSize;
	const totalCount = horizontalCount * verticalCount;
	let key = 1;
	for (let x = 0; x < horizontalCount; x++) {
		for (let y = 0; y < verticalCount; y++) {
			// const dx = 15 - x,
			// 	dy = 15 - y,
			// 	dist = Math.sqrt(dx * dx + dy * dy),
			// 	z = Math.cos(dist * 0.75) * 2 + 2;
			// const z = Math.floor(Math.random() * 1);
			// const z = (gridSize - 1) * 2 - (x + y);
			const z = 1;
			res.push(<Block {...{ x, y, z, tileWidth, key, colorIndex: key / totalCount }} />);
			key++;
		}
	}

	return res;
}

function Block({ x, y, z, tileWidth, colorIndex }) {
	const top = colorScales.interpolateTurbo(colorIndex);
	// console.log(color.rgb(top));
	const right = color.rgb(top).brighter();
	const left = color.rgb(top).darker();

	// const tileWidth = 100;
	const tileHeight = tileWidth / 2;

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

	const even = !(y % 2);
	const tx = even ? x * tileWidth : x * tileWidth + tileWidth / 2;
	const ty = (y * tileWidth) / 1.333;

	return (
		<g id={`${x}-${y}`} transform={`translate(${tx}, ${ty})`}>
			<polygon points={topPoints} fill={top} />
			<polygon points={leftPoints} fill={left} />
			<polygon points={rightPoints} fill={right} />
			{/* <text transform={`translate(${-tileHeight / 4}, ${-tileHeight / 2})`} fontSize="10">{`${x}-${y}`}</text> */}
		</g>
	);
}
