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
  HandleWrappers = this.slider.$handleWrappers;
  constructor(private options: any) {
    this.options.vertical ? this.slider.toVert() : 0;
    this.$handles = new Array(this.options.handles)
      .fill(null)
      .map((el) => new Handle());
    this.options.$el.append(this.slider.$slider);

    this.slider.$handleWrappers.map((el: any, i: any) => {
      el.append(this.$handles[i].$handle);
    });
  }
  sliderRect() {
    return this.slider.$slider[0].getBoundingClientRect();
  }
  setHandle({ i, pos }: any) {
    console.log(pos)
    this.HandleWrappers[i].css(
      this.options.vertical ? "bottom" : "left",
      pos + "px"
    );
  }
}
