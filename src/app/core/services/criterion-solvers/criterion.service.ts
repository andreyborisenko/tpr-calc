import { Injectable } from '@angular/core';
import { CriterionSolver } from './criterion-solver.interface';
import { CriterionEnum } from './crtiterion.enum';
import { MinMaxCriterion } from './criterions/min-max.criterion';
import { Matrix } from '../../models/matrix';
import { ICriterionResult } from './criterion-result.interface';
import { PowersCriterion } from './criterions/powers.criterion';
import { SavageCriterion } from './criterions/savage.criterion';
import { HurwitzCriterion } from './criterions/hurwitz.criterion';
import { BayesLaplasCriterion } from './criterions/bayes-laplas.criterion';
import { HodjeLehmanCriterion } from './criterions/hodge-lehman.criterion';
import { HermeerCriterion } from './criterions/hermeer.criterion';

@Injectable({ providedIn: 'root' })
export class CriterionService {
  readonly solvers: { [key in CriterionEnum]: CriterionSolver } = {
    [CriterionEnum.MM]: new MinMaxCriterion(),
    [CriterionEnum.P]: new PowersCriterion(),
    [CriterionEnum.S]: new SavageCriterion(),
    [CriterionEnum.HW]: new HurwitzCriterion(),
    [CriterionEnum.BL]: new BayesLaplasCriterion(),
    [CriterionEnum.HL]: new HodjeLehmanCriterion(),
    [CriterionEnum.G]: new HermeerCriterion(),
  };

  solve(
    matrix: Matrix,
    criterion: CriterionEnum,
    outerStates: number[] = [],
  ): ICriterionResult {
    return this.solvers[criterion].calculate(matrix, outerStates);
  }
}
