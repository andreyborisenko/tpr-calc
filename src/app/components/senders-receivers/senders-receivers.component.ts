import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';

const defaultSendersCount = 3;
const defaultReceiversCount = 5;

const defaultSenders = [500, 340, 220];
const defaultReceivers = [275, 190, 135, 210, 250];
const defaultOuterStates = [0.2, 0.55, 0.25];

@Component({
  selector: 'app-senders-receivers',
  templateUrl: './senders-receivers.component.html',
  styleUrls: ['./senders-receivers.component.scss'],
})
export class SendersReceiversComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  sendersGroup: FormGroup;
  receiversGroup: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.initForm();
  }

  ngOnInit() {
    for (const group of [this.sendersGroup, this.receiversGroup]) {
      group.controls.count.valueChanges.subscribe(v => {
        this.fitArray(group.controls.array as FormArray, parseInt(v, 10));
      });
    }
  }

  private initForm() {
    this.form = this.fb.group(
      {
        senders: this.fb.group({
          count: this.fb.control(defaultSendersCount, [
            Validators.min(2),
            Validators.max(10),
            Validators.required,
          ]),
          array: this.fb.array(
            Array(defaultSendersCount)
              .fill(50)
              .map((s, i) =>
                this.fb.control(defaultSenders[i] || s, [
                  Validators.min(1),
                  Validators.max(500),
                  Validators.required,
                ]),
              ),
          ),
        }),
        receivers: this.fb.group({
          count: this.fb.control(defaultReceiversCount, [
            Validators.min(2),
            Validators.max(10),
            Validators.required,
          ]),
          array: this.fb.array(
            Array(defaultReceiversCount)
              .fill((50 * defaultSendersCount) / defaultReceiversCount)
              .map((r, i) =>
                this.fb.control(defaultReceivers[i] || r, [
                  Validators.min(1),
                  Validators.max(500),
                  Validators.required,
                ]),
              ),
          ),
        }),
        outerStates: this.fb.array(
          Array(3)
            .fill(0)
            .map((o, i) =>
              this.fb.control(defaultOuterStates[i], [
                Validators.min(0.01),
                Validators.max(1),
                Validators.required,
              ]),
            ),
        ),
      },
      {
        validators: [
          (form: FormGroup) => {
            const sendersGroup = form.controls.senders as FormGroup;
            const receiversGroup = form.controls.receivers as FormGroup;

            const sendersSum = (sendersGroup.controls
              .array as FormArray).value.reduce((a, b) => a + b, 0);
            const receiversSum = (receiversGroup.controls
              .array as FormArray).value.reduce((a, b) => a + b, 0);

            return sendersSum === receiversSum
              ? null
              : { sumMissmatch: 'Senders and receivers sum doesnt match!' };
          },
          (form: FormGroup) => {
            const outerStatesSum = form.controls.outerStates.value.reduce(
              (a, b) => a + b,
              0,
            );

            return outerStatesSum === 1
              ? null
              : { outerStatesSum: 'Outer states sum must be equal to 1!' };
          },
        ],
      },
    );
    this.sendersGroup = this.form.controls.senders as FormGroup;
    this.receiversGroup = this.form.controls.receivers as FormGroup;
  }

  get senders() {
    return this.sendersGroup.controls.array.value;
  }

  get receivers() {
    return this.receiversGroup.controls.array.value;
  }

  get outerStates() {
    return this.form.controls.outerStates.value;
  }

  private fitArray(array: FormArray, size: number) {
    const currentSize = array.length;

    if (currentSize === size) {
      return true;
    }

    if (currentSize < size) {
      array.push(
        this.fb.control(10, [
          Validators.min(1),
          Validators.max(500),
          Validators.required,
        ]),
      );
    } else {
      for (let i = size - 1; i < currentSize; i++) {
        array.removeAt(i);
      }
    }
  }
}
