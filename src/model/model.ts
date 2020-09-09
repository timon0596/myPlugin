export class Model {
  private sliderSize = 0;
  private singleStep = 0;
  private stepSize = 0;
  private type: string;
  private handlePositions: Array<number>;
  constructor(private options: any) {
    this.type = typeof this.options.values[0];
    this.handlePositions = new Array(this.options.handles).fill(0);
  }
  defineSliderSize(slider: JQuery<HTMLElement>): void {
    this.sliderSize = slider[0].getBoundingClientRect()[
      this.options.vertical ? "height" : "width"
    ];
    console.log(this.sliderSize);
  }
  defineSinglStep(): void {
    this.singleStep =
      this.type === "number"
        ? this.sliderSize / (this.options.values[1] - this.options.values[0])
        : this.sliderSize / (this.options.values.length - 1);
  }
  defineStepSize(): void {
    this.stepSize = this.singleStep * this.options.step;
  }
  handlePosByEvent({ e, i, slider }: any): void {
    const pos = e.pageX - slider[0].offsetLeft;
    const diff = Math.round((pos - this.handlePositions[i]) / this.stepSize);
    this.handlePositions[i] += Math.abs(diff) >= 1 ? diff * this.stepSize : 0;
    this.handlePositions[i] =
      this.handlePositions[i] < 0 ? 0 : this.handlePositions[i];
    this.handlePositions[i] =
      this.handlePositions[i] > this.sliderSize
        ? this.sliderSize
        : this.handlePositions[i];
  }
  handlePosByValue({ i, val }: any): void {
    if (this.type === "number") {
      this.handlePositions[i] =
        val < this.options.values[0]
          ? 0
          : val > this.options.values[1]
          ? this.options.values[1]
          : ((val - this.options.values[0]) /
              (this.options.values[1] - this.options.values[0])) *
            this.sliderSize;
    } else {
      const index = this.options.values.indexOf(val);
      const valIsCorrect = index !== -1;
      this.handlePositions[i] = valIsCorrect ? index * this.stepSize : 0;
    }
  }
  handlePos(i: number): number {
    return this.handlePositions[i];
  }
  handleTitle(i: number): string {
    if (this.type === "number") {
      return (
        Math.round(
          this.handlePositions[i] / this.singleStep + this.options.values[0]
        ) + ""
      );
    } else {
      const index = this.handlePositions[i] / this.singleStep;
      return this.options.values[index] + "";
    }
  }
}
