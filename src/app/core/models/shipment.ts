export class Shipment {
  constructor(
    public readonly sender: number,
    public readonly receiver: number,
    public readonly cost: number,
    public readonly quantity: number
  ) {}
}
