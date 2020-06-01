class slider{
	vertical:boolean = true
	range:boolean = true
	rangeElement:any = this.range?new RangeSection(this.vertical):null
	minmax: [number,number]|null = this.range?[0,0]:null
	handlesNumber:number = 2
	handles:Array<any> = []
	diapason:Array<string>|[number,number] =  ['0,100','0,100','0,100','0,100','0,100','0,100','0,100','0,100','0,100']
	initialValues:Array<number|string> =  [0]
	section:boolean= false
	step:number = 1
	el:HTMLElement
	stepSize:number = 0
	private mousePos: number = 0

	constructor(){
		
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
let title: any = {
	value: ''
};

class controller{

	
	private mousedown: boolean = false;
	private handle: any = this.slider.handles[0];
	constructor(private slider: any){
		let $this = this 

		$('.slider1.test').append(this.slider.el)


		
		
		$(this.slider.handles).each(function(i,el){
			$(el.el).on('mousedown',(e)=>{
				$this.mousedown=true
				$this.handle = this
			})
		})

		$(document).on('mouseup',()=>{
			this.mousedown=false
			console.dir(this.slider.minmax)
		})

		$(document).on('mousemove',(e)=>{
			this.mousedown ? 
			(
				this.handle.setPosition(this.slider.countMousePos(e)),
				this.slider.minmaxCompute(),
				this.slider.rangeElement?this.slider.rangeElement.render(...this.slider.minmax):null
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