export class TriangleNumber {
  constructor(
    public readonly low: number,
    public readonly mid: number,
    public readonly high: number,
  ) {
    if (low > mid || mid > high) {
      // tslint:disable-next-line:no-console
      // console.trace('Invalid triangle number', low, mid, high);
      // throw new Error('Invalid triangle number');
    }
  }

  get isValid() {
    return this.low <= this.mid && this.mid <= this.high;
  }

  toString() {
    return `(${this.low}, ${this.mid}, ${this.high})`;
  }

  toArray() {
    return [this.low, this.mid, this.high];
  }

  defuzzify() {
    return Math.floor((1 / 3) * this.toArray().reduce((a, b) => a + b, 0));
  }
}
