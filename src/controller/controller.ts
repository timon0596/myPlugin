class slider{
	vertical:boolean = false;
	handlesNumber:number = 1;
	handles:Array<any> = [new handle(0)];
	range:Array<number|string> =  [0,100];
	initialValues:Array<number|string> =  [0];
	section:boolean= false;
	step:number = 30;
	el:HTMLElement
	constructor(){
		this.el = document.createElement('div')
		this.el.classList.add('slider')

		this.vertical ? this.el.classList.add('vertical'):null
		let innerDiv = document.createElement('div')
		innerDiv.classList.add('slider__axis') 
		$(innerDiv).append(this.handles[0].el)
		$(this.el).append(innerDiv)
	}
};
class handle{
	hasTitle:boolean = true
	private titleValue:string|number = 0
	private htmlString:HTMLElement
	constructor(public x:number){
		this.htmlString = document.createElement('div')
		this.htmlString.classList.add('handle')
		this.htmlString.innerHTML = this.hasTitle?
			`<div class="title__wrapper"><div class="title">${this.titleValue}</div></div>`:''
	}

	set title(title:string|number){
		this.titleValue = title
		this.htmlString.innerHTML = this.hasTitle?
			`<div class="title__wrapper"><div class="title">${this.titleValue}</div></div>`:''
	}
	get el(){
		return this.htmlString
	}
};
let title: any = {
	value: ''
};

class controller{

	private mouseX: number = 0
	private mouseY: number = 0
	private mousedown: boolean = false;
	private handle: HTMLElement = this.slider.handles[0];
	constructor(private slider: any){


		$('.slider1.test').append(this.slider.el)

		$(this.slider.handles[0].el).on('mousedown',(e)=>{
			this.mousedown=true
			this.handle=e.currentTarget
			console.log(this.handle)
			
		})

		$(document).on('mouseup',()=>{
			this.mousedown=false
		})

		$(document).on('mousemove',(e)=>{
			if(this.mousedown)
				{
					if(this.slider.vertical){
						this.mouseY = this.slider.el.offsetTop + this.slider.el.offsetHeight - e.clientY
						if(this.mouseY<0){
							this.mouseY = 0
						}
						else if(this.mouseY>this.slider.el.offsetHeight ){
							this.mouseY=this.slider.el.offsetHeight
						}
						this.handle.style.bottom = Math.round(this.mouseY/this.slider.step)*this.slider.step + 'px'
					}else{
						this.mouseX = e.clientX - this.slider.el.offsetLeft
						if(this.mouseX<0){
							this.mouseX = 0
						}
						if(this.mouseX>this.slider.el.offsetWidth ){
							this.mouseX=this.slider.el.offsetWidth
						}
						this.handle.style.left = Math.round(this.mouseX/this.slider.step)*this.slider.step + 'px'
						
					}
					
				}
				
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