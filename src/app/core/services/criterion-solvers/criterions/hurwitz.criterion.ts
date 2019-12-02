import { CriterionSolver } from '../criterion-solver.interface';
import { ICriterionResult } from '../criterion-result.interface';
import { Matrix } from 'src/app/core/models/matrix';

export class HurwitzCriterion extends CriterionSolver {
  calculate(matrix: Matrix, outerStates: number[]): ICriterionResult {
    const maxInRow = matrix.map(r => Math.max(...r));
    const minInRow = matrix.map(r => Math.min(...r));

    const results = [];

    for (let c = 0; c <= 10; c++) {
      results.push([]);
      for (let i = 0; i < matrix.length; i++) {
        results[c][i] = +Number(
          (c / 10) * minInRow[i] - (1 - c / 10) * maxInRow[i],
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

    const computationsMatrix = [maxInRow, minInRow, ...results];

    return {
      additionalCompNames: [
        'max eij',
        'min eij',
        ...Array(10)
          .fill(0)
          .map((c, i) => 'c = ' + `${i / 10}`.padStart(3, '0.')),
        'c = 1.0',
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
