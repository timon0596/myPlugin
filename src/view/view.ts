
import $ from 'jquery'
class Handle{
	$handle = $('<div>',{class: 'handle'})
	$title = $('<div>',{class: 'handle__title'})
	constructor(){
		this.init()
	}
	init():void{
		this.$handle.append(this.$title)
	}
}
class Slider{
	$slider = $('<div>',{class: 'slider'})
}


export class View {
	constructor(private options:any){
		this.handles.forEach((el)=>{
			this.slider.$slider.append(el.$handle)
		})
	}
	private handles = new Array(this.options.handles).fill(new Handle())
	private slider = new Slider()
	get Slider():JQuery<HTMLElement>{
		return this.slider.$slider
	}
	Handle(i:number):JQuery<HTMLElement>{
		return this.handles[i].$handle
	}
	setHandlePosition(i:number,pos:number):void{
		this.handles[i].$handle.css('left',pos+'px')
	}
	setTitleValue(i:number,value:string|number):void{
		this.handles[i].$title.text(value)
	}
}