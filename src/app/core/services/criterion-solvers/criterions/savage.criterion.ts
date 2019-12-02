import { CriterionSolver } from '../criterion-solver.interface';
import { ICriterionResult } from '../criterion-result.interface';

export class SavageCriterion extends CriterionSolver {
  calculate(matrix: number[][]): ICriterionResult {
    const maxInCol = matrix[0]
      .map((c, j) => matrix.map(r => r[j]))
      .map(r => Math.max(...r));

    const computationsMatrix = [];

    for (let i = 0; i < matrix.length; i++) {
      computationsMatrix.push([]);
      for (let j = 0; j < matrix[0].length; j++) {
        computationsMatrix[i][j] = maxInCol[j] - matrix[i][j];
      }
    }

    const results = computationsMatrix.map(r => Math.max(...r));

    for (let i = 0; i < computationsMatrix.length; i++) {
      computationsMatrix[i].push(results[i]);
    }
    return {
      additionalCompNames: [...matrix[0].map((c, j) => `a i${j}`), 'e ir'],
      additionalComputations: computationsMatrix,
      bestResultIndex: results.indexOf(Math.min(...results)),
    };
  }
}
