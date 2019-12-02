import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { TrianglesMatrix, Matrix } from 'src/app/core/models/matrix';
import { TriangleNumber } from 'src/app/core/models/triangle-number';
import { TransportationProblemService } from 'src/app/core/services/transportation-problem.service';
import {
  ChartDataSets,
  ChartData,
  ChartOptions,
  ChartConfiguration,
} from 'chart.js';
import { Shipment } from 'src/app/core/models/shipment';

interface FormulaPart {
  amount: number;
  i: number;
  j: number;
}

@Component({
  selector: 'app-problem-data-display',
  templateUrl: './problem-data-display.component.html',
  styleUrls: ['./problem-data-display.component.scss'],
})
export class ProblemDataDisplayComponent implements OnInit {
  @Input() type: 'default' | 'triangle' = 'triangle';

  @Input() path?: Matrix;

  @Input() costs: Matrix | TrianglesMatrix;

  @Input() originalResult: TriangleNumber;

  @Input() solutionIndexes: { sup: number; sub: number };

  formulaParts: FormulaPart[] = [];

  formulaResult: number | TriangleNumber;

  readonly chartColors = [
    {
      borderColor: '#e67e22',
      backgroundColor: 'rgba(255,255,2555,0.1)',
      showLine: true,
      lineTension: 0,
    },
  ];

  readonly chartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            min: 0,
            max: 1,
          },
        },
      ],
    },
  };

  chartDatasets: ChartDataSets[] = [];

  chartLabels = [];

  constructor(private readonly trService: TransportationProblemService) {}

  ngOnInit() {
    if (this.path) {
      for (let i = 0; i < this.path.length; i++) {
        for (let j = 0; j < this.path[i].length; j++) {
          if (this.path[i][j]) {
            this.formulaParts.push({
              amount: this.path[i][j],
              i,
              j,
            });
          }
        }
      }
      this.formulaResult =
        this.type === 'default'
          ? this.trService.calculateCost(this.path, this.costs as Matrix)
          : this.trService.calculateTriangleCost(
              this.path,
              this.costs as TrianglesMatrix,
            );
    }

    this.setChartData();
  }

  private setChartData() {
    if (this.originalResult) {
      this.chartColors.unshift({
        borderColor: '#3498db',
        backgroundColor: 'rgba(255,255,2555,0.0)',
        showLine: true,
        lineTension: 0,
      });
    }

    if (this.solutionIndexes) {
      this.chartLabels = [
        'Z0',
        `Z${this.solutionIndexes.sup}${this.solutionIndexes.sub}`,
      ];
    }

    if (this.originalResult) {
      this.chartDatasets.push({
        label: 'Z0',
        data: [
          {
            x: this.originalResult.low,
            y: 0,
          },
          {
            x: this.originalResult.mid,
            y: 1,
          },
          {
            x: this.originalResult.high,
            y: 0,
          },
        ],
      });
    }

    const result = this.formulaResult as TriangleNumber;

    this.chartDatasets.push({
      label: this.solutionIndexes
        ? `Z${this.solutionIndexes.sup}-${this.solutionIndexes.sub}`
        : 'F(x)',
      data: [
        {
          x: result.low,
          y: 0,
        },
        {
          x: result.mid,
          y: 1,
        },
        {
          x: result.high,
          y: 0,
        },
      ],
    });
  }
}
