import { Slider } from '../slider/slider';
import { Handle } from '../handle/handle';
import { Scale } from '../scale/scale';

export class View {
  private slider: any;

  private $handles: any;

  Scale = new Scale(this.options);

  constructor(private options: any) {
    this.handlesInit();
    this.sliderInit();
  }

  get handles() {
    return this.$handles.map((el: any) => el.$handle);
  }

  handlesInit() {
    this.$handles = new Array(this.options.handles)
      .fill(null)
      .map((el) => new Handle());
  }

  sliderInit() {
    this.slider = new Slider(this.handles);
    this.slider.$slider.append(this.Scale.$scale);
    this.options.$el.append(this.slider.$slider);
    this.options.vertical ? this.slider.toVert() : 0;
  }

  handlesReinit(val?:number) {
    this.handles.forEach((handle:any) => {
      handle.remove();
    });
    if (val !== undefined) {
      const diff = this.options.handles - val;
      for (let i = diff; i > 0; i--) {
        this.$handles.pop();
      }
    }
    this.slider.appendHandles(this.handles);
  }

  addHandle({ pos, val }: any) {
    this.$handles.push(new Handle());
    const lng = this.$handles.length;
    this.slider.addHandle(this.$handles[lng - 1].$handle);
    const i = lng - 1;
    this.setHandle({ i, pos });
    this.setTitleVal({ i, val });
  }

  sliderRect() {
    return this.slider.$slider[0];
  }

  setHandle({ i, pos }: any) {
    const indent = this.options.vertical ? 'bottom' : 'left';
    const oppositIndent = this.options.vertical ? 'left' : 'bottom';
    this.$handles[i].indent({ indent, pos });
    this.$handles[i].indent({ indent: oppositIndent, pos: 0 });
  }

  setHandles(pos:any) {
    this.handles.forEach((el:any, i:number) => {
      this.setHandle({ pos: pos[i], i });
    });
  }

  setTitleVal({ i, val }: any) {
    this.$handles[i].title(val);
  }

  setScaleTipValue({ pos, val }: any) {
    this.Scale.$tip.show();
    this.Scale.$tip.text(val);
    this.Scale.$tip.css(this.options.vertical ? 'bottom' : 'left', `${pos}px`);
  }

  noTitle() {
    this.$handles.forEach((el: any, i: number) => {
      el.noTitle();
    });
  }

  hideScaleTip() {
    this.Scale.$tip.hide();
  }

  toVert() {
    this.slider.toVert();
    this.Scale.toVert();
    this.Scale.addLimits();
  }

  toHor() {
    this.slider.toHor();
    this.Scale.toHor();
    this.Scale.addLimits();
  }
}
