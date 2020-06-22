import {Model} from './../model/model'
import {View} from './../view/view'
import $ from 'jquery'
export class Controller{
	model:any
	view:any
	currentHandle=0
	mousedown= false
	constructor(public options:any){
		this.init() 
		this.view.handles.forEach((el:any,i:number)=>{
			if(this.options.initialValues[i]){
				this.model.computePosByValue(this.options.initialValues[i],i)
			}
			this.view.setHandle(this.model.handlePos[i],i)
			this.options.range?this.view.setRange(this.model.range()):0
			this.view.setTitle(this.model.computeTitle(i),i)
			el.handle.mousedown(()=>{
				this.currentHandle = i
				this.mousedown = true
			})
		})
		$(document).mouseup(()=>{
			this.mousedown = false
		})
		$(document).mousemove((e)=>{
			this.setHandle(e)
		})
	}

	init(){
		this.model = new Model(this.options)
		this.view = new View(this.options)
		this.options.vertical?this.view.vertical():0
		!this.options.range?this.view.rangeOff:0
		this.optionsValidation()
	}
	getSlidersize(){
		return this.view.slider.slider[0][this.options.vertical?'offsetHeight':'offsetWidth']
	}
	setHandle(e:MouseEvent|JQuery.MouseMoveEvent){
		if(this.mousedown){
			this.model.computePos(e,this.currentHandle,this.view.slider.slider[0])
			this.view.setHandle(this.model.handlePos[this.currentHandle],this.currentHandle)
			this.view.setTitle(this.model.computeTitle(this.currentHandle),this.currentHandle)
			this.options.range?this.view.setRange(this.model.range()):0
			const event:any = $.Event( 'changed-handle-pos' )
			event.handleIndex = this.currentHandle
			$(this.view.slider.slider).trigger(event)
		}
	}
	setHandleByValue(value:string,i:number){
		this.model.computePosByValue(value,i)
		this.view.setHandle(this.model.handlePos[i],i)
		this.view.setTitle(this.model.computeTitle(i),i)
		this.options.range?this.view.setRange(this.model.range()):0
	}
	optionsValidation(){
		this.options.type = typeof this.options.values[0]
		if(typeof this.options.initialValues[0]!=this.options.type){
			this.options.initialValues=[...this.options.values]
		}
		this.options.diapason = this.options.type=='number'?Math.abs(this.options.values[0]-this.options.values[1]):0
		this.options.el.append(this.view.slider.slider)
		this.options.slidersize = this.getSlidersize()
		this.options.singleStep = this.options.type=='string'?
			this.options.slidersize/(this.options.values.length-1):this.options.slidersize/this.options.diapason
		this.options.stepsize = this.options.singleStep*this.options.step 
	}
	vert(){
		this.options.vertical=true
		this.view.vertical()
		this.reinit()
	}
	hor(){
		this.options.vertical=false
		this.view.horizontal()
		this.reinit()
	}
	rng(){
		this.options.range=!this.options.range
		this.options.range?this.view.rangeOn():this.view.rangeOff()
	}
	title(){
		this.options.title=!this.options.title
		this.options.title?this.view.titleOn():this.view.titleOff()
	}
	reinit(){
		this.options.slidersize = this.getSlidersize()
		this.options.singleStep = this.options.type=='string'?
			this.options.slidersize/(this.options.values.length-1):this.options.slidersize/this.options.diapason
		this.options.stepsize = this.options.singleStep*this.options.step
		this.view.handles.forEach((el:any,i:number)=>{
			this.view.setHandle(this.model.handleSteps[i]*this.options.singleStep,i)
			this.view.setTitle(this.model.computeTitle(i),i)
		})
		this.options.range?this.view.setRange(this.model.range()):0
	}

}