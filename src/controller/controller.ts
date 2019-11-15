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
	
	handleBot({handle, slider, mousemoveY, fromBoundDistance,handleBottom}: any): any {
		if(mousemoveY>slider.top+slider.height-fromBoundDistance){
			return 0
		}
		
		if(mousemoveY<slider.top+handle.height-fromBoundDistance){
			return slider.height-handle.height
		}
		return slider.height+Number((slider.top).toFixed(1))-Number((mousemoveY).toFixed(1)) - Number((fromBoundDistance).toFixed(1))
		
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
					range: true,
					interval: true
				},
			step: 1
			
		        }, options );
		let view = new ViewClass(settings, this)
		let model = new ModelClass(settings, this)
		let obj: any = {
			}
			let click: boolean
		view.render()
		$('body').mousedown((e)=>{
			if(e.target == this.find('.slider .handle')[0]||e.target == this.find('.slider .handle')[1]){
				obj.handle = e.target.getBoundingClientRect()
				obj.target = $(e.target)[0]
				obj.handleBottom = parseFloat(obj.target.style.bottom)
				obj.slider = $(e.target).parent()[0].getBoundingClientRect()
				obj.fromBoundDistance = e.target.getBoundingClientRect().top + e.target.getBoundingClientRect().height - e.clientY
				
				click=true
			}

		})
		$('body').mousemove((e)=>{
			if(click){
				
				obj.mousemoveY = e.clientY
				obj.handleBottom = parseFloat(obj.target.style.bottom)
				console.log(obj.handleBottom)
				$(obj.target).css({bottom: model.handleBot(obj)})

			}
		})
		$('body').mouseup(()=>{
			click=false
		})
		return this;
	}
}(jQuery))
interface JQuery {
   timonSliderPlugin(options?: any): any
}