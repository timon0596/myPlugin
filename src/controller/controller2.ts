let {View} = require('../view/view')
let {Model} = require('../model/model')

export class Controller{
	options:any
	type:string 
	slidersize:number = 0
	stepsize:number = 0
	model:any 
	view:any
	minmax:[number,number] = [0,0]
	mousedown:boolean = false
	currentHandle:number = 0
	constructor(options:any){
		this.options = {...options}

//-------------------------options validation-------------------------		
//-------------------------options validation-------------------------		
//-------------------------options validation-------------------------
		this.options.range = this.options.handles<2?false:this.options.range

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


//-------------------------options validation-------------------------
//-------------------------options validation-------------------------
//-------------------------options validation-------------------------
		this.model = new Model(this.options)
		this.view = new View(this.options)
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
				this.setHandle(i)
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
				this.setHandle(this.currentHandle)
			}
		})

	}
	setRange(){
		this.minmax[0] = Math.min(...this.view.handles.map((el:any)=>el.offset))
		this.minmax[1] = Math.max(...this.view.handles.map((el:any)=>el.offset))
		this.view.setRange(this.minmax)
	}
	setHandle(i:number){
		this.view.setHandlePosition(i)
		this.view.setTitleValue(i)
		this.options.range?this.setRange():null
	}
}




