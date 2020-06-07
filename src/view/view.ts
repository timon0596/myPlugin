

class Slider{
	wrapper:any = $('<div>',{class: 'slider__wrapper'})
	element:any = $('<div>',{class: 'slider'})
	axis:any = $('<div>',{class: 'slider__axis'})
	scale:any = $('<div>',{class: 'slider__scale'})
	constructor(){
		this.wrapper.append(this.element).append(this.scale)
		this.element.append(this.axis)
	}
	

}
class Handle{
	element:any = $('<div>',{class: 'handle'})
	titleWrapper:any = $('<div>',{class: 'title__wrapper'})
	title:any = $('<div>',{class: 'title'})
	offset:number = 0
	constructor(){
		this.element.append(this.titleWrapper.append(this.title))
	}
	
}

class range{
	range:any = $('<div>',{class: 'range'})
	constructor(){
		return this.range
	}
}
export class View{
	slider: any
	handles: Array<any> = []
	range: any
	constructor(public options:any){
		for(let i=0;i<this.options.handles;i++){
			this.handles.push(new Handle())
		}
		this.slider = new Slider()
		this.options.vertical?this.slider.wrapper.addClass('vertical'):null
		this.range = this.options.range?new range():null
		this.slider.axis.append(this.range)
		$(this.handles).each((i,el)=>{
			this.slider.axis.append(el.element)
			this.options.title?null:el.title.css('display','none')
		})
		$(options.el).append(this.slider.wrapper)
	}

	setHandlePosition(id:number){
		this.handles[id].element.css(this.options.vertical?'bottom':'left',this.handles[id].offset+'px')
	}

	setTitleValue(i:number){
		if(typeof this.options.values[0]=='number'){
			this.handles[i].title.text(Math.round(this.handles[i].offset/this.options.stepsize+this.options.values[0]))
		}else{
			this.handles[i].title.text(this.options.values[this.handles[i].offset/this.options.stepsize])
		}
	}
	setRange(minmax:[number,number]){
		this.range[0].style[this.options.vertical?'bottom':'left']=minmax[0]+'px'
		this.range[0].style[this.options.vertical?'height':'width']=minmax[1]-minmax[0]+'px'
	}
	scaleInit(){
			$(this.options.values).each((i,el)=>{
				let scaleValue = $('<div>',
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
