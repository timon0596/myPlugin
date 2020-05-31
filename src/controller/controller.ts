class slider{
	vertical:boolean = true
	handlesNumber:number = 1
	handles:Array<any> = [new handle(this.vertical)]
	range:Array<number|string> =  [0,100]
	initialValues:Array<number|string> =  [0]
	section:boolean= false
	step:number = 30
	el:HTMLElement
	stepSize:number = 0
	private mouseX: number = 0
	private mouseY: number = 0
	private mousePos: number = 0

	constructor(){
		this.el = document.createElement('div')
		this.el.classList.add('slider')

		this.vertical ? this.el.classList.add('vertical'):null
		let innerDiv = document.createElement('div')
		innerDiv.classList.add('slider__axis') 
		$(innerDiv).append(this.handles[0].el)
		$(this.el).append(innerDiv)
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

};

class handle{
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


		this.slider.stepSize = this.slider.el[this.slider.vertical?'offsetHeight':'offsetWidth']/(Math.abs(this.slider.range[0] - this.slider.range[1])/this.slider.step)
		
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
			this.mousedown ? this.handle.setPosition(this.slider.countMousePos(e)) : null
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