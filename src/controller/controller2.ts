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
	scaleAxis:any = $('<div>',{class: 'scale__axis'})
	constructor(){
		this.wrapper.append(this.slider)
		this.slider.append(this.axis).append(this.scaleAxis)
	}
	

}
class Handle{
	handle:any = $('<div>',{class: 'handle'})
	constructor(public title?:any){
		title?this.handle.append(title):null
	}
	
}
class Title{
	titleWrapper:any = $('<div>',{class: 'title__wrapper'})
	title:any = $('<div>',{class: 'title'})
}
class range{
	range:any = $('<div>',{class: 'range'})
}
class View{

	constructor(public slider:any,public handles:any[]){
	}
}
class Model{

}
class Controller{

}
new Slider()