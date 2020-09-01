export class Model{
  private sliderSize=0
  private singleStep=0
  private stepSize=0
  private type:string
  private handlePositions: Array<number>
  constructor(private options:any){
    this.type = typeof this.options.values[0]
    this.handlePositions = new Array(this.options.handles).fill(0)
  }
  defineSliderSize(slider:JQuery<HTMLElement>):void{
    this.sliderSize = slider[0].getBoundingClientRect()[this.options.vertical?'height':'width']
  }
  defineSinglStep():void{
      this.singleStep = this.type==='number'?this.sliderSize/(this.options.values[1]-this.options.values[0]):
      this.sliderSize/this.options.values.length
  }
  defineStepSize():void{
    this.stepSize = this.singleStep*this.options.step
  }
  handlePosByEvent({e,i,slider}:any):void{
    const pos = e.pageX - slider[0].offsetLeft
    const diff = Math.round((pos - this.handlePositions[i])/this.stepSize)
    this.handlePositions[i]+= Math.abs(diff)>=1?diff*this.stepSize:0
    this.handlePositions[i] = this.handlePositions[i]<0?0:this.handlePositions[i]
    this.handlePositions[i] = this.handlePositions[i]>this.sliderSize?this.sliderSize:this.handlePositions[i]
  }
  handlePos(i:number):number{
    return this.handlePositions[i]
  }
}