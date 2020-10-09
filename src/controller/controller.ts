import { Model } from '../model/model';
import { View } from '../view/view';
import { InputPanel } from '../inputPanel/inputPanel';

export class Controller {
  private view = new View(this.options);

  private model = new Model(this.options);

  private panel = new InputPanel(this.options);

  constructor(private options: any) {
    this.init();
  }

  noTitle() {
    this.view.noTitle();
  }

  init(): void {
    this.binding();
    this.options.$el.append(this.panel.$main);

    $(this.panel).on('step-change', this.handlePanelStepChange);
    $(this.panel).on('handles-change', this.handlePanelHandlesChange);
    $(this.panel).on('orientation-change', this.handlePanelOrientationChange);

    this.model.sliderRect = this.setSliderBoundingRect();
    this.model.singleStep = this.model.defineSingleStep(this.model.sliderRect);
    this.model.stepSize = this.model.defineStepSize();

    this.setHandlesEventHandler();

    $(window).mousemove(this.handleWindowMousemove);
    $(window).mouseup(this.handleWindowMouseup);

    this.scaleEventHandling();
    this.optionsFilter();
    this.initPositions();
  }

  binding(): void {
    this.handleHandleMousedown = this.handleHandleMousedown.bind(this);
    this.handleWindowMousemove = this.handleWindowMousemove.bind(this);
    this.handleScaleMousemove = this.handleScaleMousemove.bind(this);
    this.handleScaleMouseleave = this.handleScaleMouseleave.bind(this);
    this.handleScaleClick = this.handleScaleClick.bind(this);
    this.handleWindowMouseup = this.handleWindowMouseup.bind(this);
    this.handlePanelStepChange = this.handlePanelStepChange.bind(this);
    this.handlePanelHandlesChange = this.handlePanelHandlesChange.bind(this);
    this.handlePanelOrientationChange = this.handlePanelOrientationChange.bind(this);
  }

  setHandlesEventHandler() {
    this.view.handles.forEach((el: any, i: number) => {
      el.mousedown(this.handleHandleMousedown.bind(this, i));
    });
  }

  handlePanelOrientationChange() {
    this.options.vertical ? this.view.toVert() : this.view.toHor();
    this.view.handlesReinit();
    this.setHandlesEventHandler();
    this.model.sliderRect = this.setSliderBoundingRect();
    this.model.singleStep = this.model.defineSingleStep(this.model.sliderRect);
    this.model.stepSize = this.model.defineStepSize();
    this.model.positions = this.model.positions.map((el:number, i:number) => this.model.handleSteps[i] * this.model.singleStep);
    this.view.setHandles(this.model.positions);
    this.render();
  }

  handlePanelHandlesChange(e: any):void {
    if (this.options.handles < e.val) {
      this.options.handles = e.val;
      this.model.positions.push(0);
      this.model.handleSteps.push(0);
      const i = this.model.positions.length;
      const val = this.model.getTitleVal(i - 1);
      this.view.addHandle({ i, val });
      this.setHandlesEventHandler();
    } else {
      const val = e.val < 1 ? 1 : e.val;
      this.view.handlesReinit(val);
      this.options.handles = val;
      this.model.positions = this.model.positions.slice(0, this.options.handles);
      this.model.handleSteps = this.model.handleSteps.slice(0, this.options.handles);
      this.setHandlesEventHandler();
      this.model.positions.forEach((pos:number, i:number) => {
        this.view.setHandle({ pos, i });
        const value = this.model.getTitleVal(i);
        this.view.setTitleVal({ val: value, i });
      });
    }
    this.render();
  }

  handlePanelStepChange(e: any) {
    this.options.step = +e.val;
    this.model.stepSize = this.model.defineStepSize();
  }

  scaleEventHandling(): void {
    $(this.view.Scale.$scale).mousemove(this.handleScaleMousemove);
    $(this.view.Scale.$scale).mouseleave(this.handleScaleMouseleave);
    $(this.view.Scale.$scale).click(this.handleScaleClick);
  }

  handleScaleClick(e: any): void {
    const { val, pos, tipPos } = this.model.computePosition({ e });
    const i = this.model.currentHandle;
    this.model.updatePosition({ pos, i });
    this.view.setHandle({ i, pos });
    this.setTitleVal(i);
    this.render();
  }

  handleScaleMouseleave(e: any): void {
    this.view.hideScaleTip();
  }

  handleScaleMousemove(e: any): void {
    const { val, pos, tipPos } = this.model.computePosition({ e });
    this.view.setScaleTipValue({ val, pos: tipPos });
  }

  optionsFilterCondition(el: any) {
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
      .map((el: any, i: number) => {
        if (this.optionsFilterCondition(el)) {
          return el;
        }
        return this.options.values[i];
      });
  }

  initPositions(): void {
    this.view.handles.map((el: any, i: number) => {
      const val = this.options.initialValues[i];
      if (val !== undefined) {
        this.setHandleWithVal({ val, i });
      }
    });
  }

  setSliderBoundingRect() {
    return this.view.sliderRect();
  }

  handleWindowMousemove(e: any): void {
    if (this.model.mousedown) {
      this.setHandle(e);
    }
  }

  handleHandleMousedown(i: number, e: any): void {
    this.model.currentHandle = i;
    this.model.mousedown = true;
  }

  handleWindowMouseup(): void {
    this.model.mousedown = false;
  }

  setHandle(e: any): void {
    const i = this.model.currentHandle;
    const pos = this.model.position({ e, i });
    this.view.setHandle({ i, pos });
    this.setTitleVal(i);
    this.render();
  }

  setHandleWithVal({ val, i }: any): void {
    const pos = this.model.positionByValue({ val, i });
    this.view.setHandle({ i, pos });
    this.setTitleVal(i);
    this.render();
  }

  setTitleVal(i: number): void {
    const val = this.model.getTitleVal(i);

    this.view.setTitleVal({ i, val });
  }

  render():void {
    this.view.setRange(this.model.getRange());
  }
}
