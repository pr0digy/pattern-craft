import * as colors from 'd3-scale-chromatic';

export class Point {
	/** Horizontal coordinate */
	x: number;

	/** Vertical coordinate */
	y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
}

export class Circle extends Point {
	/** Circle radius */
	r: number;

	/** Unique id, may be used as key */
	id?: string;

	/** Ranges from 0 to 1, used for interpolation */
	colorIndex?: number;

	constructor(x: number, y: number, r: number) {
		super(x, y);
		this.r = r;
	}
}

export interface CircleWavesInterface {
	w: number;
	h: number;
	r: number;
}

export default function CircleWavesModel({ w, h, r = 50 }: CircleWavesInterface) {
	let waves: Circle[][] = [];

	const horizontalCount = Math.ceil(w / r / 2);
	const verticalCount = Math.ceil(h / r / 0.48);

	console.log({ horizontalCount, verticalCount });

	for (let i = 0; i < horizontalCount; i++) {
		const index = i === 0 ? i : i % 2 ? i + 1 : i - 1;

		if (!waves[index]) waves[index] = [];

		for (let j = 0; j < verticalCount; j++) {
			const circle = {
				id: `${i}-${j}`,
				x: r * 2 * (i + 1) - r,
				y: (r / 2) * (j + 1) - r,
				r: r + r * 0.03,
				colorIndex: (j + 1) / verticalCount,
			};

			if (i % 2) waves[index].push(circle);
			else waves[index].unshift(circle);
		}
	}

	return waves;
}
