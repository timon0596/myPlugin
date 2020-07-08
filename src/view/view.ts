
import $ from 'jquery'
class Handle{
	handle = $('<div>',{class: 'handle'})
	title = $('<div>',{class: 'title'})
	constructor(){
		this.init()
	}
	init(){
		this.handle.append(this.title)
	}
}
class Slider{
	slider = $('<div>',{class: 'slider'})
	axis = $('<div>',{class: 'axis'})
	scale = $('<div>',{class: 'scale'})
	range = $('<div>',{class: 'range'})
	
	constructor(){
		this.init()
	}
	init(){
		this.axis.append(this.range)
		this.slider.append(this.axis).append(this.scale)		
	}
}
export class View{
	handles:Handle[]=[]
	slider:Slider = new Slider()
	constructor(public options:initOptions){
		for(let i=0;i<this.options.handles;i++){
			this.handles.push(new Handle())
		}
		this.init()
	}
	init():void{
		this.handles.forEach((el)=>{
			this.slider.axis.append(el.handle)
		})
	}
	vertical():void{
		this.slider.slider.addClass('vertical')
	}
	horizontal():void{
		this.slider.slider.removeClass('vertical')
	}
	titleOff():void{
		this.handles.forEach((el)=>{
			el.title.hide()
		})
	}
	titleOn():void{
		this.handles.forEach((el)=>{
			el.title.show()
		})
	}
	rangeOn():void{
		this.slider.range.show()
	}
	rangeOff():void{
		this.slider.range.hide()
	}
	setRange({start,lngt}:range):void{
		this.slider.range.css(this.options.vertical?'bottom':'left',start+'px')	
		this.slider.range.css(this.options.vertical?'left':'bottom',0+'px')	
		this.slider.range.css(this.options.vertical?'height':'width',lngt+'px')
		this.slider.range.css(this.options.vertical?'width':'height',20+'px')
	}
	setHandle(pos:number,i:number):void{
		this.handles[i].handle.css(this.options.vertical?'bottom':'left',pos+'px')
		this.handles[i].handle.css(this.options.vertical?'left':'bottom',0)
	}
	setTitle(value:string|number,i:number):void{
		this.handles[i].title.text(value)
	}
	scaleValuesInit():void{
		this.options.values.forEach((el:any,i:number)=>{
			const pos:any = this.options.type=='string'?this.options.singleStep*i:this.options.slidersize*i
			const $p:JQuery<HTMLElement> = $('<p>')
			$p.css(this.options.vertical?'bottom':'left',pos+'px')
			$p.html(`${el}`)
			this.slider.scale.append($p)
		})
	}
	scaleValues():void{
		this.options.values.forEach((el:any,i:number)=>{
			const pos:any = this.options.type=='string'?this.options.singleStep*i:this.options.slidersize*i
			const $p:HTMLElement = $(this.slider.scale).find('p')[i]
			$($p).css(this.options.vertical?'bottom':'left',pos+'px')
			$($p).css(this.options.vertical?'left':'bottom',0)
		})	
	}
}