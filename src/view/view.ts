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
		let handlesMinMax: Array<number> = [0,0]

		let handles: any = $('.handle')
		$(handles).each((i,el)=>{
			$(el).mousedown((e)=>{
				$('body').mousemove((ev)=>{

					$(el).css({left: ()=>{
							if(ev.clientX<=$(el).parent()[0].getBoundingClientRect().left){
								return 0
							}
							if(ev.clientX>=$(el).parent()[0].getBoundingClientRect().left+$(el).parent()[0].getBoundingClientRect().width-parseFloat($(el).css('width'))){
								return $(el).parent()[0].getBoundingClientRect().width-parseFloat($(el).css('width'))
							}else{
								return ev.clientX-$(el).parent()[0].getBoundingClientRect().left
							}
						}
					})
					handleX[i]=parseFloat($(el).css('left'))
					if(handleX[0]>handleX[1]){
						[handlesMinMax[0],handlesMinMax[1]]=[handleX[1],handleX[0]]
					}else{
						[handlesMinMax[0],handlesMinMax[1]]=[handleX[0],handleX[1]]
					}
					$('.range').css({
						left: ()=>handlesMinMax[0],
						width: ()=>handlesMinMax[1]-handlesMinMax[0]+parseFloat($(el).css('width'))
					})
					console.log($('.range').css(['left','width']))
				})
			})
		})
		$('body').mouseup(function(){
				$('body').unbind('mousemove')
				
			})
		return this;
	}
}(jQuery))
interface JQuery {
   timonSliderPlugin(): any
}

