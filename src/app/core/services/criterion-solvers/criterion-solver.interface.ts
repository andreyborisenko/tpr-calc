import { Matrix } from '../../models/matrix';
import { ICriterionResult } from './criterion-result.interface';
import { TriangleNumber } from '../../models/triangle-number';

export abstract class CriterionSolver {
  protected computations: { [key: string]: number[] } = {};
  abstract calculate(matrix: Matrix, outerStates?: number[]): ICriterionResult;

  protected calculateDeviation(matrix: Matrix) {
    const deviations = [];

    if (matrix[0].length !== 3) {
      return {
        deviations: Array(matrix.length).fill(null),
        deviationsResult: Array(matrix.length).fill(null),
      };
    }

    for (const [low, mid, high] of matrix) {
      deviations.push(Math.round((low + 2 * mid + high) / 2));
    }

    const min = Math.min(...deviations);

    return {
      deviations,
      deviationsResult: deviations.map(d => (d === min ? d : null)),
    };
  }

  protected calculateBestIndex(bestIndexes: number[], deviations: number[]) {
    return deviations
      .map((d, i) => (bestIndexes.includes(i) ? { d, i } : null))
      .filter(d => d)
      .sort((a, b) => a.d - b.d)[0].i;
  }
}
