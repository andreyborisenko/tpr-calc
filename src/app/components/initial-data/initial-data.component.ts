import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { TransportationProblem } from 'src/app/core/models/transportation-problem';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  AbstractFormGroupDirective,
  FormArray,
  FormControl,
} from '@angular/forms';
import { SendersReceiversComponent } from '../senders-receivers/senders-receivers.component';
import { MatrixInputComponent } from '../matrix-input/matrix-input.component';
import { MatStep } from '@angular/material';
import { StepperSelectionEvent } from '@angular/cdk/stepper';

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
  sendersReceivers: SendersReceiversComponent;

  @ViewChild(MatrixInputComponent, {
    static: true,
    read: MatrixInputComponent,
  })
  matrix: MatrixInputComponent;

  constructor() {}

  ngOnInit() {}

  onStepSelected(event: StepperSelectionEvent) {
    if (event.selectedIndex === 1 && !this.matrix.formInited) {
      this.initMatrix();
    }
  }

  initMatrix() {
    const rows = this.sendersReceivers.sendersGroup.controls.count.value;
    const cols = this.sendersReceivers.receiversGroup.controls.count.value;
    this.matrix.initMatrix(rows, cols);
  }
}
