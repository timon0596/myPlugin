(function($){
	$.fn.timonSliderPlugin = function(){

		return this;

	}
}(jQuery))
interface JQuery {
   timonSliderPlugin(options?: any): any
}
class Slider{
	wrapper:any = $('<div>',{class: 'slider__wrapper'})
	element:any = $('<div>',{class: 'slider'})
	axis:any = $('<div>',{class: 'slider__axis'})
	scale:any = $('<div>',{class: 'slider__scale'})
	scaleAxis: any = $('<div>',{class: 'scale__axis'})
	constructor(){
		this.wrapper.append(this.element)
		this.scale.append(this.scaleAxis)
		this.element.append(this.axis).append(this.scale)
	}
	

}
class Handle{
	element:any = $('<div>',{class: 'handle'})
	titleWrapper:any = $('<div>',{class: 'title__wrapper'})
	title:any = $('<div>',{class: 'title'})
	offset:number = 0
	constructor(){
		this.element.append(this.titleWrapper.append(this.title))
	}
	
}

class range{
	range:any = $('<div>',{class: 'range'})
	constructor(){
		return this.range
	}
}
class View{
	slider: any
	handles: Array<any> = []
	range: any
	constructor(public options:any){
		for(let i=0;i<2;i++){
			this.handles.push(new Handle())
		}
		this.slider = new Slider()
		this.options.vertical?this.slider.element.addClass('vertical'):null
		this.range = this.options.range?new range():null
		this.slider.element.append(this.range)
		$(this.handles).each((i,el)=>{
			this.slider.axis.append(el.element)
			this.options.title?null:el.title.css('display','none')
		})
		$(options.el).append(this.slider.wrapper)
	}

	setHandlePosition(id:number){
		this.handles[id].element.css(this.options.vertical?'bottom':'left',this.handles[id].offset+'px')
		
	}

	
	setTitleValue(i:number){
		if(typeof this.options.values[0]=='number'){
			this.handles[i].title.text(Math.round(this.handles[i].offset/this.options.stepsize+this.options.values[0]))
		}else{
			this.handles[i].title.text(this.options.values[this.handles[i].offset/this.options.stepsize])
		}
	}
	
	
}
class Model{
	constructor(public options:any){
	}
	computeHandlePosition(handle:any,e:MouseEvent,slider:any){
		let pos = this.options.vertical?
			slider.offsetTop + slider.offsetHeight - e.clientY - handle.offset :
			e.clientX - slider.offsetLeft - handle.offset
		let pos2 = this.options.vertical?
			slider.offsetTop + slider.offsetHeight - e.clientY :
			e.clientX - slider.offsetLeft
			if(pos2>this.options.slidersize){
				handle.offset = this.options.slidersize
				return
			}
			else if(pos2<0){
				handle.offset = 0
				return
			}
		if(Math.abs(pos)>this.options.stepsize*this.options.step){
				handle.offset+=Math.round(pos/(this.options.stepsize*this.options.step))*this.options.stepsize*this.options.step
				handle.offset = handle.offset>this.options.slidersize?this.options.slidersize:handle.offset<0?0:handle.offset
			}
		
	}
	computeInitPosition(handle:any,i:number){
		if(typeof this.options.initialValues[0]=='number'){
			handle.offset = this.options.initialValues[i]?
				Math.round((this.options.initialValues[i] - this.options.values[0])/Math.abs(this.options.values[0]-this.options.values[1])*
					this.options.slidersize/this.options.stepsize)*
					this.options.stepsize :
				handle.offset
		}else{
			handle.offset = this.options.initialValues[i]?
				this.options.values.indexOf(this.options.initialValues[i])*this.options.stepsize:
				handle.offset
		}

	}
	


}
class Controller{
	options:any = {
		el: '.slider1',
		vertical: true,
		step:4,
		handles:2,
		title:true,
		range:false,
		values: ['1','2','3','4','5'],
		initialValues:['2','4']
	}
	type:string 
	slidersize:number = 0
	stepsize:number = 0
	model:any
	view:any
	mousedown:boolean = false
	currentHandle:number = 0
	constructor(model:any,view:any){
//-------------------------options validation-------------------------		
//-------------------------options validation-------------------------		
//-------------------------options validation-------------------------

		this.type = typeof this.options.values[0]

		if(this.type=='string'){
			this.options.step = this.options.step>(this.options.values.length-1)?
				(this.options.values.length-1):
				this.options.step<1?
					1:this.options.step
		}else{
			let diapason = Math.abs(this.options.values[0]-this.options.values[1])
			this.options.step = this.options.step>diapason?
				diapason:
				this.options.step<1?
					1:this.options.step
		}

		if(this.type!=typeof this.options.initialValues[0]){
			this.options.initialValues=[...this.options.values]
		}

		this.options.initialValues = this.type=='number'?
			this.options.initialValues.map((item:number)=>{
				return item<this.options.values[0]?this.options.values[0]:item>this.options.values[1]?this.options.values[1]:item
			}):
			this.options.initialValues.map((item:string,index:number)=>{
				return this.options.values.indexOf(item)!=-1?item:this.options.values[index]
			})
		console.log(this.options.initialValues)


//-------------------------options validation-------------------------
//-------------------------options validation-------------------------
//-------------------------options validation-------------------------
		this.model = new model(this.options)
		this.view = new view(this.options)
		$(document).ready(()=>{
			this.slidersize = this.view.slider.element[0][this.options.vertical?'clientHeight':'clientWidth']
			this.stepsize = typeof this.options.values[0]=='number'?
								this.slidersize/Math.abs(this.options.values[0]-this.options.values[1]):
								this.slidersize/(this.options.values.length-1)

			$.extend(this.options,{
				slidersize: this.slidersize,
				stepsize: this.stepsize
			})

			$(this.view.handles).each((i,el)=>{
				this.model.computeInitPosition(el,i)
				this.view.setHandlePosition(i)
				this.view.setTitleValue(i)
				el.element.mousedown(()=>{
					this.mousedown = true
					this.currentHandle = i

				})
			})
			
		})

		$(document).mouseup(()=>{
			this.mousedown = false
		})
		$(document).mousemove((e)=>{
			if(this.mousedown){
				this.model.computeHandlePosition(this.view.handles[this.currentHandle],e,this.view.slider.element[0])
				this.view.setHandlePosition(this.currentHandle)
				this.view.setTitleValue(this.currentHandle)
			}
		})

	}
}


new Controller(Model,View)

