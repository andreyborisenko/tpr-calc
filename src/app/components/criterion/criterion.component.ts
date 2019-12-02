import { Component, OnInit, Input } from '@angular/core';
import { CriterionEnum } from 'src/app/core/services/criterion-solvers/crtiterion.enum';
import { CriterionService } from 'src/app/core/services/criterion-solvers/criterion.service';
import { Matrix } from 'src/app/core/models/matrix';
import { ICriterionResult } from 'src/app/core/services/criterion-solvers/criterion-result.interface';
import { criterionNames } from 'src/app/core/services/criterion-solvers/criterion-names';

@Component({
  selector: 'app-criterion',
  templateUrl: './criterion.component.html',
  styleUrls: ['./criterion.component.scss'],
})
export class CriterionComponent implements OnInit {
  @Input() solutionIndex: number;

  @Input() matrix: Matrix;

  @Input() criterion: CriterionEnum;

  @Input() outerStates: number[];

  result: ICriterionResult;

  constructor(private readonly criterionService: CriterionService) {}

  ngOnInit() {
    this.result = this.criterionService.solve(
      this.matrix,
      this.criterion,
      this.outerStates,
    );
  }

  get criterionName() {
    return criterionNames[this.criterion];
  }
}
