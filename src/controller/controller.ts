import { Model } from "./../model/model";
import { View } from "./../view/view";
export class Controller {
  private view = new View(this.options);
  private model = new Model(this.options);
  constructor(private options: any) {
    this.init();
  }
  init() {
    this.view.HandleWrappers.forEach((el: any, i: any) => {
      el.mousedown(this.handle$handleWrappersMousedown.bind(this, i));
    });
    this.model.sliderRect = this.setSliderBoundingRect();
    this.model.singleStep = this.model.defineSingleStep(this.model.sliderRect);
    this.model.stepSize = this.model.defineStepSize();
    $(window).mousemove(this.handleWindowMousemove.bind(this));
    $(window).mouseup(this.handleWindowMouseup.bind(this));
  }
  setSliderBoundingRect() {
    return this.view.sliderRect();
  }
  handleWindowMousemove(e: any) {
    if (this.model.mousedown) {
      this.setHandle(e);
    }
  }

  handle$handleWrappersMousedown(i: number, e: any) {
    this.model.currentHandle = i;
    this.model.mousedown = true;
  }

  handleWindowMouseup() {
    this.model.mousedown = false;
  }

  setHandle(e: any) {
    const i = this.model.currentHandle;
    const pos = this.model.position({ e, i });
    this.view.setHandle({ i, pos });
  }
}
