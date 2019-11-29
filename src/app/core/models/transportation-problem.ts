import { Matrix, TrianglesMatrix } from './matrix';

export class TransportationProblem {
  static getNWCornerPath(senders: number[], receivers: number[]): Matrix {
    const path = [];

    for (let i = 0, nw = 0; i < senders.length; i++) {
      path.push(Array(receivers.length).fill(0));
      for (let j = nw; j < receivers.length; j++) {
        if (senders[i] > receivers[j]) {
          senders[i] -= receivers[j];
          path[i][j] = receivers[j];
          receivers[i] = 0;
          nw++;
        } else {
          receivers[j] -= senders[i];
          path[i][j] = senders[i];
          senders[i] = 0;
          break;
        }
      }
    }

    return path;
  }

  static calculateCost(path: Matrix, costs: Matrix) {}

  static calculateTriangleCost(path: Matrix, costs: TrianglesMatrix) {}

  static getClosedPath(path: Matrix, x: number, y: number): Matrix {
    if (path[x][y]) {
      return [[]];
    }

    const lastInRow = path.map(
      r => r.length - [...r].reverse().findIndex(c => c) - 1,
    );

    const firstInRow = path.map(r => r.findIndex(c => c));
    const firstInCol = Array(path[0].length).map((c, i) => path.map(r => r[i]));

    console.log(firstInRow);
    console.log(lastInRow);
    console.log(firstInCol);

    const getNeighbors = (x, y) => {
      // for (let i = 0; )
    };
  }
}
