export class Scale {
  $scale = $('<div>', { class: 'scale' });

  $delimiters = $('<div>', { class: 'scale__delimiters-wrapper' });

  $tip = $('<div>', { class: 'scale__tip' });

  $limitsWrapper = $('<div>', { class: 'scale__limit-wrapper' });

  $limits:any

  constructor(vertical:boolean) {
    this.init(vertical);
  }

  init(vertical:boolean) {
    vertical ? this.$scale.addClass('scale_vertical') : null;

    this.$scale.append(this.$limitsWrapper);
    this.$scale.append(this.$delimiters);
    new Array(2).fill(0).forEach(() => { this.$limitsWrapper.append($('<div>', { class: 'scale__limit' })); });
    this.$limits = Array.from(this.$limitsWrapper.find('.scale__limit')).map((el:any) => $(el));
    this.$limits = vertical ? this.$limits.reverse() : this.$limits;
    new Array(20).fill(0).forEach(() => {
      this.$delimiters.append($('<div>', { class: 'scale__delimiter' }));
    });
  }
}
