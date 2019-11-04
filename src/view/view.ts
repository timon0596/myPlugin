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
					console.log($(el).parent()[0].getBoundingClientRect())
					$(el).css({left: ()=>{
							if(ev.clientX<=parseFloat($(el).parent()[0].getBoundingClientRect().left)){
								return 0
							}
							if(ev.clientX>=parseFloat($(el).parent()[0].getBoundingClientRect().left+$(el).parent()[0].getBoundingClientRect().width)-parseFloat($(el).css('width'))){
								return parseFloat($(el).parent()[0].getBoundingClientRect().width)-parseFloat($(el).css('width'))
							}else{
								return ev.clientX-parseFloat($(el).parent()[0].getBoundingClientRect().left)
							}
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

