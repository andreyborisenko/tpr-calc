import { Component, OnInit, Input } from '@angular/core';
import { TrianglesMatrix, Matrix } from 'src/app/core/models/matrix';
import { Shipment } from 'src/app/core/models/shipment';
import { TriangleNumber } from 'src/app/core/models/triangle-number';
import { TransportationProblemService } from 'src/app/core/services/transportation-problem.service';

interface Solution {
  path: Matrix;
  changes?: Matrix;
  accent?: Shipment;
  enhancementIndex: number;
}

@Component({
  selector: 'app-stepping-stone',
  templateUrl: './stepping-stone.component.html',
  styleUrls: ['./stepping-stone.component.scss'],
})
export class SteppingStoneComponent implements OnInit {
  @Input() index: number;

  @Input() costs: TrianglesMatrix;

  @Input() path: Matrix;

  solutions: Solution[] = [];

  originalResult: TriangleNumber;

  constructor(private readonly trService: TransportationProblemService) {}

  ngOnInit() {
    if (!this.path || !this.costs) {
      return;
    }

    this.originalResult = this.trService.calculateTriangleCost(
      this.path,
      this.costs,
    );

    this.solutions.push({
      path: this.path,
      enhancementIndex: 0,
    });

    let enhancementIndex: TriangleNumber;

    for (let i = 0; i < this.path.length; i++) {
      for (let j = 0; j < this.path[0].length; j++) {
        if (this.path[i][j] === null) {
          const {
            changesMatrix: changes,
            leaving,
            stones,
          } = this.trService.getClosedPath(this.path, i, j);

          enhancementIndex = this.trService.calculateEnhancementIndex(
            stones,
            this.costs,
          );

          console.log(i, j, enhancementIndex.toString());

          if (!enhancementIndex.isValid) {
            console.log(`Invalid enhancement index`);
            continue;
          }

          this.solutions.push({
            path: this.trService.updatePath(this.path, changes, leaving),
            changes,
            accent: {
              i,
              j,
            },
            enhancementIndex: enhancementIndex.defuzzify(),
          });
        }
      }
    }
  }

  getResult() {
    const minIndex = Math.min(...this.solutions.map(s => s.enhancementIndex));

    return minIndex < 0
      ? this.solutions.find(s => s.enhancementIndex === minIndex)
      : false;
  }
}
