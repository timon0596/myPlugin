import { Slider } from '../slider/slider';
import { Handle } from '../handle/handle';
import { Scale } from '../scale/scale';

export class View {
  private slider:any

  private $handles: any;

  private $titles: any;

  HandleWrappers:any

  Scale = new Scale(this.options)

  constructor(private options: any) {
    this.handlesInit();
    this.titlesIint();
    this.sliderInit();
    this.handleWrappersInit();

    this.options.$el.append(this.slider.$slider);

    this.Scale.$limits.forEach((el:any, i:number) => {
      if (typeof this.options.values[0] === 'number') {
        el.text(this.options.values[i]);
      } else {
        const lng = this.options.values.length;
        i === 0 ? el.text(this.options.values[i]) : el.text(this.options.values[lng - 1]);
      }
    });
  }

  handlesInit() {
    this.$handles = new Array(this.options.handles)
      .fill(null)
      .map((el) => new Handle());
  }

  sliderInit() {
    this.slider = new Slider(this.$handles);
    this.slider.$slider.append(this.Scale.$scale);
    this.options.vertical ? this.slider.toVert() : 0;
  }

  titlesIint() {
    this.$titles = this.$handles.map((el:any) => el.$title);
  }

  handleWrappersInit() {
    this.HandleWrappers = this.slider.$handleWrappers;
  }

  addHandle({ pos, val }:any) {
    this.$handles.push(new Handle());
    const lng = this.$handles.length;
    this.$titles.push(this.$handles[lng - 1].$title);
    this.slider.addHandle(this.$handles[lng - 1].$handle);
    const i = lng - 1;
    this.setHandle({ i, pos });
    this.setTitleVal({ i, val });
  }

  sliderRect() {
    return this.slider.$slider[0];
  }

  setHandle({ i, pos }: any) {
    this.HandleWrappers[i].css(
      this.options.vertical ? 'bottom' : 'left',
      `${pos}px`,
    );
  }

  setTitleVal({ i, val }:any) {
    this.$titles[i].text(val);
  }

  setScaleTipValue({ pos, val }:any) {
    this.Scale.$tip.show();
    this.Scale.$tip.text(val);
    this.Scale.$tip.css(this.options.vertical ? 'bottom' : 'left', `${pos}px`);
  }

  noTitle() {
    this.$handles.forEach((el:any, i:number) => {
      el.noTitle();
    });
  }

  hideScaleTip() {
    this.Scale.$tip.hide();
  }
}
