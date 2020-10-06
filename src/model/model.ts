export class Model {
  handleSteps:any

  currentHandle = 0;

  sliderRect: any;

  singleStep = 0;

  stepSize = 0;

  mousedown = false;

  positions: any;

  type = 'number';

  private dimension = this.options.vertical ? 'offsetHeight' : 'offsetWidth'

  constructor(private options: any) {
    this.positions = new Array(this.options.handles).fill(0);
    this.handleSteps = new Array(this.options.handles).fill(0);
    this.init();
  }

  init() {
    this.type = typeof this.options.values[0];
  }

  defineSingleStep(sliderRect: any): number {
    if (this.type === 'number') {
      return (
        sliderRect[this.dimension]
        / (this.options.values[1] - this.options.values[0])
      );
    }
    return (
      sliderRect[this.dimension]
        / (this.options.values.length - 1)
    );
  }

  defineStepSize(): number {
    return this.singleStep * this.options.step;
  }

  position({ e, i }: any) {
    let pos = 0;
    if (this.options.vertical) {
      pos = this.sliderRect.offsetTop + this.sliderRect.offsetHeight - e.pageY;
    } else {
      pos = e.pageX - this.sliderRect.offsetLeft;
    }
    if (pos > this.sliderRect[this.dimension]) {
      this.positions[i] = this.sliderRect[this.dimension];
      this.handleSteps[i] = this.positions[i] / this.singleStep;
      return this.positions[i];
    }
    if (pos < 0) {
      this.positions[i] = 0;
      this.handleSteps[i] = this.positions[i] / this.singleStep;
      return this.positions[i];
    }
    const delta = (pos - this.positions[i]) / this.stepSize;
    this.positions[i]
      += Math.abs(delta) > 1 ? Math.round(delta) * this.stepSize : 0;
    this.positions[i] = this.positions[i] > this.sliderRect[this.dimension]
      ? this.sliderRect[this.dimension]
      : this.positions[i] < 0
        ? 0
        : this.positions[i];
    this.handleSteps[i] = this.positions[i] / this.singleStep;
    return this.positions[i];
  }

  computePosition({ e }: any) {
    let pos = 0;
    if (this.options.vertical) {
      pos = this.sliderRect.offsetTop + this.sliderRect.offsetHeight - e.pageY;
    } else {
      pos = e.pageX - this.sliderRect.offsetLeft;
    }
    if (pos > this.sliderRect[this.dimension]) {
      pos = this.sliderRect[this.dimension];
    }
    if (pos < 0) {
      pos = 0;
    }
    const tipPos = pos;
    pos = Math.round(pos / this.singleStep) * this.singleStep;
    let val;
    if (this.type === 'number') {
      val = Math.round(pos / this.singleStep) + this.options.values[0];
    } else {
      val = this.options.values[pos / this.singleStep];
    }
    return { val, pos, tipPos };
  }

  updatePosition({ pos, i }:any) {
    this.positions[i] = pos;
    this.handleSteps[i] = pos / this.singleStep;
  }

  positionByValue({ val, i }:any) {
    if (typeof val === 'string') {
      const index = this.options.values.indexOf(val);
      const pos = index * this.singleStep;
      this.positions[i] = pos;
      return index !== -1 ? pos : 0;
    }
    const pos = (val - this.options.values[0]) * this.singleStep;
    this.positions[i] = pos;
    this.handleSteps[i] = this.positions[i] / this.singleStep;
    return pos;
  }

  getTitleVal(i:number) {
    if (this.type === 'number') {
      return Math.round(this.positions[i] / this.singleStep) + this.options.values[0];
    }
    return this.options.values[Math.round(this.positions[i] / this.singleStep)];
  }
}
