import { Component, OnInit, Input } from '@angular/core';
import { Matrix, TrianglesMatrix } from 'src/app/core/models/matrix';

@Component({
  selector: 'app-problem-table',
  templateUrl: './problem-table.component.html',
  styleUrls: ['./problem-table.component.scss'],
})
export class ProblemTableComponent implements OnInit {
  @Input() path?: Matrix;

  @Input() costs: Matrix | TrianglesMatrix;

  @Input() changes?: Matrix;

  constructor() {}

  ngOnInit() {}
}
