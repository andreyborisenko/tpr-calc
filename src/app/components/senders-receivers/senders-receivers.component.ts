import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-senders-receivers',
  templateUrl: './senders-receivers.component.html',
  styleUrls: ['./senders-receivers.component.scss'],
})
export class SendersReceiversComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  private readonly defaultSendersCount = 3;
  private readonly defaultReceiversCount = 5;

  sendersGroup: FormGroup;
  receiversGroup: FormGroup;

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
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
          count: this.fb.control(this.defaultSendersCount, [
            Validators.min(2),
            Validators.max(10),
            Validators.required,
          ]),
          array: this.fb.array(
            Array(this.defaultSendersCount)
              .fill(50)
              .map(s =>
                this.fb.control(s, [
                  Validators.min(1),
                  Validators.max(500),
                  Validators.required,
                ]),
              ),
          ),
        }),
        receivers: this.fb.group({
          count: this.fb.control(this.defaultReceiversCount, [
            Validators.min(2),
            Validators.max(10),
            Validators.required,
          ]),
          array: this.fb.array(
            Array(this.defaultReceiversCount)
              .fill(
                (50 * this.defaultSendersCount) / this.defaultReceiversCount,
              )
              .map(s =>
                this.fb.control(s, [
                  Validators.min(1),
                  Validators.max(500),
                  Validators.required,
                ]),
              ),
          ),
        }),
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
