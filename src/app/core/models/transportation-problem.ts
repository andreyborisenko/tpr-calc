export class TransportationProblem {
  senders: number[];
  receivers: number[];

  constructor(
    public readonly sendersCount: number,
    public readonly receiversCount: number,
  ) {}
}
