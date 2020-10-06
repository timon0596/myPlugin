export class Slider {
  $slider = $('<div>', { class: 'slider' });

  $handleWrappers= <any>[];

  constructor(handles:any) {
    handles.forEach((handle:any, i:number) => {
      this.addHandle(handle.$handle);
    });
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

  addHandle(handle:any) {
    this.$handleWrappers.push($('<div>', { class: 'slider__handle-wrapper' }));
    const lng = this.$handleWrappers.length;
    this.$handleWrappers[lng - 1].append(handle);
    this.$slider.append(this.$handleWrappers[lng - 1]);
  }

  removeHandle(i:number) {
    this.$handleWrappers.splice(i, 1);
  }
}
