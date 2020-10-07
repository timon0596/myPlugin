import { Slider } from "../slider/slider";
import { Handle } from "../handle/handle";
import { Scale } from "../scale/scale";

export class View {
  private slider: any;

  private $handles: any;

  HandleWrappers: any;

  Scale = new Scale(this.options);

  constructor(private options: any) {
    this.handlesInit();
    this.sliderInit();
    this.handleWrappersInit();

    

    this.Scale.$limits.forEach((el: any, i: number) => {
      if (typeof this.options.values[0] === "number") {
        el.text(this.options.values[i]);
      } else {
        const lng = this.options.values.length;
        i === 0
          ? el.text(this.options.values[i])
          : el.text(this.options.values[lng - 1]);
      }
    });
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

  handlesReinit(val:number){
    this.handles.forEach((handle:any)=>{
      handle.remove()
    })
    const diff = this.options.handles - val
    for(let i = diff;i>0;i--){
      this.$handles.pop()
    }
    this.slider.appendHandles(this.handles)
    console.log(this.$handles)
  }

  handleWrappersInit() {
    this.HandleWrappers = this.slider.$handleWrappers;
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
    const indent = this.options.vertical?'bottom':'left'
    this.$handles[i].indent({indent,pos})
  }

  setTitleVal({ i, val }: any) {
    this.$handles[i].title(val);
  }

  setScaleTipValue({ pos, val }: any) {
    this.Scale.$tip.show();
    this.Scale.$tip.text(val);
    this.Scale.$tip.css(this.options.vertical ? "bottom" : "left", `${pos}px`);
  }

  noTitle() {
    this.$handles.forEach((el: any, i: number) => {
      el.noTitle();
    });
  }

  hideScaleTip() {
    this.Scale.$tip.hide();
  }
}
