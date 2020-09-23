import { Model } from "./../model/model";
import { View } from "./../view/view";
export class Controller {
  private view = new View(this.options);
  private model = new Model(this.options);
  constructor(private options: any) {}
  onMousemove() {}
  onMousedown() {}
  onMouseup() {}
  setHandle(e: any) {
    const i = this.model.currentHandle;
    const pos = this.model.position({ e });
    this.view.setHandle({ i, pos });
  }
}
