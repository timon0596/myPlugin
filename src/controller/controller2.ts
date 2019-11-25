type handlePosObj = {
	bound: string,
	size: string,
	stepSize: number,
	mousePos: number,
	fromHandleBoundDistance: number,
	handle: any,
	slider: any,
	target: any
}
class View {
	wrapper = '<div class="slider-wrapper">'
	slider = '<div class="slider">'
	sliderRange = '<div class="range">'
	handle = '<div class="handle">'
	valueTitle = '<div class="title">'
	 
	constructor (public settings: any, public parent: any) {
	}
	baseSlider = $(this.slider).append(this.handle)
							
	baseTemplate = $(this.wrapper).append(this.baseSlider)

	methods: any = {
		vertical:(option: boolean):void=>{
			if(option){
				this.parent.find('.slider').addClass('vertical')
			}
		},

		title:(option: boolean):void=>{},

		interval:(option: boolean):void=>{},

		range:(option: boolean):void=>{}
	}

	render(){
		this.parent.append(this.baseTemplate)
		Object.keys(this.settings).forEach((el,i)=>{
			
			if(this.methods[el]){
				this.methods[el](this.settings[el])
			}
		})
	}

}

class Model {
	constructor(public settings: any, public parent: any){
	}

	handle(){}

	title(){}

	range(){}
}

(function($){
	$.fn.timonSliderPlugin = function(options?: any){
		let $this = this
		var settings: any = $.extend({
			step: 10,
			fromTo: [1,1000],
			initialValues: 200,
			values: null,
			vertical: true,
			title: true,
			range: false,
			interval: false
		    }, options );
		let view = new View(settings,$this)
		let model = new Model(settings,$this)
		view.render()
		return this;

	}
}(jQuery))
interface JQuery {
   timonSliderPlugin(options?: any): any
}