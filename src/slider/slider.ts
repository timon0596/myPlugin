export class Slider {
  $slider = $('<div>', { class: 'slider' });

  constructor(handles: any) {
    this.appendHandles(handles);
  }

  toVert() {
    this.$slider.addClass('slider_vertical');
  }

  toHor() {
    this.$slider.removeClass('slider_vertical');
  }

  appendHandles(handles: any) {
    handles.forEach((el: any) => {
      this.addHandle(el);
    });
  }

  addHandle(handle: any) {
    this.$slider.append(handle);
  }
}
