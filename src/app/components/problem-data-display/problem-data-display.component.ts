import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { TrianglesMatrix, Matrix } from 'src/app/core/models/matrix';
import { TriangleNumber } from 'src/app/core/models/triangle-number';

interface FormulaPart {
  amount: number;
  i: number;
  j: number;
}

@Component({
  selector: 'app-problem-data-display',
  templateUrl: './problem-data-display.component.html',
  styleUrls: ['./problem-data-display.component.scss'],
})
export class ProblemDataDisplayComponent implements OnInit {
  @Input() type: 'default' | 'triangle' = 'default';

  @Input() path?: Matrix;

  @Input() costs: Matrix | TrianglesMatrix;

  formulaParts: FormulaPart[] = [];

  constructor() {}

  ngOnInit() {
    console.log('changes', this.path);
    if (this.path) {
      for (let i = 0; i < this.path.length; i++) {
        for (let j = 0; j < this.path[i].length; j++) {
          if (this.path[i][j]) {
            this.formulaParts.push({
              amount: this.path[i][j],
              i,
              j,
            });
          }
        }
      }
    }
  }

  get formulaResult() {
    return this.formulaParts.reduce(
      (a, b) => {
        if (typeof a === 'number') {
          return (a as number) + b.amount * (this.costs as Matrix)[b.i][b.j];
        } else {
          const { low, high, mid } = (this.costs as TrianglesMatrix)[b.i][b.j];

          const [lowCost, midCost, highCost] = [
            b.amount * low,
            b.amount * mid,
            b.amount * high,
          ];
          return new TriangleNumber(
            a.low + lowCost,
            a.mid + midCost,
            a.high + highCost,
          );
        }
      },
      this.type === 'default' ? 0 : new TriangleNumber(0, 0, 0),
    );
  }
}
