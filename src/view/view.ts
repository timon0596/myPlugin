

class Slider{
	wrapper:JQuery = $('<div>',{class: 'slider__wrapper'})
	element:JQuery = $('<div>',{class: 'slider'})
	axis:JQuery = $('<div>',{class: 'slider__axis'})
	scale:JQuery = $('<div>',{class: 'slider__scale'})
	constructor(){
		this.wrapper.append(this.element).append(this.scale)
		this.element.append(this.axis)
	}
	

}
class Handle{
	element:JQuery = $('<div>',{class: 'handle'})
	titleWrapper:JQuery = $('<div>',{class: 'title__wrapper'})
	title:JQuery = $('<div>',{class: 'title'})
	offset = 0
	constructor(){
		this.element.append(this.titleWrapper)
		this.appendTitle()
	}
	appendTitle():void{
		this.titleWrapper.append(this.title)
	}
	
}

class range{
	constructor(public range:JQuery = $('<div>',{class: 'range'})){
	}
}
export class View{
	slider: Slider
	handles: Array<Handle> = []
	range: JQuery
	constructor(public options:initOptions){
		for(let i=0;i<this.options.handles;i++){
			this.handles.push(new Handle())
		}
		this.slider = new Slider()
		this.options.vertical?this.slider.wrapper.addClass('vertical'):null
		this.range = this.options.range?new range().range:$()
		this.range?this.slider.axis.append(this.range):null
		$(this.handles).each((i,el:any)=>{
			this.slider.axis.append(el.element)
			this.showTitle()		
		})
		$(options.el).append(this.slider.wrapper)
	}
	showTitle():void{
		this.options.title?null:this.handles.forEach((el)=>{el.title.css('display','none')})
	}
	setHandlePosition(id:number):void{
		this.handles[id].element.css(this.options.vertical?'bottom':'left',this.handles[id].offset+'px')
		$(this.handles[id]).trigger('handlePositonChanged')
	}

	setTitleValue(i:number): string|number{
		const value = typeof this.options.values[0]=='number'?
			Math.round(this.handles[i].offset/this.options.stepsize+this.options.values[0]):
			this.options.values[Math.round(this.handles[i].offset/this.options.stepsize)]
			
			this.handles[i].title.text(value)
			return value
	}
	setRange(minmax:[number,number]):void{
		this.range[0].style[this.options.vertical?'bottom':'left']=minmax[0]+'px'
		this.range[0].style[this.options.vertical?'height':'width']=minmax[1]-minmax[0]+'px'
	}
	scaleInit():void{
			$(this.options.values).each((i,el)=>{
				const scaleValue = $('<div>',
					{
						class: 'scale__value',
						text: el,
						css: {
							[this.options.vertical?'bottom':'left']: i*this.options[typeof this.options.values[0]=='string'?'stepsize':'slidersize']
						}
						
					})
				this.slider.scale.append(scaleValue)		
			})
	}
	
}
