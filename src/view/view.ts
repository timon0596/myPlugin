
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
		this.slider.$slider.append(this.handle.$handle)
	}
	private handle = new Handle()
	private slider = new Slider()
	get Slider():JQuery<HTMLElement>{
		return this.slider.$slider
	}
	get Handle():JQuery<HTMLElement>{
		return this.handle.$handle
	}
	setHandlePosition(pos:number){
		this.handle.$handle.css('left',pos+'px')
	}
}