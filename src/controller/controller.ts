import { Model } from '../model/model';
import { View } from '../view/view';

export class Controller {
  private view = new View(this.options);

  private model = new Model(this.options);

  constructor(private options: any) {
    this.init();
  }

  init():void {
    this.binding();
    this.view.HandleWrappers.forEach((el: any, i: any) => {
      el.mousedown(this.handle$handleWrappersMousedown.bind(this, i));
    });
    this.model.sliderRect = this.setSliderBoundingRect();
    this.model.singleStep = this.model.defineSingleStep(this.model.sliderRect);
    this.model.stepSize = this.model.defineStepSize();
    $(window).mousemove(this.handleWindowMousemove);
    this.scaleEventHandling();
    $(window).mouseup(this.handleWindowMouseup);
    this.optionsFilter();
    this.initPositions();
  }

  scaleEventHandling():void {
    $(this.view.Scale.$scale).mousemove(this.handleScaleMousemove);
    $(this.view.Scale.$scale).mouseleave(this.handleScaleMouseleave);
    $(this.view.Scale.$scale).click(this.handleScaleClick);
  }

  handleScaleClick(e:any):void {
    const { val, pos, tipPos } = this.model.computePosition({ e });
    const i = this.model.currentHandle;
    this.model.updatePosition({ pos, i });
    this.view.setHandle({ i, pos });
    this.setTitleVal(i);
  }

  handleScaleMouseleave(e:any) :void{
    this.view.hideScaleTip();
  }

  handleScaleMousemove(e:any):void {
    const { val, pos, tipPos } = this.model.computePosition({ e });
    this.view.setScaleTipValue({ val, pos: tipPos });
  }

  binding():void {
    this.handle$handleWrappersMousedown = this.handle$handleWrappersMousedown.bind(this);
    this.handleWindowMousemove = this.handleWindowMousemove.bind(this);
    this.handleScaleMousemove = this.handleScaleMousemove.bind(this);
    this.handleScaleMouseleave = this.handleScaleMouseleave.bind(this);
    this.handleScaleClick = this.handleScaleClick.bind(this);
    this.handleWindowMouseup = this.handleWindowMouseup.bind(this);
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

  initPositions() :void{
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

  handleWindowMousemove(e: any) :void{
    if (this.model.mousedown) {
      this.setHandle(e);
    }
  }

  handle$handleWrappersMousedown(i: number, e: any) :void{
    this.model.currentHandle = i;
    this.model.mousedown = true;
  }

  handleWindowMouseup() :void{
    this.model.mousedown = false;
  }

  setHandle(e: any) :void{
    const i = this.model.currentHandle;
    const pos = this.model.position({ e, i });
    this.view.setHandle({ i, pos });
    this.setTitleVal(i);
  }

  setHandleWithVal({ val, i }:any) :void{
    const pos = this.model.positionByValue({ val, i });
    this.view.setHandle({ i, pos });
    this.setTitleVal(i);
  }

  setTitleVal(i:number) :void{
    const val = this.model.getTitleVal(i);

    this.view.setTitleVal({ i, val });
  }
}
