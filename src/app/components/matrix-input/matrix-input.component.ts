import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-matrix-input',
  templateUrl: './matrix-input.component.html',
  styleUrls: ['./matrix-input.component.scss'],
})
export class MatrixInputComponent implements OnInit {
  @Input() rows = 1;

  @Input() cols = 1;

  @Input() defaultValue = 1;

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
    // this.cdr.detectChanges();
  }

  private initForm() {
    this.form = this.fb.group({
      rows: this.fb.array(
        Array(this.rows)
          .fill(0)
          .map(r =>
            this.fb.group({
              cells: this.fb.array(
                Array(this.cols)
                  .fill(this.defaultValue)
                  .map(c =>
                    this.fb.control(c, [
                      Validators.min(1),
                      Validators.max(20),
                      Validators.required,
                    ]),
                  ),
              ),
            }),
          ),
      ),
    });
  }

  getMatrix() {
    return (this.form.controls.rows as FormArray).value.map(r => r.cells);
  }
}
