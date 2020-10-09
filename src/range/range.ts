export class Range {
  $range = $('<div>', { class: 'range' });

  edge=''

  counterEdge=''

  dimension=''

  counterDimension=''

  constructor(private options:any) {
    this.setDimensions();
  }

  setRange({ start, length }:any) {
    if (this.options.range) {
      this.setDimensions();
      console.log(length);
      this.$range.show();
      this.$range.css(this.edge, `${start}px`);
      this.$range.css(this.counterEdge, `${0}px`);
      this.$range.css(this.dimension, `${length}px`);
      this.$range.css(this.counterDimension, `${100}%`);
    } else {
      this.$range.hide();
    }
  }

  setDimensions() {
    this.edge = this.options.vertical ? 'bottom' : 'left';
    this.counterEdge = this.options.vertical ? 'left' : 'bottom';
    this.dimension = this.options.vertical ? 'height' : 'width';
    this.counterDimension = this.options.vertical ? 'width' : 'height';
    this.options.vertical ? this.$range.addClass('range_vertical') : this.$range.removeClass('range_vertical');
  }
}
