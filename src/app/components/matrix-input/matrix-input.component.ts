import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { TriangleNumber } from 'src/app/core/models/triangle-number';
import { TrianglesMatrix, Matrix } from 'src/app/core/models/matrix';

const defaultMatrix = [
  [4, 1, 2, 7, 8],
  [7, 5, 3, 4, 6],
  [8, 4, 6, 2, 5],
];

const defaultTriangleMatrix = [
  ['2,4,5', '1,1,2', '1,2,3', '4,7,9', '7,8,9'],
  ['3,7,8', '5,5,6', '1,3,4', '3,4,5', '4,6,7'],
  ['5,8,9', '3,4,5', '5,6,7', '2,2,3', '3,5,6'],
];

@Component({
  selector: 'app-matrix-input',
  templateUrl: './matrix-input.component.html',
  styleUrls: ['./matrix-input.component.scss'],
})
export class MatrixInputComponent implements OnInit {
  @Input() rows = 1;

  @Input() cols = 1;

  @Input() type: 'default' | 'triangle' = 'default';

  @Input() defaultValue: number | TriangleNumber =
    this.type === 'default' ? 1 : new TriangleNumber(1, 2, 3);

  @Output() resetMatrix = new EventEmitter<null>();

  formInited = false;

  form: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.initForm();
  }

  ngOnInit() {
    this.initForm();
  }

  initMatrix(rows: number, cols: number) {
    this.rows = rows;
    this.cols = cols;
    this.initForm();
    this.formInited = true;
  }

  private initForm() {
    this.form = this.fb.group({
      rows: this.fb.array(
        Array(this.rows)
          .fill(0)
          .map((r, i) =>
            this.fb.group({
              cells: this.fb.array(
                Array(this.cols)
                  .fill(
                    this.type === 'default'
                      ? this.defaultValue
                      : Object.assign({}, this.defaultValue),
                  )
                  .map((c, j) =>
                    this.fb.control(
                      (this.type === 'default'
                        ? defaultMatrix[i][j]
                        : defaultTriangleMatrix[i][j]) || c,
                      [
                        ...(this.type === 'default'
                          ? [Validators.min(1), Validators.max(20)]
                          : []),
                        Validators.required,
                        control => {
                          if (this.type === 'default') {
                            return null;
                          }

                          const [low, mid, high] = control.value
                            .split(',')
                            .map(n => parseInt(n, 10));

                          return low <= mid && mid <= high
                            ? null
                            : { invalidTriangle: 'Invalid triangle number' };
                        },
                      ],
                    ),
                  ),
              ),
            }),
          ),
      ),
    });
  }

  get matrix(): Matrix | TrianglesMatrix {
    return (this.form.controls.rows as FormArray).value.map(r =>
      this.type === 'default'
        ? r.cells
        : r.cells.map(c => {
            const [low, mid, high] = c.split(',');
            return new TriangleNumber(low, mid, high);
          }),
    );
  }

  // get trianglesMatrix() {
  //   return (this.form.controls.rows as FormArray).value.map(r =>
  //     r.cells.map(c => {
  //       const [low, mid, high] = c.split(',');
  //       return new TriangleNubmer(low, mid, high);
  //     }),
  //   );
  // }
}
