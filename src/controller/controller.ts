import { Model } from '../model/model';
import { View } from '../view/view';

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
    $(this.view.Scale.$scale).mousemove(this.handleScaleMousemove.bind(this));
    $(this.view.Scale.$scale).mouseleave(this.handleScaleMouseleave.bind(this));
    $(window).mouseup(this.handleWindowMouseup.bind(this));
    this.optionsFilter();
    this.initPositions();
  }

  handleScaleMouseleave(e:any) {
    this.view.hideScaleTip();
  }

  handleScaleMousemove(e:any) {
    const { val, pos } = this.model.computePosition({ e });
    this.view.setScaleTipValue({ val, pos });
  }

  optionsFilterCondition(el:any) {
    if (this.model.type === 'number') {
      const condition1 = el >= this.options.values[0];
      const condition2 = el <= this.options.values[1];
      return condition1 && condition2;
    }
    return this.options.values.indexOf(el) !== -1;
  }

  optionsFilter() {
    this.options.initialValues = this.options.initialValues
      .slice(0, this.options.handles)
      .map((el:any, i:number) => {
        if (this.optionsFilterCondition(el)) {
          return el;
        }
        return this.options.values[i];
      });
  }

  initPositions() {
    this.view.HandleWrappers.map((el:any, i:number) => {
      const val = this.options.initialValues[i];
      if (val !== undefined) {
        this.setHandleWithVal({ val, i });
      }
    });
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
    this.setTitleVal(i);
  }

  setHandleWithVal({ val, i }:any) {
    const pos = this.model.positionByValue({ val, i });
    this.view.setHandle({ i, pos });
    this.setTitleVal(i);
  }

  setTitleVal(i:number) {
    const val = this.model.getTitleVal(i);

    this.view.setTitleVal({ i, val });
  }
}
