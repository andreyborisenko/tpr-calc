import { CriterionSolver } from '../criterion-solver.interface';
import { ICriterionResult } from '../criterion-result.interface';

export class MinMaxCriterion extends CriterionSolver {
  calculate(matrix: number[][]): ICriterionResult {
    const eir = matrix.map(r => Math.min(...r));

    const { deviations, deviationsResult } = this.calculateDeviation(
      matrix.map(r => r.map(c => c * -1)),
    );

    const results = [];

    for (let i = 0; i < matrix.length; i++) {
      results[i] = [eir[i], deviations[i], deviationsResult[i]];
    }

    const max = Math.max(...eir);

    const bestResults = eir
      .map((r, i) => (r === max ? i : null))
      .filter(i => i !== null);

    const bestResultIndex =
      bestResults.length === 1
        ? bestResults[0]
        : this.calculateBestIndex(bestResults, deviations);

    console.log(bestResults, deviations, bestResultIndex);

    return {
      additionalCompNames: ['min j eij', 'ξ = ξ(Z,0)', 'min ξ'],
      additionalComputations: results,
      bestResultIndex,
    };
  }
}
