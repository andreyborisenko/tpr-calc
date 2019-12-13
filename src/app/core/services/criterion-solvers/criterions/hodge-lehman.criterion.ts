import { CriterionSolver } from '../criterion-solver.interface';
import { Matrix } from 'src/app/core/models/matrix';
import { ICriterionResult } from '../criterion-result.interface';

export class HodjeLehmanCriterion extends CriterionSolver {
  calculate(matrix: Matrix, outerStates: number[]): ICriterionResult {
    const minInRow = matrix.map(r => Math.min(...r));

    const results = [];

    for (let v = 0; v <= 10; v++) {
      results.push([]);
      for (let i = 0; i < matrix.length; i++) {
        results[v][i] = +Number(
          (v / 10) * matrix[i].reduce((a, b, j) => a + b * outerStates[j], 0) +
            (1 - v / 10) * minInRow[i],
        ).toFixed(2);
      }
    }

    const bestIndexes = results.map(r => r.indexOf(Math.max(...r)));

    const bestIndexesCount: { [key: number]: number } = {};

    for (const bestIndex of bestIndexes) {
      if (bestIndex in bestIndexesCount) {
        bestIndexesCount[bestIndex]++;
      } else {
        bestIndexesCount[bestIndex] = 1;
      }
    }

    const { deviations, deviationsResult } = this.calculateDeviation(
      matrix.map(r => r.map(c => c * -1)),
    );

    const computationsMatrix = [
      minInRow,
      ...results,
      deviations,
      deviationsResult,
    ];

    return {
      additionalCompNames: [
        'min eij',
        ...Array(10)
          .fill(0)
          .map((c, i) => 'v = ' + `${i / 10}`.padStart(3, '0.')),
        'c = 1.0',
        'ξ = ξ(Z,0)',
        'min ξ',
      ],
      additionalComputations: computationsMatrix[0].map((c, j) =>
        computationsMatrix.map(r => r[j]),
      ),
      bestResultIndex: +Object.entries(bestIndexesCount)
        .sort((a, b) => b[1] - a[1])
        .shift()[0],
    };
  }
}
