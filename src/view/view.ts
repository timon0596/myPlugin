class Slider {
  $slider = $("<div>", { class: "slider" });
  $handleWrappers: any;
  constructor(amount: number) {
    this.$handleWrappers = new Array(amount)
      .fill(null)
      .map((el) => $("<div>", { class: "slider__handle-wrapper" }));
    this.init();
  }
  toVert() {
    this.$slider.addClass("slider_vertical");
  }
  toHor() {
    this.$slider.removeClass("slider_vertical");
  }
  init() {
    this.$handleWrappers.map((el: any) => {
      this.$slider.append(el);
    });
  }
}
class Handle {
  $handle = $("<div>", { class: "handle" });
}
export class View {
  private slider = new Slider(this.options.handles);
  private $handles: any;
  constructor(private options: any) {
    this.$handles = new Array(this.options.handles)
      .fill(null)
      .map((el) => new Handle());
    this.options.$el.append(this.slider.$slider);

    this.slider.$handleWrappers.map((el: any, i: any) => {
      el.append(this.$handles[i].$handle);
    });
  }
  setHandle({ i, pos }: any) {}
}
