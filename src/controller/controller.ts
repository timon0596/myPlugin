class ViewClass {
	wrapper = '<div class="slider-wrapper">'
	slider = '<div class="slider">'
	range = '<div class="range">'
	handle = '<div class="handle">'
	title = '<div class="title">'
	 
	constructor (public settings: any, public parent: any) {
	}
	baseSlider = $(this.slider).append(this.handle);
							
	baseTemplate = $(this.wrapper).append(this.baseSlider)
	
	params: any = {
		interval: (s: boolean) : void => {
			if(s){
				this.baseSlider.append(this.range)
				console.log(this.baseSlider)
			}
		},
		vertical: (s: boolean) : void => {
			if(s){
				this.baseSlider.addClass('vertical')
			}
		},
		title: (s: boolean) : void => {
			if(s){
				this.baseTemplate.append(this.title)
			}
		}
	}

	render() : void {
			Object.keys(this.settings.params).forEach((el,i):void=>{
				this.params[el](this.settings.params[el])
			})
			this.parent.append(this.baseTemplate)
	}
	

	
}
(function($){
	$.fn.timonSliderPlugin = function(options?: any){
		let $this = this
		var settings: any = $.extend({
			params: 
				{
					vertical: true,
					title: true,
					interval: true
				},
			step: 1
			
		        }, options );
		let view = new ViewClass(settings, this)
		view.render()
		return this;
	}
}(jQuery))
interface JQuery {
   timonSliderPlugin(options?: any): any
}