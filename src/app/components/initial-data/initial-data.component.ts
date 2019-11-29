import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  TemplateRef,
} from '@angular/core';
import { SendersReceiversComponent } from '../senders-receivers/senders-receivers.component';
import { MatrixInputComponent } from '../matrix-input/matrix-input.component';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { ProblemDataDisplayComponent } from '../problem-data-display/problem-data-display.component';
import { TransportationProblem } from 'src/app/core/models/transportation-problem';

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

  @ViewChild('pathContainer', { static: true, read: ViewContainerRef })
  pathContainer: ViewContainerRef;

  // senders: number[];
  // receivers: number[];

  constructor(private readonly resolver: ComponentFactoryResolver) {}

  ngOnInit() {}

  onStepSelected(event: StepperSelectionEvent) {
    // if (event.previouslySelectedStep.ariaLabel === 'senders-receivers') {
    //   this.senders = [...this.sendersReceiversComponent.senders];
    //   this.receivers = [...this.sendersReceiversComponent.receivers];
    // }

    if (
      event.selectedStep.ariaLabel === 'matrix' &&
      !this.costsMatrixComponent.formInited
    ) {
      this.initMatrix();
    } else if (event.selectedStep.ariaLabel === 'path') {
      this.showPath();
    }
  }

  initMatrix() {
    const rows = this.sendersReceiversComponent.sendersGroup.controls.count
      .value;
    const cols = this.sendersReceiversComponent.receiversGroup.controls.count
      .value;
    this.costsMatrixComponent.initMatrix(rows, cols);
  }

  showPath() {
    this.pathContainer.clear();
    const factory = this.resolver.resolveComponentFactory(
      ProblemDataDisplayComponent,
    );
    const component = this.pathContainer.createComponent(factory);
    component.instance.type = this.costsMatrixComponent.type;
    component.instance.costs = this.costsMatrixComponent.matrix;
    component.instance.path = TransportationProblem.getNWCornerPath(
      this.sendersReceiversComponent.senders.slice(0),
      this.sendersReceiversComponent.receivers.slice(0),
    );

    TransportationProblem.getClosedPath(component.instance.path, 0, 3);
  }
}
