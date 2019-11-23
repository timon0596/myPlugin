type handlePosObj = {
	bound: string,
	size: string,
	stepSize: number,
	mousePos: number,
	fromHandleBoundDistance: number,
	handle: any,
	slider: any,
	target: any
}
class ViewClass {
	wrapper = '<div class="slider-wrapper">'
	slider = '<div class="slider">'
	range = '<div class="range">'
	handle = '<div class="handle">'
	title = '<div class="title">'
	 
	constructor (public settings: any, public parent: any) {
	}
	baseSlider = $(this.slider).append(this.handle)
							
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
				
			this.parent.find('.title').html((()=>{
				if(this.settings.initialValues){
					if(this.settings.params.interval){
						return `${this.settings.initialValues[0]} - ${this.settings.initialValues[1]}`
					}
					else{
						return this.settings.initialValues[0]
					}
				}
				else{
					return this.settings.fromTo[0]
				}
			})())
	}
}

class ModelClass {
	constructor(public settings: any, public parent: any){

	}
	step({step,fromTo: [from,to],sliderSize,handleWidth,values}: any): number {
		let steps: number = Math.abs(to-from)/step
		if(values){
			steps = values.length
		}
		let stepSize: number = (sliderSize-handleWidth)/steps
		return stepSize
	}
	handlePosition({bound,size,stepSize,mousePos,fromHandleBoundDistance: bd,handle,slider,target}: handlePosObj): number{
		let handlePos: number
		let steps = Math.round((mousePos - bd)/stepSize)
		handlePos = steps*stepSize
		if(mousePos-bd<0){
			handlePos = 0
		}
		if(mousePos + handle[size] - bd>slider[size]){
			handlePos = slider[size] - handle[size]
		}
		target.style[bound] = handlePos + 'px'
		return handlePos

	}
	range({range,bound,size,handleWidth,handles,min,max}: any): void {
		
		max = parseFloat(String($(handles[0]).css(bound)))
		if(handles[1]){
			min = parseFloat(String($(handles[0]).css(bound)))
			max = parseFloat(String($(handles[1]).css(bound)))
			if(min > max){
				[min , max] = [max , min]
			}
		}
		range.style[bound] = min + 'px'
		range.style[size] = max - min + handleWidth + 'px'			
	}
	title({title,handlePos,stepSize,fromTo,step}:any): void{
		let titleValue: number
		if(handlePos==0){
			titleValue = fromTo[0]
		}
		else{
			titleValue = Math.round(fromTo[0] + handlePos/stepSize*step)	
		}
		
		title.html(titleValue)
	}
}

(function($){
	$.fn.timonSliderPlugin = function(options?: any){
		let $this = this
		var settings: any = $.extend({
			step: 10,
			fromTo: [20,100],
			initialValues: null,
			values: null,
			params: 
				{
					vertical: true,
					title: true,
					range: false,
					interval: false
				}
		    }, options );
		let vertical = settings.params.vertical

		let view = new ViewClass(settings, $this)
		let model = new ModelClass(settings, $this)

		view.render()

		let slider = this.find('.slider')[0].getBoundingClientRect()

		let $range = this.find('.slider .range')[0]

		let $handles = this.find('.slider .handle')

		let	bound = (()=>{return vertical?'bottom':'left'})()

		let size = (()=>{return vertical?'height':'width'})()

		let rangeParametresObj = {
			bound,
			size,
			handleWidth: 20,
			min: 0,
			max: 0,
			handles: $handles
		}

		let sliderSize = parseFloat(this.find('.slider').css(rangeParametresObj.size))

		let stepSizeParametresObj = {
			...settings, 
			handleWidth: 20, 
			sliderSize
		}

		let stepSize = model.step(stepSizeParametresObj)

		let handlePositionObj: handlePosObj = {
			bound,
			size,
			stepSize,
			mousePos: 0,
			fromHandleBoundDistance: 0,
			handle: null,
			slider,
			target: null
		}
		let title = this.find('.title')
		let titleParametresObj = {
			title,
			stepSize,
			step: settings.step,
			handlePos: 0,
			fromTo: settings.fromTo 
		}


		
		let click: boolean = false

		$('body').mousedown((e)=>{
			if(e.target == $handles[0]||$handles[1]){

				click = true


				handlePositionObj.handle = e.target.getBoundingClientRect()
				handlePositionObj.target = e.target

				if(vertical){

					handlePositionObj.fromHandleBoundDistance = handlePositionObj.handle.top + handlePositionObj.handle.height - e.clientY
					handlePositionObj.mousePos = slider.top + slider.height - e.clientY
				}
				else {
					handlePositionObj.mousePos = e.clientX - slider.left
					handlePositionObj.fromHandleBoundDistance = e.clientX - handlePositionObj.handle.left

				}
				console.log(handlePositionObj)
			}
		})
		$('body').mousemove((e)=>{
			if(click){

				if(vertical){
					handlePositionObj.mousePos = slider.top + slider.height - e.clientY
				}
				else {
					handlePositionObj.mousePos = e.clientX - slider.left
				}
				
				titleParametresObj.handlePos = model.handlePosition(handlePositionObj)
				model.title(titleParametresObj)

			}
			
		})
		$('body').mouseup(()=>{
			click = false
		})

		
		

		return this;
	}
}(jQuery))
interface JQuery {
   timonSliderPlugin(options?: any): any
}