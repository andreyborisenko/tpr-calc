export class TransportationProblem {
  shipments: number[][];

  constructor(
    public readonly senders: number[],
    public readonly receivers: number[],
    public readonly costsMatrix: number[][],
  ) {}
}
