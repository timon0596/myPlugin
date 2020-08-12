export class Model{
	private singleStep=0
	private stepSize=0
	private handlePosition=0
	private sliderSize = 0
	private type: string
	private el:any = {}
	constructor(private options:any){
		this.type = typeof this.options.values[0]
	}
	get handlePos(){
		return this.handlePosition
	}
	computeSliderSize(slider:JQuery<HTMLElement>):void{
		this.sliderSize = slider[0].getBoundingClientRect()[this.options.vertical?'height':'width']
		console.log(slider[0].getBoundingClientRect().width)
	}
	computeSingleStep():void{
		if(this.type=='string'){
			this.singleStep = this.sliderSize/(this.options.values.length-1)
		}
		else{
			this.singleStep =  this.sliderSize/(this.options.values[1]-this.options.values[0])
		}
	}
	computeStepSize(){
		this.stepSize = this.singleStep*this.options.step
	}
	computeHandlePosition(e:JQuery.MouseMoveEvent|JQuery.ClickEvent,slider:JQuery<HTMLElement>):void{
		if(this.options.vertical){
			this.handlePosition = 0
		}
		else{

			const mousePosition =  e.pageX-slider[0].offsetLeft
			const handleSteps = Math.round((mousePosition - this.handlePosition)/(e.type=='click'?this.singleStep:this.stepSize))
			this.handlePosition+= handleSteps*(e.type=='click'?this.singleStep:this.stepSize)
			this.handlePosition = this.handlePosition<0?0:this.handlePosition
			this.handlePosition = this.handlePosition>this.sliderSize?this.sliderSize:this.handlePosition
		}
	}
}