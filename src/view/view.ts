(function($){
	$.fn.timonSliderPlugin = function(options: any){
		var settings: any = $.extend({
			vertical: false,
			title: true,
			step: 1,
			interval: false		            
		        }, options );
		type sliderDetails = [string, object]
		let range: sliderDetails = ['<div>',{class: 'range'}]
		
		let handle: sliderDetails = ['<div>',{class: 'handle'}]
		// let handle1: sliderDetails = ['<div>',{class: 'handle first'}]
			
		

		let detailsArr: sliderDetails[] = [range,handle,handle] 

		let slider: any = document.createElement('div')
		slider.className = 'slider'

		detailsArr.forEach((el: sliderDetails)=>{
			$(...el).appendTo(slider)
		})
		$(slider).appendTo(this)
		
		let handleX: Array<number> = [0,0]
		let handlesMinMax: Array<number> = [0,0]
		let fromHandleBoundClickDistance: number
		let fromHandleBoundClickDistanceY: number
		let handles: any = $('.slider .handle')
		handles[0].style.left = '0'
		handles[0].style.bottom = '0'
		if(handles[1]){
			handles[1].style.left = '0'
		}
		if(handles[1]){
			handles[1].style.bottom = '0'
		}
		let mousedownTarget: any
		let mouseDownX: number
		
		let view: any = {
			vertical: (options?: any): void => {
				if(options.vertical){
					this.find('.slider').addClass('vertical')
					this.find('.slider .range').addClass('vertical')
					

				}
			},
			init: (settings: any): void => {
				
				view.vertical(settings)
			},
			handleOffset: (x: number): number => {
				if( x<mousedownTarget.parentNode.getBoundingClientRect().left +
					fromHandleBoundClickDistance ){
					return mousedownTarget.style.borderWidth*2
				}
				if( x>mousedownTarget.parentNode.getBoundingClientRect().left + 
					mousedownTarget.parentNode.getBoundingClientRect().width - 
					mousedownTarget.getBoundingClientRect().width - 
					mousedownTarget.style.borderWidth*2 +
					fromHandleBoundClickDistance ){
					return mousedownTarget.parentNode.getBoundingClientRect().width - mousedownTarget.getBoundingClientRect().width - mousedownTarget.style.borderWidth*2
				}
				return x - mousedownTarget.parentNode.getBoundingClientRect().left - fromHandleBoundClickDistance 
			},
			handleOffsetVertical: (x: number): number => {
				if( x<mousedownTarget.parentNode.getBoundingClientRect().top +
					fromHandleBoundClickDistanceY ){
					return mousedownTarget.parentNode.getBoundingClientRect().height - mousedownTarget.getBoundingClientRect().width
				}
				if( x>mousedownTarget.parentNode.getBoundingClientRect().top + 
					mousedownTarget.parentNode.getBoundingClientRect().height - 
					mousedownTarget.getBoundingClientRect().width +
					fromHandleBoundClickDistanceY ){
					return 0
				}
				return mousedownTarget.parentNode.getBoundingClientRect().top + mousedownTarget.parentNode.getBoundingClientRect().height - x - 
						mousedownTarget.getBoundingClientRect().width + fromHandleBoundClickDistanceY
			},
			
			range: (bound: string, size: string) => {
				$('.slider .range').css({ 
											[bound]: () => { $(handles).each((i,el) => { handleX[i] = parseFloat(el.style[bound]) })
															handlesMinMax = [...handleX]
															if(handlesMinMax[0]>handlesMinMax[1]){ 
																	[handlesMinMax[0],handlesMinMax[1]] = [handlesMinMax[1],handlesMinMax[0]] 
																}
															return 	handlesMinMax[0]
														},
											[size]:  () => {
																return handlesMinMax[1] - handlesMinMax[0] + mousedownTarget.getBoundingClientRect()[size]
															}
										 })
			}

		}
		let controller: any = {
			init: (settings: any): void => {
				view.init(settings)
				$('body').mousedown((e)=>{
					
					if(e.target==handles[0]||e.target==handles[1]){
						mousedownTarget = e.target
						mouseDownX = e.clientX
						fromHandleBoundClickDistance = e.clientX - mousedownTarget.getBoundingClientRect().left
						fromHandleBoundClickDistanceY = e.clientY - mousedownTarget.getBoundingClientRect().top
					}
				})
				$('body').mouseup(()=>{
					mousedownTarget = null	
					
				})
				$('body').mousemove((e)=>{
					if(mousedownTarget){
						if(settings.vertical){
							$(mousedownTarget).css({ bottom: view.handleOffsetVertical(e.clientY) })
							view.range('bottom','height')
						}
						else{
							$(mousedownTarget).css({ left: view.handleOffset(e.clientX) })
							view.range('left','width')

						}
					}
				})

			}
		}
		controller.init(settings)
					
		return this;
	}
}(jQuery))
interface JQuery {
   timonSliderPlugin(options: any): any
}

