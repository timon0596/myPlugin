// class ViewClass {
// 	wrapper = '<div class="slider-wrapper">'
// 	slider = '<div class="slider">'
// 	range = '<div class="range">'
// 	handle = '<div class="handle">'
// 	title = '<div class="title">'
	 
// 	constructor (public settings: any, public parent: any) {
// 	}
// 	baseSlider = $(this.slider).append(this.handle);
							
// 	baseTemplate = $(this.wrapper).append(this.baseSlider)
	
// 	params: any = {
// 		interval: (s: boolean) : void => {
// 			if(s){
// 				this.baseSlider.append(this.handle)
// 			}
// 		},
// 		range: (s: boolean) : void => {
// 			if(s){
// 				this.baseSlider.append(this.range)
// 			}
// 		},
// 		vertical: (s: boolean) : void => {
// 			if(s){
// 				this.baseSlider.addClass('vertical')
// 			}
// 		},
// 		title: (s: boolean) : void => {
// 			if(s){
// 				this.baseTemplate.append(this.title)
// 			}
// 		}
// 	}

// 	render() : void {
// 			Object.keys(this.settings.params).forEach((el,i):void=>{
// 				this.params[el](this.settings.params[el])
// 			})
// 			this.parent.append(this.baseTemplate)
// 	}
	

	
// }

// class ModelClass {
// 	constructor(public settings: any, public parent: any){

// 	}
// 	setHandleParams(obj: any, e: any): void {
// 		if(e.target == this.parent.find('.slider .handle')[0]||e.target == this.parent.find('.slider .handle')[1]){
// 				obj.handle = e.target.getBoundingClientRect()
// 				obj.target = $(e.target)[0]
// 				obj.slider = $(e.target).parent()[0].getBoundingClientRect()
// 				obj.click=true
// 				if(this.settings.params.vertical){
// 					obj.fromBoundDistance = e.target.getBoundingClientRect().top + e.target.getBoundingClientRect().height - e.clientY
// 				}
// 				else{
// 					obj.fromBoundDistance = e.clientX - e.target.getBoundingClientRect().left	
// 				}
// 			}
// 	}

// 	handleBot({handle, slider, mousemoveY, fromBoundDistance}: any): number {
// 		if(mousemoveY>slider.top+slider.height-fromBoundDistance){
// 			return 0
// 		}
		
// 		if(mousemoveY<slider.top+handle.height-fromBoundDistance){
// 			return slider.height-handle.height
// 		}

// 		return slider.height+Number((slider.top).toFixed(1))-Number((mousemoveY).toFixed(1)) - Number((fromBoundDistance).toFixed(1))
		
// 	}

// 	handleLeft({handle, slider, mousemoveX, fromBoundDistance}: any): number {
// 		if(mousemoveX < slider.left + fromBoundDistance){
// 			return 0
// 		}

// 		if(mousemoveX>slider.left + slider.width - handle.width + fromBoundDistance){
// 			return slider.width - handle.width
// 		}

// 		return mousemoveX - fromBoundDistance - slider.left
// 	}

// 	handleMove(o: any): void{
// 		if(this.settings.params.vertical){
// 			$(o.target).css({bottom: this.handleBot(o)})
// 		}
// 		else{
// 			$(o.target).css({left: this.handleLeft(o)})
// 		}
// 	}

// 	range({range,bound,size,handleWidth,handles,min,max}: any): void {
		
// 			max = parseFloat(String($(handles[0]).css(bound)))
// 			if(handles[1]){
// 				min = parseFloat(String($(handles[0]).css(bound)))
// 				max = parseFloat(String($(handles[1]).css(bound)))
// 				if(min > max){
// 					[min , max] = [max , min]
// 				}
// 			}
// 			range.style[bound] = min + 'px'
// 			range.style[size] = max - min + handleWidth + 'px'			
		
// 	}
// }
// (function($){
// 	$.fn.timonSliderPlugin = function(options?: any){
// 		let $this = this
// 		var settings: any = $.extend({
// 			params: 
// 				{
// 					vertical: true,
// 					title: true,
// 					range: false,
// 					interval: false
// 				},
// 			step: 1
// 		        }, options );

// 		let view = new ViewClass(settings, $this)
// 		let model = new ModelClass(settings, $this)
// 		view.render()
		
// 		let $range = this.find('.slider .range')[0]
// 		let $handles = this.find('.slider .handle')
		
// 		let obj: any = {}
// 		let range : any = 
// 		{
// 			bound: 'left',
// 			size: 'width',
// 			min: 0,
// 			max: 0,
// 			handleWidth: 20,
// 			range: $range,
// 			handles: $handles
// 		}
// 		if(settings.params.vertical){
// 			range.bound='bottom'
// 			range.size='height'
// 		}
// 		else{
// 			range.bound='left'
// 			range.size='width'
// 		}

// 		$('body').mousedown((e)=>{
// 			model.setHandleParams(obj,e)
// 		})
// 		$('body').mousemove((e)=>{
// 			if(obj.click){
// 				obj.mousemoveY = e.clientY
// 				obj.mousemoveX = e.clientX
// 				model.handleMove(obj)
// 				if(settings.params.range){
// 					model.range(range)
// 				}

// 			}
// 		})
// 		$('body').mouseup(()=>{
// 			obj.click=false
// 		})

// 		return this;
// 	}
// }(jQuery))
// interface JQuery {
//    timonSliderPlugin(options?: any): any
// }