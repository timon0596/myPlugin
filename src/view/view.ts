import { Slider } from '../slider/slider';
import { Handle } from '../handle/handle';
import { Scale } from '../scale/scale';

export class View {
  private slider = new Slider(this.options.handles);

  private $handles: any;

  private $titles: any;

  Scale = new Scale(this.options.vertical)

  HandleWrappers = this.slider.$handleWrappers;

  constructor(private options: any) {
    this.options.vertical ? this.slider.toVert() : 0;
    this.slider.$slider.append(this.Scale.$scale);
    this.$handles = new Array(this.options.handles)
      .fill(null)
      .map((el) => new Handle());
    this.$titles = this.$handles.map((el:any) => el.$title);
    this.options.$el.append(this.slider.$slider);

    this.slider.$handleWrappers.map((el: any, i: any) => {
      el.append(this.$handles[i].$handle);
    });
    this.Scale.$limits.forEach((el:any, i:number) => {
      el.text(this.options.values[i]);
    });
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
}
