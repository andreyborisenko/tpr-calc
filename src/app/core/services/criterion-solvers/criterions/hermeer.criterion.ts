import { CriterionSolver } from '../criterion-solver.interface';
import { ICriterionResult } from '../criterion-result.interface';
import { Matrix } from 'src/app/core/models/matrix';

export class HermeerCriterion extends CriterionSolver {
  calculate(matrix: Matrix, outerStates: number[]): ICriterionResult {
    const computationsMatrix = matrix.map(r =>
      r.map((c, j) => +Number(c * outerStates[j]).toFixed(0)),
    );

    const results = computationsMatrix.map(r => Math.min(...r));

    for (let i = 0; i < computationsMatrix.length; i++) {
      computationsMatrix[i].push(results[i]);
    }

    return {
      additionalCompNames: [
        ...Array(3)
          .fill(0)
          .map((_, j) => `e i${j} * q${j}`),
        'e ir',
      ],
      additionalComputations: computationsMatrix,
      bestResultIndex: results.indexOf(Math.max(...results)),
    };
  }
}
