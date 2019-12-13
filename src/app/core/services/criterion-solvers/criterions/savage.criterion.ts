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

    const eir = computationsMatrix.map(r => Math.max(...r));

    const { deviations, deviationsResult } = this.calculateDeviation(
      matrix.map(r => r.map(c => c * -1)),
    );

    for (let i = 0; i < computationsMatrix.length; i++) {
      computationsMatrix[i].push(eir[i], deviations[i], deviationsResult[i]);
    }

    const min = Math.min(...eir);

    const bestResults = eir
      .map((r, i) => (r === min ? i : null))
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
