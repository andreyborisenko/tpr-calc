export class TriangleNumber {
  constructor(
    public readonly low: number,
    public readonly mid: number,
    public readonly high: number,
  ) {
    if (low > mid || mid > high) {
      throw new Error('Invalid triangle number');
    }
  }

  toString() {
    return `(${this.low}, ${this.mid}, ${this.high})`;
  }
}
