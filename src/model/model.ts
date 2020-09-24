export class Model {
  currentHandle = 0;
  sliderRect: any;
  singleStep = 0;
  stepSize = 0;
  mousedown = false;
  positions: any;
  type = "number";
  constructor(private options: any) {
    this.positions = new Array(this.options.handles).fill(0);
    this.init();
  }
  init() {
    this.type = typeof this.options.values[0];
  }

  defineSingleStep(sliderRect: any): number {
    if (this.type === "number") {
      return (
        sliderRect[this.options.vertical ? "height" : "width"] /
        (this.options.values[1] - this.options.values[0])
      );
    } else {
      return (
        sliderRect[this.options.vertical ? "height" : "width"] /
        (this.options.values.length - 1)
      );
    }
  }

  defineStepSize(): number {
    return this.singleStep * this.options.step;
  }

  position({ e, i }: any) {
    let pos = 0;
    if (this.options.vertical) {
    } else {
      pos = e.pageX - this.sliderRect.left;
    }

    const delta = (pos - this.positions[i]) / this.stepSize;
    this.positions[i] +=
      Math.abs(delta) > 1 ? Math.round(delta) * this.stepSize : 0;
    this.positions[i] =
      this.positions[i] > this.sliderRect.width
        ? this.sliderRect.width
        : this.positions[i] < 0
        ? 0
        : this.positions[i];
    return this.positions[i];
  }
}
