export class Handle {
  $handle = $("<div>", { class: "handle" });

  $title = $("<div>", { class: "handle__title" });

  constructor() {
    this.init();
  }

  init() {
    this.$handle.append(this.$title);
  }

  noTitle() {
    this.$title.hide();
  }

  indent({ indent, pos }: any) {
    this.$handle.css(indent, pos + "px");
  }

  title(val: any) {
    this.$title.text(val);
  }
}
