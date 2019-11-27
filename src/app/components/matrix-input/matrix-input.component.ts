import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-matrix-input',
  templateUrl: './matrix-input.component.html',
  styleUrls: ['./matrix-input.component.scss'],
})
export class MatrixInputComponent implements OnInit {
  @Input() rows: number;

  @Input() cols: number;

  @Input() defaultValue = 1;

  matrix: number[][];

  constructor() {}

  ngOnInit() {
    this.initMatrix();
  }

  private initMatrix() {
    this.matrix = Array(this.rows);
    for (let i = 0; i < this.rows; i++) {
      this.matrix[i] = Array(this.cols).fill(this.defaultValue);
    }
  }
}
