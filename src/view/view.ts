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
		let handleBoundClickDistance: number
		let handles: any = $('.slider .handle')
		let mousedownTarget: any

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
			left: (target: any): void => {
			} 
		}
		let controller: any = {
			init: (settings: any): void => {
				view.init(settings)
				$('body').mousedown((e)=>{
					if(e.target==handles[0]||e.target==handles[1]){
						mousedownTarget = e.target
						console.log(mousedownTarget.parentNode)
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
							$(mousedownTarget).css({left: () => {
									return e.clientX - mousedownTarget.parentNode.getBoundingClientRect().left
								}
							})

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

