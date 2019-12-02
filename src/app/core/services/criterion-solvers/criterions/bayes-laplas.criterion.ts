import { CriterionSolver } from '../criterion-solver.interface';
import { Matrix } from 'src/app/core/models/matrix';
import { ICriterionResult } from '../criterion-result.interface';

export class BayesLaplasCriterion extends CriterionSolver {
  calculate(matrix: Matrix, outerStates: number[]): ICriterionResult {
    const results = matrix.map(r =>
      r.map((c, j) => +Number(c * outerStates[j]).toFixed(0)),
    );

    const eir = results.map(r => r.reduce((a, b) => a + b, 0));

    for (let i = 0; i < results.length; i++) {
      results[i].push(eir[i]);
    }

    return {
      additionalCompNames: ['eij * q1', 'eij * q2', 'eij * q3', 'eir'],
      additionalComputations: results,
      bestResultIndex: eir.indexOf(Math.max(...eir)),
    };
  }
}
