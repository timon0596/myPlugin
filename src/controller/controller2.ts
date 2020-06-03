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
	slider:any = $('<div>',{class: 'slider'})
	axis:any = $('<div>',{class: 'slider__axis'})
	scale:any = $('<div>',{class: 'slider__scale'})
	scaleAxis: any = $('<div>',{class: 'scale__axis'})
	constructor(){
		this.wrapper.append(this.slider)
		this.scale.append(this.scaleAxis)
		this.slider.append(this.axis).append(this.scale)
	}
	

}
class Handle{
	handle:any = $('<div>',{class: 'handle'})
	constructor(public title?:any){
		Array.from(arguments).forEach((el)=>{
			this.handle.append(el)
		})
		return this.handle
	}
	
}
class Title{
	titleWrapper:any = $('<div>',{class: 'title__wrapper'})
	title:any = $('<div>',{class: 'title'})
	constructor(public value: string|number = 0){

		this.title.html(`${value}`)
		this.titleWrapper.append(this.title)
		return this.titleWrapper
	}
}
class range{
	range:any = $('<div>',{class: 'range'})
	constructor(){
		return this.range
	}
}
class View{

	constructor({el,slider,handles,range,values}:any){
		$(el).append(slider.wrapper)
		range?$(slider.axis).append(range):null
		$(handles).each((i,el)=>{
			slider.axis.append(el)
			$(el).attr('index',`${i}`)
		})
		$(values).each((i,el)=>{
			slider.scaleAxis.append($('<div>',{class: 'scale__value',text: `${el}`}))
		})
	}
}
class Model{
	vertical:boolean = false
	step:number = 1
	stepSize:number = 1
	handles:number|Array<any> = 2
	title:boolean = true 
	values: [number,number]|Array<string> = ['0','100','0','100','0','100','0','100','0','100','0','100','0','100','0','100','0','100','0','100','0','100','0','100','0','100']
	scaleValues:Array<any> = []
	constructor(){
		
	}
}
class Controller{

}
new View({el: '.slider1',range: new range(),handles: [new Handle(new Title())], slider: new Slider(),values: new Model().values})