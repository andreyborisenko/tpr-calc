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

    const eir = computationsMatrix
      .map<BigInt>(r => r.map(n => BigInt(n)).reduce((a, b) => a * b, 1n))
      .map<number>(b => +b.toString());

    const { deviations, deviationsResult } = this.calculateDeviation(
      matrix.map(r => r.map(c => c * -1)),
    );

    for (let i = 0; i < computationsMatrix.length; i++) {
      computationsMatrix[i].push(eir[i], deviations[i], deviationsResult[i]);
    }

    const max = Math.max(...eir);

    const bestResults = eir
      .map((r, i) => (r === max ? i : null))
      .filter(i => i !== null);

    const bestResultIndex =
      bestResults.length === 1
        ? bestResults[0]
        : this.calculateBestIndex(bestResults, deviations);

    return {
      additionalCompNames: [
        ...matrix[0].map((c, j) => `a i${j}`),
        'e ir',
        'ξ = ξ(Z,0)',
        'min ξ',
      ],
      additionalComputations: computationsMatrix,
      bestResultIndex,
    };
  }
}
