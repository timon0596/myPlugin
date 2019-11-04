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
			$(el).mousedown((e)=>{
				handleX[i]=e.clientX
				$('body').mousemove((ev)=>{
					deltaX[i]=ev.clientX-handleX[i]
					handleX[i]=ev.clientX
					console.log()
					$(el).css({left: ()=>{
							return parseFloat($(el).css('left'))<0?0+'px':
								parseFloat($(el).css('left'))>parseFloat($(el).parent().css('width'))-parseFloat($(el).css('width'))?
								parseFloat($(el).parent().css('width'))-parseFloat($(el).css('width'))+'px':
								parseFloat($(el).css('left'))+deltaX[i]+'px'
						}
					})
				})
			})
			$('body').mouseup(function(){
				$('body').unbind('mousemove')
			})
		})
		
		return this;
	}
}(jQuery))
interface JQuery {
   timonSliderPlugin(): any
}

