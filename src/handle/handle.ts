export class Handle {
  $handle = $('<div>', { class: 'handle' });

  $title = $('<div>', { class: 'handle__title' })

  constructor() {
    this.init();
  }

  init() {
    this.$handle.append(this.$title);
  }

  hideTitle() {
    this.$title.hide();
  }
}
