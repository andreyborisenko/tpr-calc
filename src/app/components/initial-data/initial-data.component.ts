import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ViewChildren,
  QueryList,
  ChangeDetectorRef,
  ComponentFactoryResolver,
} from '@angular/core';
import { SendersReceiversComponent } from '../senders-receivers/senders-receivers.component';
import { MatrixInputComponent } from '../matrix-input/matrix-input.component';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { TransportationProblemService } from 'src/app/core/services/transportation-problem.service';
import { CycleSolverComponent } from '../cycle-solver/cycle-solver.component';
import { TrianglesMatrix, Matrix } from 'src/app/core/models/matrix';
import { CriterionEnum } from 'src/app/core/services/criterion-solvers/crtiterion.enum';
import { criterionNames } from 'src/app/core/services/criterion-solvers/criterion-names';
import { MatDialog } from '@angular/material';
import { CriterionPickerComponent } from '../criterion-picker/criterion-picker.component';
import { ICriterionResult } from 'src/app/core/services/criterion-solvers/criterion-result.interface';
import { CriterionComponent } from '../criterion/criterion.component';
import { SteppingStoneSolverComponent } from '../stepping-stone-solver/stepping-stone-solver.component';

interface Solution {
  costs: TrianglesMatrix;
  path: Matrix;
  criterion: CriterionEnum;
  prevSolutionResult?: ICriterionResult;
}

@Component({
  selector: 'app-initial-data',
  templateUrl: './initial-data.component.html',
  styleUrls: ['./initial-data.component.scss'],
})
export class InitialDataComponent implements OnInit {
  @ViewChild(SendersReceiversComponent, {
    static: true,
    read: SendersReceiversComponent,
  })
  sendersReceiversComponent: SendersReceiversComponent;

  @ViewChild(MatrixInputComponent, {
    static: true,
    read: MatrixInputComponent,
  })
  costsMatrixComponent: MatrixInputComponent;

  @ViewChild(SteppingStoneSolverComponent, {
    static: true,
    read: SteppingStoneSolverComponent,
  })
  ssComponent: SteppingStoneSolverComponent;

  @ViewChild('pathContainer', { static: true, read: ViewContainerRef })
  pathContainer: ViewContainerRef;

  @ViewChild('allCriterionsTemplate', { static: true, read: ViewContainerRef })
  allCriterionsContainer: ViewContainerRef;

  @ViewChildren(CycleSolverComponent) solutionComponents: QueryList<
    CycleSolverComponent
  >;

  @ViewChildren(CriterionComponent) criterionComponents: QueryList<
    CriterionComponent
  >;

  solutions: Solution[] = [];

  criterions = Object.values(CriterionEnum);

  allCriterionsMatrix: Matrix = [
    [-830, -1305, -2110],
    [-830, -1380, -2160],
    [-980, -1605, -2435],
    [-980, -1555, -2360],
    [-830, -1240, -1980],
    [-1070, -1605, -2350],
    [-880, -1505, -2310],
    [-820, -1275, -2100],
    [-810, -1265, -2060],
  ];

  constructor(
    private readonly trService: TransportationProblemService,
    private readonly dialog: MatDialog,
    private readonly cdr: ChangeDetectorRef,
    private readonly resolver: ComponentFactoryResolver,
  ) {}

  ngOnInit() {}

  onStepSelected(event: StepperSelectionEvent) {
    if (
      event.selectedStep.ariaLabel === 'matrix' &&
      !this.costsMatrixComponent.formInited
    ) {
      this.initMatrix();
    } else if (
      event.selectedStep.ariaLabel === 'path' &&
      this.solutions.length === 0
    ) {
      this.solve();
    } else if (event.selectedStep.ariaLabel === 'all-criterions') {
      this.calculateByAllCriterions();
    } else if (event.selectedStep.ariaLabel === 'stepping-stone') {
      this.solveBySteppingStone();
    }
  }

  initMatrix() {
    const rows = this.sendersReceiversComponent.sendersGroup.controls.count
      .value;
    const cols = this.sendersReceiversComponent.receiversGroup.controls.count
      .value;
    this.costsMatrixComponent.initMatrix(rows, cols);
  }

  async solve() {
    const dialogRef = this.dialog.open(CriterionPickerComponent, {
      width: '300px',
    });

    const criterion =
      (await dialogRef.afterClosed().toPromise()) || CriterionEnum.MM;

    this.solutions.push({
      costs: this.costsMatrixComponent.matrix as TrianglesMatrix,
      path:
        this.solutions.length === 0
          ? this.trService.getNWCornerPath(
              this.sendersReceiversComponent.senders.slice(0),
              this.sendersReceiversComponent.receivers.slice(0),
            )
          : this.solutionComponents.last.resultPath,
      criterion,
      prevSolutionResult:
        this.solutions.length !== 0
          ? this.solutionComponents.last.criterionComponent.result
          : null,
    });

    this.cdr.detectChanges();
    this.allCriterionsMatrix = this.solutionComponents.last.collectSolutions();
    this.calculateByAllCriterions();
    this.cdr.detectChanges();
  }

  solveBySteppingStone() {
    const path = this.trService.getNWCornerPath(
      this.sendersReceiversComponent.senders.slice(0),
      this.sendersReceiversComponent.receivers.slice(0),
    );
    this.ssComponent.solve(path);
  }

  getCriterionName(criterion: CriterionEnum) {
    return criterionNames[criterion];
  }

  get isProblemSolved(): boolean {
    return (
      this.solutions.length > 2 &&
      this.solutionComponents.last.criterionComponent.result.bestResultIndex ===
        0
    );
  }

  private calculateByAllCriterions() {
    this.criterionComponents.forEach(c => {
      c.matrix = this.allCriterionsMatrix = this.solutionComponents.last.collectSolutions();
      c.ngOnInit();
    });
  }
}
