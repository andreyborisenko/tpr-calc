import { CriterionSolver } from '../criterion-solver.interface';
import { ICriterionResult } from '../criterion-result.interface';

export class PowersCriterion extends CriterionSolver {
  calculate(matrix: number[][]): ICriterionResult {
    const shift =
      Math.abs(Math.min(...matrix.reduce((a, b) => a.concat(b), []))) + 1;

    const computationsMatrix = [];

    for (let i = 0; i < matrix.length; i++) {
      computationsMatrix.push([]);
      for (let j = 0; j < matrix[0].length; j++) {
        computationsMatrix[i][j] = matrix[i][j] + shift;
      }
    }

    const results = computationsMatrix
      .map<BigInt>(r => r.map(n => BigInt(n)).reduce((a, b) => a * b, 1n))
      .map<number>(b => +b.toString());

    for (let i = 0; i < computationsMatrix.length; i++) {
      computationsMatrix[i].push(results[i]);
    }

    return {
      additionalCompNames: [...matrix[0].map((c, j) => `a i${j}`), 'e ir'],
      additionalComputations: computationsMatrix,
      bestResultIndex: results.indexOf(Math.max(...results)),
    };
  }
}
