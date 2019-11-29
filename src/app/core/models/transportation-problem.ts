import { Matrix, TrianglesMatrix } from './matrix';

interface Shipment {
  i: number;
  j: number;
  neighbors?: Shipment[];
}
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

  static getClosedPath(path: Matrix, startI: number, startJ: number): Matrix {
    const startShipment = { i: startI, j: startJ };

    let shipments: Shipment[] = path
      .map((r, i) => r.map((c, j) => (c ? { i, j } : null)))
      .reduce((a, b) => [...a, ...b], [])
      .filter(s => s);

    shipments.unshift(startShipment);

    let initialLength = shipments.length;

    while (true) {
      shipments = shipments
        .map(s => {
          s.neighbors = TransportationProblem.getNeighbors(s, shipments);
          return s;
        })
        .filter(s => s.neighbors[0] && s.neighbors[1]);

      if (shipments.length === initialLength) {
        break;
      }

      initialLength = shipments.length;
    }

    const stones: Shipment[] = [];
    let prev = startShipment;

    for (let i = 0; i < shipments.length; i++) {
      stones[i] = prev;
      prev = TransportationProblem.getNeighbors(prev, shipments)[i % 2];
    }

    const minQuantity = Math.min(
      ...stones.filter((s, i) => i % 2).map(s => path[s.i][s.j]),
    );

    console.log(stones, minQuantity);

    const changesMatrix = Array(path.length)
      .fill(0)
      .map(r => Array(path[0].length).fill(0));

    for (let i = 0; i < stones.length; i++) {
      changesMatrix[stones[i].i][stones[i].j] = minQuantity * (i % 2 ? -1 : 1);
    }

    console.log(changesMatrix);

    // if (path[x][y]) {
    //   return [[]];
    // }

    // const lastInRow = path.map(
    //   r => r.length - [...r].reverse().findIndex(c => c) - 1,
    // );

    // const firstInRow = path.map(r => r.findIndex(c => c));
    // const firstInCol = Array(path[0].length).map((c, i) => path.map(r => r[i]));

    // console.log(firstInRow);
    // console.log(lastInRow);
    // console.log(firstInCol);

    // const getNeighbors = (x, y) => {
    //   // for (let i = 0; )
    // };

    return [[]];
  }

  static getNeighbors(search: Shipment, shipments: Shipment[]): Shipment[] {
    const neighbors = [];
    for (const shipment of shipments) {
      if (search.i === shipment.i && search.j === shipment.j) {
        continue;
      }

      if (search.i === shipment.i && !neighbors[0]) {
        neighbors[0] = shipment;
      }

      if (search.j === shipment.j && !neighbors[1]) {
        neighbors[1] = shipment;
      }

      if (neighbors[0] && neighbors[1]) {
        break;
      }
    }
    return neighbors;
  }

  static updatePath(path: Matrix, changes: Matrix): Matrix {
    const resPath = [];

    for (let i = 0; i < path.length; i++) {
      for (let j = 0; j < path[i].length; j++) {
        resPath[i][j] = path[i][j] + changes[i][j];
      }
    }

    return resPath;
  }
}
