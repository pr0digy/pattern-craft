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

// interface CircleWaves {
//   wave: Circle[];
// }

export default class Model {
  state: Circle[][];

  constructor(w: number, h: number, r: number = 100) {
    this.state = this.initialize(w, h, r);
  }

  getState() {
    return this.state;
  }

  initialize(w: number, h: number, r: number = 100) {
    let waves = [
      [
        { x: 100, y: 100, r },
        { x: 200, y: 200, r },
      ],
    ];
    // for (let i = 0; i < 10; i++) {

    // }

    return waves;
  }
}
