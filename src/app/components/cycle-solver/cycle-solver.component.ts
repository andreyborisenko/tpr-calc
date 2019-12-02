import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Matrix, TrianglesMatrix } from 'src/app/core/models/matrix';
import { TransportationProblemService } from 'src/app/core/services/transportation-problem.service';
import { TriangleNumber } from 'src/app/core/models/triangle-number';
import { CriterionEnum } from 'src/app/core/services/criterion-solvers/crtiterion.enum';
import { CriterionComponent } from '../criterion/criterion.component';
import { Shipment } from 'src/app/core/models/shipment';
import { ICriterionResult } from 'src/app/core/services/criterion-solvers/criterion-result.interface';

interface Solution {
  path: Matrix;
  changes?: Matrix;
  accent?: Shipment;
}

@Component({
  selector: 'app-cycle-solver',
  templateUrl: './cycle-solver.component.html',
  styleUrls: ['./cycle-solver.component.scss'],
})
export class CycleSolverComponent implements OnInit {
  @ViewChild(CriterionComponent, { static: true, read: CriterionComponent })
  criterionComponent: CriterionComponent;

  @Input() index: number;

  @Input() costs: TrianglesMatrix;

  @Input() path: Matrix;

  @Input() criterion: CriterionEnum = CriterionEnum.MM;

  @Input() outerStates: number[];

  @Input() prevSolutionResult?: ICriterionResult;

  solutions: Solution[] = [];

  originalResult: TriangleNumber;

  constructor(private readonly trService: TransportationProblemService) {}

  ngOnInit() {
    this.originalResult = this.trService.calculateTriangleCost(
      this.path,
      this.costs,
    );

    let changes: Matrix;

    this.solutions.push({
      path: this.path,
    });

    for (let i = 0; i < this.path.length; i++) {
      for (let j = 0; j < this.path[0].length; j++) {
        if (this.path[i][j] === 0) {
          changes = this.trService.getClosedPath(this.path, i, j);
          this.solutions.push({
            path: this.trService.updatePath(this.path, changes),
            changes,
            accent: {
              i,
              j,
            },
          });
        }
      }
    }
  }

  collectSolutions(): Matrix {
    return this.trService.transformToWasteMatrix(
      this.solutions
        .map(s => this.trService.calculateTriangleCost(s.path, this.costs))
        .map(r => r.toArray()),
    );
  }

  get resultPath() {
    return this.solutions[this.criterionComponent.result.bestResultIndex].path;
  }
}
