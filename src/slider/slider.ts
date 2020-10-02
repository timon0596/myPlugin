export class Slider {
  $slider = $('<div>', { class: 'slider' });

  $handleWrappers: any;

  constructor(amount: number) {
    this.$handleWrappers = new Array(amount)
      .fill(null)
      .map((el) => $('<div>', { class: 'slider__handle-wrapper' }));
    this.init();
  }

  toVert() {
    this.$slider.addClass('slider_vertical');
  }

  toHor() {
    this.$slider.removeClass('slider_vertical');
  }

  init() {
    this.$handleWrappers.map((el: any) => {
      this.$slider.append(el);
    });
  }
}
