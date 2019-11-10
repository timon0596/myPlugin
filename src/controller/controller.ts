
(function($){
	$.fn.timonSliderPlugin = function(options: any){
		let $this = this
		var settings: any = $.extend({
			vertical: false,
			title: true,
			step: 1,
			interval: true		            
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
		let handles: any = $this.find	('.slider .handle')
		handles[0].style.left = '0'
		handles[0].style.bottom = '0'
		if(handles[1]){
			handles[1].style.left = '0'
		}
		if(handles[1]){
			handles[1].style.bottom = '0'
		}
		let mousedownTarget: any
		let view: any = {
			vertical: (options?: any): void => {
				if(options.vertical){
					this.find('.slider').addClass('vertical')
				}
			},
			init: (settings: any): void => {
				
				view.vertical(settings)
			},
			handleOffset: (x: number): number => {
				let parent = mousedownTarget.parentNode.getBoundingClientRect()
				let target = mousedownTarget.getBoundingClientRect()
				if(settings.vertical){
					if( x<parent.top +
						fromHandleBoundClickDistanceY ){
						return parent.height - target.width
					}
					if( x>parent.top + 
						parent.height - 
						target.width +
						fromHandleBoundClickDistanceY ){
						return 0
					}
					return parent.top + parent.height - x - 
							target.width + fromHandleBoundClickDistanceY
				} 
				else{
					if( x<parent.left +
					fromHandleBoundClickDistance ){
					return mousedownTarget.style.borderWidth*2
				}
				if( x>parent.left + 
					parent.width - 
					target.width - 
					mousedownTarget.style.borderWidth*2 +
					fromHandleBoundClickDistance ){
					return parent.width - target.width - mousedownTarget.style.borderWidth*2
				}
				return x - parent.left - fromHandleBoundClickDistance
				}
			},
			
			range: (bound: string, size: string) => {
				$this.find('.slider .range').css({ 
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
							$(mousedownTarget).css({ bottom: view.handleOffset(e.clientY) })
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