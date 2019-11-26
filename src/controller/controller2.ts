type parametres = {
	bound: string,
	dimension: string,
	handle: any,
	handleposition: number,
	fromBorderDistance: number,
	mouseposition: number,
	step: number,
	initialvalue: Array<number>|Array<string>,
	stepsize: number,
	range: any,
	rangefrom: number,
	rangeto: number
	slidersize: number,
	slider: any,
	from: number|string,
	to: number|string,
	values: Array<string>|null,
	title: any
}
class View {
	wrapper = '<div class="slider-wrapper">'
	slider = '<div class="slider">'
	sliderRange = '<div class="range">'
	handle = '<div class="handle">'
	valueTitle = '<div class="title">'
	 
	constructor (public settings: any, public parent: any) {
		this.render()
	}
	baseSlider = $(this.slider).append(this.handle)
							
	baseTemplate = $(this.wrapper).append(this.baseSlider)

	init: any = {
		vertical:(option: boolean):void=>{
			if(option){
				this.parent.find('.slider').addClass('vertical')
			}
		},

		title:(option: boolean):void=>{
			if(option){
				this.parent.find('.slider-wrapper').append(this.valueTitle)
			}
		},

		interval:(option: boolean):void=>{
			if(option){
				this.parent.find('.slider').append(this.handle)
			}
		},

		range:(option: boolean):void=>{
			if(option){
				this.parent.find('.slider').prepend(this.sliderRange)
			}
		}
	}

	handleRender({handle,bound,fromBorderDistance:bd,mouseposition,stepsize}:any):void{
		handle.style[bound] = Math.round((mouseposition - bd)/stepsize)*stepsize + 'px'
	}

	range({range,bound,dimension,rangefrom,rangeto,handle}: any): void{
		range.style[bound] = rangefrom + 'px'
		range.style[dimension] = rangeto - rangefrom +  handle.style[dimension] + 'px'
	}

	title({handleposition,slidersize,from,to,values,stepsize,title}: any){
		let value
		if(typeof from == 'number'){
			value = handleposition/slidersize*(to - from) + from
		}
		else{
			value = values[handleposition/stepsize]
		}
		title.html(value)
	}

	render(){
		this.parent.append(this.baseTemplate)
		Object.keys(this.settings).forEach((el,i)=>{
			if(this.init[el]){
				this.init[el](this.settings[el])
			}
		})
	}

}

class Model {
	constructor(public settings: any, public parent: any,p: any){
		this.parametresInit(p)
	}

	changeHandleParametres(p: parametres,e: any): parametres{
		if(this.settings.vertical){
			p.fromBorderDistance = p.handle.getBoundingClientRect().top + p.handle.getBoundingClientRect().height - e.clientY
			p.mouseposition = p.slider.getBoundingClientRect().top + p.slidersize - e.clientY
		}
		else{
			p.fromBorderDistance = e.clientX - p.handle.getBoundingClientRect().left
			p.mouseposition = e.clientX - p.slider.getBoundingClientRect().left
		}
		return p
	}

	changeTitleParametres(){}

	changeRangeParametres(){}

	parametresInit(p: any){
		p.bound	= this.settings.vertical?'bottom':'left'
		p.dimension	= this.settings.vertical?'height':'width'
		p.slider = this.parent.find('.slider')[0]
		p.slidersize = parseFloat(this.parent.find('.slider').css(p.dimension))
		p.handle = this.parent.find('.handle')[0]
		if(p.values){

		}
		else{
			p.stepsize = p.slidersize/((p.to - p.from)/p.step)
		}
		p.range = this.parent.find('.range')[0]
		p.title = this.parent.find('.title')
	}
}

(function($){
	$.fn.timonSliderPlugin = function(options?: any){
		let $this = this
		var settings: any = $.extend({
			step: 10,
			fromTo: [0,1000],
			initialValue: [200,500],
			values: null,
			vertical: false,
			title: true,
			range: false,
			interval: true
		    }, options );

		let parametres: parametres = {
			bound: '',
			dimension: '',
			handle: null,
			handleposition: 0,
			fromBorderDistance: 0,
			mouseposition: 0,
			step: settings.step,
			initialvalue: settings.initialValue,
			stepsize: 0,
			range: null,
			rangefrom: 0,
			rangeto: 0,
			slider: null,
			slidersize: 0,
			from: settings.fromTo[0],
			to: settings.fromTo[1],
			values: settings.values,
			title: null
		}

		let view = new View(settings,$this)
		let model = new Model(settings,$this,parametres)
		//-------------------------------------------INITIAL--VALUES-----------------------------
		this.find('.handle').each((i,el)=>{
			parametres.handle = el
			if(typeof parametres.initialvalue[i]=='number'){
				parametres.mouseposition = Math.round((Number(parametres.initialvalue[i]) - Number(parametres.from))/parametres.step)*parametres.stepsize
			}
			if(typeof parametres.initialvalue[i]=='string'){
				if(parametres.values){
					parametres.mouseposition = parametres.values.indexOf(String(parametres.initialvalue[i]))*parametres.stepsize
				}
			}
			view.handleRender(parametres)
		})
		//-------------------------------------------INITIAL--VALUES-----------------------------
		let click: boolean = false

		$('body').mousedown((e)=>{

			if(e.target == $this.find('.handle')[0]||e.target == $this.find('.handle')[1]){
				click = true
				parametres.handle = e.target
			}

		})
				
		$('body').mousemove((e)=>{
			if(click){
				view.handleRender(model.changeHandleParametres(parametres,e))
				console.log(parametres.mouseposition)
				console.log(parametres.fromBorderDistance)
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