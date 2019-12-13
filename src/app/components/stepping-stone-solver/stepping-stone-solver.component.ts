import {
  Component,
  OnInit,
  Input,
  ViewChildren,
  QueryList,
  ChangeDetectorRef,
} from '@angular/core';
import { TrianglesMatrix, Matrix } from 'src/app/core/models/matrix';
import { SteppingStoneComponent } from '../stepping-stone/stepping-stone.component';

interface Step {
  path: Matrix;
}

@Component({
  selector: 'app-stepping-stone-solver',
  templateUrl: './stepping-stone-solver.component.html',
  styleUrls: ['./stepping-stone-solver.component.scss'],
})
export class SteppingStoneSolverComponent implements OnInit {
  @Input() costs: TrianglesMatrix;

  @Input() path: Matrix;

  @ViewChildren(SteppingStoneComponent) steppingStoneComponents: QueryList<
    SteppingStoneComponent
  >;

  steps: Step[] = [];

  constructor(private readonly cdr: ChangeDetectorRef) {}

  ngOnInit() {}

  solve(path: Matrix) {
    this.path = path;
    this.steps.push({
      path: this.path,
    });

    this.cdr.detectChanges();

    let lastResult = this.steppingStoneComponents.last.getResult();

    while (lastResult) {
      this.steps.push({
        path: lastResult.path,
      });

      this.cdr.detectChanges();

      lastResult = this.steppingStoneComponents.last.getResult();
    }
  }
}
