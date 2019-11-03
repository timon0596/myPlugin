(function($){
	$.fn.timonSliderPlugin = function(options?: object){
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
		$(...title).appendTo('.handle')

		let handleX: Array<number> = [0,0]

		let deltaX: Array<number> = [0,0]

		let handles: any = $('.handle')

		$(handles).each((i,el)=>{
			i==0?$(el).addClass('first'):$(el).addClass('second')
			console.log(el)


			$(el).mousedown((e)=>{
				$(el).css('z-index','10')
				handleX[i]=e.clientX
				$(el).mousemove((e)=>{
										deltaX[i]=e.clientX-handleX[i]
										console.log(deltaX[i])
										handleX[i]=e.clientX
										$(e.target).css({left: ()=>{
																		return parseFloat($(e.target).css('left'))+deltaX[i]+'px'
																	}
										})		
									}
				)
				
			})
			$('body').mouseup(()=>{
				$(el).unbind('mousemove')
				$(el).css('z-index','1')
			})

		})
		
		return this;
	}
}(jQuery))
interface JQuery {
   timonSliderPlugin(): any
}

