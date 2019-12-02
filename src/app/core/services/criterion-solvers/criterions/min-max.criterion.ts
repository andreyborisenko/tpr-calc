import { CriterionSolver } from '../criterion-solver.interface';
import { ICriterionResult } from '../criterion-result.interface';

export class MinMaxCriterion extends CriterionSolver {
  calculate(matrix: number[][]): ICriterionResult {
    const results = matrix.map(r => Math.min(...r));

    return {
      additionalCompNames: ['min j eij'],
      additionalComputations: [results][0].map((c, j) =>
        [results].map(r => r[j]),
      ),
      bestResultIndex: results.indexOf(Math.max(...results)),
    };
  }
}
