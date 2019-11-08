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
			
		let title: sliderDetails = ['<div>',{class: 'title'}]

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
		let handles: any = $('.slider .handle')
		handles[0].style.left = '0'
		if(handles[1]){
			handles[1].style.left = '0'
		}
		let mousedownTarget: any
		let mouseDownX: number
		let model: any = {
			title: function (target: object , handles: any): void {
				$(target).find('.title').html((100*parseInt($(target).css('left'))/(parseInt($('.slider').css('width'))-parseInt($(target).css('width')))).toFixed(0))
			},
			
		}
		let view: any = {
			vertical: (options?: any): void => {
				if(options.vertical){
					this.find('.slider').css('transform', 'rotate(90deg)')
				}
			},
			init: (settings: any): void => {
				if(settings.title){
					$(...title).appendTo('.handle')
				}
			},
			left: (x: number): number => {
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
			range: () => {
				$('.slider .range').css({ 
											left: view.rangeLeft(),
											width: view.rangeWidth()
										 })
			},
			rangeLeft: () => {
				
				$(handles).each((i,el) => {

					
					handleX[i] = parseFloat(el.style.left)
				})
				handlesMinMax = [...handleX]
				if(handlesMinMax[0]>handlesMinMax[1]){
					[handlesMinMax[0],handlesMinMax[1]] = [handlesMinMax[1],handlesMinMax[0]]
				}
				return 	handlesMinMax[0]
			},
			rangeWidth: () => {
				console.log(handlesMinMax[1] - handlesMinMax[0] + mousedownTarget.getBoundingClientRect().width)
				return handlesMinMax[1] - handlesMinMax[0] + mousedownTarget.getBoundingClientRect().width
			}

		}
		let controller: any = {
			init: (settings: any): void => {
				view.init(settings)
				$('body').mousedown((e)=>{
					console.log(handles[0].style.left)
					console.log(handles[1].style.left)
					if(e.target==handles[0]||e.target==handles[1]){
						mousedownTarget = e.target
						mouseDownX = e.clientX
						fromHandleBoundClickDistance = e.clientX - mousedownTarget.getBoundingClientRect().left
					}
				})
				$('body').mouseup(()=>{
					mousedownTarget = null	
					
				})
				$('body').mousemove((e)=>{
					if(mousedownTarget){
						if(settings.vertical){

						}
						else{
							$(mousedownTarget).css({ left: view.left(e.clientX) })
							view.range()

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

