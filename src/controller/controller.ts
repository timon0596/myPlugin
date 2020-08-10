import {Model} from './../model/model'
import {View} from './../view/view'
import $ from 'jquery'
export class Controller{
	model: any = new Model(this.options)
	view: any = new View(this.options)
	private mousedown:boolean=false
	constructor(private options:any){

	}
	init(container: JQuery):void{
		$(document).ready(()=>{
			this.model.computeSliderSize(this.view.getSlider()[0])
			this.model.computeSingleStep()
			this.model.computeStepSize()
		})
		container.append(this.view.getSlider())
		$(document).on('mousemove.sliderHandleMove',(e)=>{
			if(this.mousedown){
				this.model.computeHandlePosition(e,this.view.getSlider()[0])
				this.view.setHandlePosition(this.model.handlePos)
			}
		})
		this.view.getHandle().on('mousedown',()=>{
			this.mousedown=true
		})
		$(document).on('mouseup',()=>{
			this.mousedown=false
		})
	}

}