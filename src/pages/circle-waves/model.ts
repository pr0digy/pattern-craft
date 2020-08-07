import * as colors from 'd3-scale-chromatic';
import { nanoid } from 'nanoid';

console.log(colors.interpolateRainbow(0.1));
console.log(colors.interpolateRainbow(0.5));

class Point {
	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
}

class Circle extends Point {
	r: number;
	constructor(x: number, y: number, r: number) {
		super(x, y);
		this.r = r;
	}
}

export default class Model {
	w: number = 100;
	h: number = 100;
	r: number = 50;
	waves: Circle[][];
	interpolate: Function = colors.interpolatePlasma;

	constructor(w: number, h: number, r: number = 100) {
		this.w = w;
		this.h = h;

		this.waves = this.initialize();
	}

	getState() {
		return this.waves;
	}

	initialize() {
		let waves: Circle[][] = [];
		for (let i = 0; i < 15; i++) {
			const index = i === 0 ? i : i % 2 ? i + 1 : i - 1;

			if (!waves[index]) waves[index] = [];

			for (let j = 0; j < 30; j++) {
				const verticalBase = this.r * 0.5 * (j + 1) + 100;
				const circle = {
					id: nanoid(),
					x: this.r * 2 * (i + 1),
					y: i % 2 ? verticalBase : verticalBase + 0,
					r: this.r + this.r * 0.03,
					color: this.interpolate((j + 1) / 30),
				};

				if (i % 2) waves[index].push(circle);
				else waves[index].unshift(circle);
			}
		}

		console.log(waves);

		return waves;
	}
}
