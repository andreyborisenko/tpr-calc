import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatrixInputComponent } from './components/matrix-input/matrix-input.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatInputModule,
  MatButtonModule,
  MatCheckboxModule,
  MatAutocompleteModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatRadioModule,
  MatSelectModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatMenuModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatGridListModule,
  MatCardModule,
  MatStepperModule,
  MatTabsModule,
  MatExpansionModule,
  MatButtonToggleModule,
  MatChipsModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatDialogModule,
  MatTooltipModule,
  MatSnackBarModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InitialDataComponent } from './components/initial-data/initial-data.component';
import { SendersReceiversComponent } from './components/senders-receivers/senders-receivers.component';
import { ProblemDataDisplayComponent } from './components/problem-data-display/problem-data-display.component';
import { ProblemTableComponent } from './components/problem-table/problem-table.component';
import { ChartsModule } from 'ng2-charts';
import { CriterionComponent } from './components/criterion/criterion.component';
import { CycleSolverComponent } from './components/cycle-solver/cycle-solver.component';
import { CriterionPickerComponent } from './components/criterion-picker/criterion-picker.component';
import { SteppingStoneComponent } from './components/stepping-stone/stepping-stone.component';
import { SteppingStoneSolverComponent } from './components/stepping-stone-solver/stepping-stone-solver.component';

const matModules = [
  MatCheckboxModule,
  MatButtonModule,
  MatInputModule,
  MatAutocompleteModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatRadioModule,
  MatSelectModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatMenuModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatGridListModule,
  MatCardModule,
  MatStepperModule,
  MatTabsModule,
  MatExpansionModule,
  MatButtonToggleModule,
  MatChipsModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatDialogModule,
  MatTooltipModule,
  MatSnackBarModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
];

@NgModule({
  declarations: [
    AppComponent,
    MatrixInputComponent,
    InitialDataComponent,
    SendersReceiversComponent,
    ProblemDataDisplayComponent,
    ProblemTableComponent,
    CriterionComponent,
    CycleSolverComponent,
    CriterionPickerComponent,
    SteppingStoneComponent,
    SteppingStoneSolverComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    ...matModules,
  ],
  entryComponents: [
    ProblemDataDisplayComponent,
    CycleSolverComponent,
    CriterionPickerComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
