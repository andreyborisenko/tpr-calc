import { CriterionSolver } from '../criterion-solver.interface';
import { ICriterionResult } from '../criterion-result.interface';
import { Matrix } from 'src/app/core/models/matrix';

export class HermeerCriterion extends CriterionSolver {
  calculate(matrix: Matrix, outerStates: number[]): ICriterionResult {
    const computationsMatrix = matrix.map(r =>
      r.map((c, j) => +Number(c * outerStates[j]).toFixed(0)),
    );

    const eir = computationsMatrix.map(r => Math.min(...r));

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
        ...Array(3)
          .fill(0)
          .map((_, j) => `e i${j} * q${j}`),
        'e ir',
        'ξ = ξ(Z,0)',
        'min ξ',
      ],
      additionalComputations: computationsMatrix,
      bestResultIndex,
    };
  }
}
