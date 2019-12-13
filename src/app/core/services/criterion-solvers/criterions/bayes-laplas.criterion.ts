import { CriterionSolver } from '../criterion-solver.interface';
import { Matrix } from 'src/app/core/models/matrix';
import { ICriterionResult } from '../criterion-result.interface';

export class BayesLaplasCriterion extends CriterionSolver {
  calculate(matrix: Matrix, outerStates: number[]): ICriterionResult {
    const results = matrix.map(r =>
      r.map((c, j) => +Number(c * outerStates[j]).toFixed(0)),
    );

    const eir = results.map(r => r.reduce((a, b) => a + b, 0));

    const { deviations, deviationsResult } = this.calculateDeviation(
      matrix.map(r => r.map(c => c * -1)),
    );

    for (let i = 0; i < results.length; i++) {
      results[i].push(eir[i], deviations[i], deviationsResult[i]);
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
        'eij * q1',
        'eij * q2',
        'eij * q3',
        'eir',
        'ξ = ξ(Z,0)',
        'min ξ',
      ],
      additionalComputations: results,
      bestResultIndex,
    };
  }
}
