import { Model } from "./../model/model";
import { View } from "./../view/view";
export class Controller {
  private model = new Model(this.options);
  private view = new View(this.options);
  private currentHandle = 0;
  private mousedown = false;
  constructor(private options: any) {
    $(document).ready(() => {
      this.init();
    });
  }
  init(): void {
    this.model.defineSliderSize(this.view.$slider);
    this.model.defineSinglStep();
    this.model.defineStepSize();
    this.setEventHandlers();
  }
  setEventHandlers(): void {
    this.view.$handles.forEach((el, i) => {
      el.on("mousedown", this.onMousedown.bind(this));
    });
    $(document).on("mousemove", this.onMousemove.bind(this));
    $(document).on("mouseup", this.onMouseup.bind(this));
  }
  onMousedown(e: any): void {
    this.mousedown = true;
    this.currentHandle = this.view.$handles
      .map((el) => el[0])
      .indexOf(e.target);
  }
  onMousemove(e: any): void {
    if (this.mousedown) {
      this.model.handlePosByEvent({
        e,
        i: this.currentHandle,
        slider: this.view.$slider,
      });
      this.view.setHandle({
        i: this.currentHandle,
        pos: this.model.handlePos(this.currentHandle),
      });
      this.view.setTitle({
        i: this.currentHandle,
        val: this.model.handleTitle(this.currentHandle),
      });
    }
  }
  onMouseup() {
    this.mousedown = false;
  }
}
