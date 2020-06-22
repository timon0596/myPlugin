
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
	handles:any[]=[]
	slider = new Slider()
	constructor(public options:any){
		for(let i=0;i<this.options.handles;i++){
			this.handles.push(new Handle())
		}
		this.init()
	}
	init(){
		this.handles.forEach((el)=>{
			this.slider.axis.append(el.handle)
		})
	}
	vertical(){
		this.slider.slider.addClass('vertical')
	}
	horizontal(){
		this.slider.slider.removeClass('vertical')
	}
	titleOff(){
		this.handles.forEach((el)=>{
			el.title.hide()
		})
	}
	titleOn(){
		this.handles.forEach((el)=>{
			el.title.show()
		})
	}
	rangeOn(){
		this.slider.range.show()
	}
	rangeOff(){
		this.slider.range.hide()
	}
	setRange({start,lngt}:any){
		this.slider.range.css(this.options.vertical?'bottom':'left',start+'px')	
		this.slider.range.css(this.options.vertical?'left':'bottom',0+'px')	
		this.slider.range.css(this.options.vertical?'height':'width',lngt+'px')
		this.slider.range.css(this.options.vertical?'width':'height',20+'px')
	}
	setHandle(pos:number,i:number){
		this.handles[i].handle.css(this.options.vertical?'bottom':'left',pos+'px')
		this.handles[i].handle.css(this.options.vertical?'left':'bottom',0)
	}
	setTitle(value:string|number,i:number){
		this.handles[i].title.text(value)
	}
	
}