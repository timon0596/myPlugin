class ViewCLASS{
	wrapper = '<div class="slider-wrapper">'
	slider = '<div class="slider">'
	range = '<div class="range">'
	handle = '<div class="handle">'
	title = '<div class="title">'
	 
	
	

	constructor (public settings: any, public parent: any) {
	}
	baseSlider = $(this.slider)
							.append(this.range)
							.append(this.handle);
							
	baseTemplate = $(this.wrapper)
								.append(this.baseSlider)
								.append(this.title);


	render() : void {
		$(this.parent).append(this.baseTemplate)
	}
	console() : void {
		console.log(this.baseTemplate)
	}
}

(function($){
	$.fn.timonSliderPlugin = function(options: any){
		let $this = this
		var settings: any = $.extend({
			vertical: false,
			title: true,
			step: 1,
			interval: true		            
		        }, options );
		let view = new ViewCLASS(settings, this)
		view.console()
		view.render()
		return this;
	}
}(jQuery))
interface JQuery {
   timonSliderPlugin(options: any): any
}