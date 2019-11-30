import { Matrix, TrianglesMatrix } from '../models/matrix';
import { Injectable } from '@angular/core';
import { TriangleNumber } from '../models/triangle-number';
import { Shipment } from '../models/shipment';

@Injectable({ providedIn: 'root' })
export class TransportationProblemService {
  getNWCornerPath(senders: number[], receivers: number[]): Matrix {
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

  calculateCost(path: Matrix, costs: Matrix) {
    let sum = 0;

    for (let i = 0; i < costs.length; i++) {
      for (let j = 0; j < costs[0].length; j++) {
        if (path[i][j]) {
          sum += path[i][j] * costs[i][j];
        }
      }
    }

    return sum;
  }

  calculateTriangleCost(path: Matrix, costs: TrianglesMatrix) {
    let sum = new TriangleNumber(0, 0, 0);

    for (let i = 0; i < costs.length; i++) {
      for (let j = 0; j < costs[0].length; j++) {
        if (path[i][j]) {
          const { low, high, mid } = costs[i][j];

          const [lowCost, midCost, highCost] = [
            path[i][j] * low,
            path[i][j] * mid,
            path[i][j] * high,
          ];

          sum = new TriangleNumber(
            sum.low + lowCost,
            sum.mid + midCost,
            sum.high + highCost,
          );
        }
      }
    }

    return sum;
  }

  getClosedPath(path: Matrix, startI: number, startJ: number): Matrix {
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
          s.neighbors = this.getNeighbors(s, shipments);
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
      prev = this.getNeighbors(prev, shipments)[i % 2];
    }

    const minQuantity = Math.min(
      ...stones.filter((s, i) => i % 2).map(s => path[s.i][s.j]),
    );

    const changesMatrix = Array(path.length)
      .fill(0)
      .map(r => Array(path[0].length).fill(0));

    for (let i = 0; i < stones.length; i++) {
      changesMatrix[stones[i].i][stones[i].j] = minQuantity * (i % 2 ? -1 : 1);
    }

    return changesMatrix;
  }

  getNeighbors(search: Shipment, shipments: Shipment[]): Shipment[] {
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

  updatePath(path: Matrix, changes: Matrix): Matrix {
    const resPath = [];

    for (let i = 0; i < path.length; i++) {
      for (let j = 0; j < path[i].length; j++) {
        resPath[i][j] = path[i][j] + changes[i][j];
      }
    }

    return resPath;
  }
}
