export class Scale {
  $scale = $('<div>', { class: 'scale' });

  $delimiters = $('<div>', { class: 'scale__delimiters-wrapper' });

  $tip = $('<div>', { class: 'scale__tip' });

  $limitsWrapper = $('<div>', { class: 'scale__limit-wrapper' });

  $limits:any

  constructor(private options:any) {
    this.init(this.options);
  }

  init({ vertical }:any) {
    vertical ? this.$scale.addClass('scale_vertical') : null;
    this.$scale.append(this.$limitsWrapper);
    this.$scale.append(this.$delimiters);
    this.$scale.append(this.$tip);
    new Array(2).fill(0).forEach(() => { this.$limitsWrapper.append($('<div>', { class: 'scale__limit' })); });
    this.$limits = Array.from(this.$limitsWrapper.find('.scale__limit')).map((el:any) => $(el));
    this.$limits = vertical ? this.$limits.reverse() : this.$limits;
    this.addDelimiters();
  }

  addDelimiters() {
    let num;
    if (typeof this.options.values[0] === 'number') {
      num = 20;
    } else {
      num = this.options.values.length;
    }
    new Array(num).fill(0).forEach(() => {
      this.$delimiters.append($('<div>', { class: 'scale__delimiter' }));
    });
  }

  toVert() {
    this.$scale.addClass('scale_vertical');
  }

  toHor() {
    this.$scale.removeClass('scale_vertical');
  }
}
