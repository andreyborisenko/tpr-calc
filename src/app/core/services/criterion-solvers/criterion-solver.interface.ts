import { Matrix } from '../../models/matrix';
import { ICriterionResult } from './criterion-result.interface';

export abstract class CriterionSolver {
  protected computations: { [key: string]: number[] } = {};
  abstract calculate(matrix: Matrix, outerStates?: number[]): ICriterionResult;
}
