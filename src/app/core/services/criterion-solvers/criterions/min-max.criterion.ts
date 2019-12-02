import { CriterionSolver } from '../criterion-solver.interface';
import { ICriterionResult } from '../criterion-result.interface';

export class MinMaxCriterion extends CriterionSolver {
  calculate(matrix: number[][]): ICriterionResult {
    const results = matrix.map(r => Math.min(...r));

    this.computations['min j eij'] = results;

    const computationsMatrix = Object.values(this.computations);

    return {
      additionalCompNames: Object.keys(this.computations),
      additionalComputations: computationsMatrix[0].map((c, i) =>
        computationsMatrix.map(r => r[i]),
      ),
      bestResultIndex: results.indexOf(Math.max(...results)),
    };
  }
}
