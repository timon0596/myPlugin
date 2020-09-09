class Handle {
  $handle = $("<div>", { class: "handle" });
  $title = $("<div>", { class: "handle__title" });
  constructor() {
    this.init();
  }
  init(): void {
    this.$handle.append(this.$title);
  }
}
class Slider {
  $slider = $("<div>", { class: "slider" });
}
export class View {
  private handles: Array<Handle>;
  private slider: Slider;
  constructor(private options: any) {
    this.handles = new Array(this.options.handles).fill(null).map((el, i) => {
      return new Handle();
    });
    this.slider = new Slider();
    this.init();
  }
  init(): void {
    console.log(this.handles);
    this.handles.forEach((el) => {
      console.log(el.$handle);
      this.slider.$slider.append(el.$handle);
    });
    this.options.$el.append(this.slider.$slider);
  }
  get $slider(): JQuery<HTMLElement> {
    return this.slider.$slider;
  }
  get $handles(): JQuery<HTMLElement>[] {
    return this.handles.map((el) => el.$handle);
  }
  setHandle({ i, pos }: any): void {
    if (pos) {
      this.handles[i].$handle.css(
        this.options.vertical ? "bottom" : "left",
        pos + "px"
      );
    } else {
      this.handles[i].$handle.css(
        this.options.vertical ? "bottom" : "left",
        0 + "px"
      );
    }
  }
  setTitle({ i, val }: any): void {
    this.handles[i].$title.text(val);
  }
}
