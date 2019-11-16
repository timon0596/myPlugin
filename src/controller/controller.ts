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
				this.baseSlider.append(this.handle)
			}
		},
		range: (s: boolean) : void => {
			if(s){
				this.baseSlider.append(this.range)
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

class ModelClass {
	constructor(public settings: any, public parent: any){

	}
	setHandleParams(obj: any, e: any): void {
		if(e.target == this.parent.find('.slider .handle')[0]||e.target == this.parent.find('.slider .handle')[1]){
				obj.handle = e.target.getBoundingClientRect()
				obj.target = $(e.target)[0]
				obj.slider = $(e.target).parent()[0].getBoundingClientRect()
				obj.click=true
				if(this.settings.params.vertical){
					obj.fromBoundDistance = e.target.getBoundingClientRect().top + e.target.getBoundingClientRect().height - e.clientY
				}
				else{
					obj.fromBoundDistance = e.clientX - e.target.getBoundingClientRect().left	
				}
			}
	}
	handleBot({handle, slider, mousemoveY, fromBoundDistance}: any): number {
		if(mousemoveY>slider.top+slider.height-fromBoundDistance){
			return 0
		}
		
		if(mousemoveY<slider.top+handle.height-fromBoundDistance){
			return slider.height-handle.height
		}
		return slider.height+Number((slider.top).toFixed(1))-Number((mousemoveY).toFixed(1)) - Number((fromBoundDistance).toFixed(1))
		
	}
	handleLeft({handle, slider, mousemoveX, fromBoundDistance}: any): number {
		if(mousemoveX < slider.left + fromBoundDistance){
			return 0
		}

		if(mousemoveX>slider.left + slider.width - handle.width + fromBoundDistance){
			return slider.width - handle.width
		}
		console.log(mousemoveX - fromBoundDistance)
		return mousemoveX - fromBoundDistance - slider.left
	}
	handleMove(o: any): void{
		if(this.settings.params.vertical){
			$(o.target).css({bottom: this.handleBot(o)})
		}
		else{
			$(o.target).css({left: this.handleLeft(o)})
		}
	}
}
(function($){
	$.fn.timonSliderPlugin = function(options?: any){
		let $this = this
		var settings: any = $.extend({
			params: 
				{
					vertical: false,
					title: true,
					range: true,
					interval: true
				},
			step: 1
			
		        }, options );
		let view = new ViewClass(settings, this)
		let model = new ModelClass(settings, this)
		let obj: any = {}
		view.render()
		$('body').mousedown((e)=>{
			model.setHandleParams(obj,e)
		})
		$('body').mousemove((e)=>{
			if(obj.click){
				obj.mousemoveY = e.clientY
				obj.mousemoveX = e.clientX
				model.handleMove(obj)
			}
		})
		$('body').mouseup(()=>{
			obj.click=false
		})
		return this;
	}
}(jQuery))
interface JQuery {
   timonSliderPlugin(options?: any): any
}