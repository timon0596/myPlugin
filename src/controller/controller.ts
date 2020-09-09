import { Model } from "./../model/model";
import { View } from "./../view/view";
export class Controller {
  private model: any;
  private view: any;
  private currentHandle = 0;
  private mousedown = false;
  constructor(private options: any) {
    this.view = new View(this.options);
    this.model = new Model(this.options);
    setTimeout(() => {
      this.init();
    }, 2000);
  }
  init(): void {
    this.model.defineSliderSize(this.view.$slider);
    this.model.defineSinglStep();
    this.model.defineStepSize();
    this.setEventHandlers();
    this.setHandles();
  }
  setEventHandlers(): void {
    this.view.$handles.forEach((el: JQuery<HTMLElement>, i: number) => {
      el.on("mousedown", this.onMousedown.bind(this));
    });
    $(document).on("mousemove", this.onMousemove.bind(this));
    $(document).on("mouseup", this.onMouseup.bind(this));
  }
  onMousedown(e: any): void {
    this.mousedown = true;
    this.currentHandle = this.view.$handles
      .map((el: JQuery<HTMLElement>) => el[0])
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
  setHandles() {
    this.view.$handles.forEach((el: JQuery<HTMLElement>, i: number) => {
      this.model.handlePosByValue({ i, val: this.options.initialValues[i] });
      this.view.setHandle({ i, pos: this.model.handlePos(i) });
      this.view.setTitle({ i, val: this.model.handleTitle(i) });
    });
  }
}
