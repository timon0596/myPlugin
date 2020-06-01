class slider{
	vertical:boolean = false
	range:boolean = true
	rangeElement:any = this.range?new RangeSection(this.vertical):null
	minmax: [number,number]|null = this.range?[0,0]:null
	handlesNumber:number = 3
	handles:Array<any> = []
	diapason:Array<string>|[number,number] =  ["Москва","Московская обл.","Санкт-Петербург","Ленинградская обл.","Абаза","Респ. Хакасия"]
	initialValues:Array<number|string> =  [1]
	section:boolean= false
	step:number = 4
	el:HTMLElement
	stepSize:number = 0
	private mousePos: number = 0

	constructor(){
		typeof this.initialValues[0]!=typeof this.diapason[0]?this.initialValues[0]=this.diapason[0]:null
		this.el = document.createElement('div')
		this.el.classList.add('slider')
		this.vertical ? this.el.classList.add('vertical'):null
		let innerDiv = document.createElement('div')
			innerDiv.classList.add('slider__axis')
		this.range ? $(innerDiv).append(this.rangeElement.el):null
		
		let i = 0
		while(i < this.handlesNumber ){
			this.handles.push(new handle(this.vertical))
			$(innerDiv).append(this.handles[i].el)
			i++
		}
		$(this.el).append(innerDiv)
		$(document).ready(()=>{
			this.stepSize = typeof this.diapason[0]=='string'?
				(this.el[this.vertical?'offsetHeight':'offsetWidth']/(this.diapason.length-1))*this.step:
				(this.el[this.vertical?'offsetHeight':'offsetWidth']/Math.abs(<number>this.diapason[0]-<number>this.diapason[1])*this.step)
		})

	}


	countMousePos(e:MouseEvent){
			this.mousePos = this.vertical?
				(this.el.offsetTop + this.el.offsetHeight - e.clientY):
				(e.clientX - this.el.offsetLeft)
			if(this.mousePos<0){
				this.mousePos = 0
			}
			else if(this.mousePos>this.el[this.vertical?'offsetHeight':'offsetWidth']){
				this.mousePos=this.el[this.vertical?'offsetHeight':'offsetWidth']
				if(Math.round(this.mousePos/this.stepSize)*this.stepSize<this.el[this.vertical?'offsetHeight':'offsetWidth']){
					return this.el[this.vertical?'offsetHeight':'offsetWidth']
				}
			}
			return Math.round(this.mousePos/this.stepSize)*this.stepSize
	}
	minmaxCompute(){
		this.minmax?
			(this.minmax[0]=Math.min(...this.handles.map(el=>el.pos)),this.minmax[1]=Math.max(...this.handles.map(el=>el.pos))) : null
	}
	computeTitleValue(e:MouseEvent|number){
		if(typeof e!='number'){
			if(typeof this.diapason[0]=='number')
				return Math.trunc(this.countMousePos(e)/this.el[this.vertical?'offsetHeight':'offsetWidth']*Math.abs(<number>this.diapason[1]-<number>this.diapason[0]))+this.diapason[0]
			else
				{
					console.log(this.countMousePos(e))
					return this.diapason[this.countMousePos(e)/(this.el[this.vertical?'offsetHeight':'offsetWidth']/(this.diapason.length-1))]
				}
		}
		else{
			if(typeof this.diapason[0]=='number')
				return Math.trunc(e/this.el[this.vertical?'offsetHeight':'offsetWidth']*Math.abs(<number>this.diapason[1]-<number>this.diapason[0]))+this.diapason[0]
			else
				return this.diapason[e/this.stepSize]
		}
	}
	computeInitialPositions(values: Array<string>|Array<number>){
		if(typeof values[0]=='string'){
			$(values).each((i,el)=>{
				let ind=this.diapason.indexOf(<never>el)
				ind!=-1?
					this.handles[i].setPosition(ind*this.stepSize):
					this.handles[i].setPosition(0)
			})
		}
		if(typeof values[0]=='number'){
			$(values).each((i,el)=>{
				<never>el<this.diapason[0]?
					this.handles[i].setPosition(0):
					<never>el>this.diapason[1]?
						this.handles[i].setPosition(this.el[this.vertical?'offsetHeight':'offsetWidth']):
						this.handles[i].setPosition(
							Math.round((<never>el-<number>this.diapason[0])/
								Math.abs(<number>this.diapason[1]-<number>this.diapason[0])*
								this.el[this.vertical?'offsetHeight':'offsetWidth']/
								this.stepSize)*
							this.stepSize
						)
						console.log(this.stepSize)


			})

		}
	}


};
class RangeSection{
	el:HTMLElement = document.createElement('div')
	constructor(private vertical:boolean){
		this.el.classList.add('rangeSection')
	}
	render(start:number,end:number){
		this.el.style[this.vertical?'bottom':'left']=start+'px'
		this.el.style[this.vertical?'height':'width']=end-start+'px'
	}
}
class handle{
	pos:number=0
	hasTitle:boolean = true
	private titleValue:string|number = 0
	private el:HTMLElement
	constructor(private vertical:boolean){
		
		this.el = document.createElement('div')
		this.el.classList.add('handle')
		this.el.style[this.vertical?'bottom':'left'] =  this.pos + 'px'
		this.el.innerHTML = this.hasTitle?
			`<div class="title__wrapper"><div class="title">${this.titleValue}</div></div>`:''
	}

	set title(title:string|number){
		this.titleValue = title
		this.el.innerHTML = this.hasTitle?
			`<div class="title__wrapper"><div class="title">${this.titleValue}</div></div>`:''
	}
	setPosition(positionValue: number){
		this.el.style[this.vertical?'bottom':'left'] =  positionValue + 'px'
		this.pos=positionValue
	}

};


class controller{

	
	private mousedown: boolean = false;
	private handle: any = this.slider.handles[0];
	constructor(private slider: any){
		let $this = this 

		$('.slider1.test').append(this.slider.el)

		$(document).ready(()=>{
			this.slider.computeInitialPositions(this.slider.initialValues)
			$(this.slider.handles).each((i,el)=>{
				el.title = this.slider.computeTitleValue(el.pos)
			})
			this.slider.minmaxCompute(),
			this.slider.rangeElement?this.slider.rangeElement.render(...this.slider.minmax):null
		})

		
		
		$(this.slider.handles).each(function(i,el){
			$(el.el).on('mousedown',(e)=>{
				$this.mousedown=true
				$this.handle = this
			})
		})

		$(document).on('mouseup',()=>{
			this.mousedown=false
		})

		$(document).on('mousemove',(e)=>{
			this.mousedown ? 
			(
				this.handle.setPosition(this.slider.countMousePos(e)),
				this.slider.minmaxCompute(),
				this.slider.rangeElement?this.slider.rangeElement.render(...this.slider.minmax):null,
				this.handle.title = this.slider.computeTitleValue(e) 
			) : null
		})
		
	}
}	

(function($){
	$.fn.timonSliderPlugin = function(){

		return this;

	}
}(jQuery))
interface JQuery {
   timonSliderPlugin(options?: any): any
}


$(document).ready(function() {
	new controller(new slider())
})