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
			this.model.computeSliderSize(this.view.Slider)
			this.model.computeSingleStep()
			this.model.computeStepSize()
			this.setHandle(this.options.values[0])
		})
		container.append(this.view.Slider)
		$(document).on('mousemove',(e:JQuery.MouseMoveEvent|JQuery.ClickEvent)=>{
			if(this.mousedown){
				this.setHandle(e)
			}
		})
		this.view.Handle.on('mousedown',()=>{
			this.mousedown=true
		})
		$(document).on('mouseup',()=>{
			this.mousedown=false
		})
		this.view.Slider.click((e:JQuery.ClickEvent)=>{
			this.setHandle(e)
		})
	}
	setHandle(e:JQuery.MouseMoveEvent|JQuery.ClickEvent|string|number):void{
			this.model.computeHandlePosition(e,this.view.Slider)
			this.view.setHandlePosition(this.model.handlePos)
			const titleValue = this.model.getTitleValue()
			this.view.setTitleValue(titleValue)
	}
	
}