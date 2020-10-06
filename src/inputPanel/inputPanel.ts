export class InputPanel {
  $main = $('<div>', { class: 'inputPanel' })

  $step = $('<input>', { type: 'number', class: 'inputPanel__step' })

  $handles = $('<input>', { type: 'number', class: 'inputPanel__handles' })

  $orientation = $('<input>', { type: 'checkbox', class: 'inputPanel__orientation' })

  $title = $('<input>', { type: 'checkbox', class: 'inputPanel__title' })

  constructor(private options:any) {
    Object.values(this).slice(1).forEach((el:any, i:number) => {
      this.$main.append(el);
    });
    this.binding();
    this.initValues();
    this.emitEvents();
  }

  initValues() {
    this.$step.val(this.options.step);
    this.$handles.val(this.options.handles);
    this.$orientation.attr('checked', this.options.vertical);
    this.$title.attr('checked', this.options.title);
  }

  binding() {
    this.handleStepChange = this.handleStepChange.bind(this);
    this.handleHandlesChange = this.handleHandlesChange.bind(this);
  }

  emitEvents() {
    this.$step.change(this.handleStepChange);
    this.$handles.change(this.handleHandlesChange);
  }

  handleHandlesChange() {
    const e:any = $.Event('handles-change');
    e.val = this.$handles.val();
    $(this).trigger(e);
  }

  handleStepChange() {
    const e:any = $.Event('step-change');
    e.val = this.$step.val();
    $(this).trigger(e);
  }
}
