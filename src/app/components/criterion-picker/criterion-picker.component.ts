import { Component, OnInit } from '@angular/core';
import { CriterionEnum } from 'src/app/core/services/criterion-solvers/crtiterion.enum';
import { criterionNames } from 'src/app/core/services/criterion-solvers/criterion-names';

@Component({
  selector: 'app-criterion-picker',
  templateUrl: './criterion-picker.component.html',
  styleUrls: ['./criterion-picker.component.scss'],
})
export class CriterionPickerComponent implements OnInit {
  selectedCriterion = CriterionEnum.MM;

  criterions = Object.values(CriterionEnum);

  constructor() {}

  ngOnInit() {}

  getCriterionName(criterion: CriterionEnum) {
    return criterionNames[criterion];
  }
}
