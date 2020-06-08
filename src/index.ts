import "./index.pug"
import './plugin.ts'
import './style.sass'
let options:any = {
	
	vertical: false,
	step:1
	
}



let cnts = [
		$('.slider1').timonSliderPlugin(options),
		$('.slider2').timonSliderPlugin({vertical: true}),
		$('.slider3').timonSliderPlugin({...options,handles: 2})
	]
let handlesArr:any[] = [];
let views:any[] = [];
let models:any[]= [];
(()=>{
	$(cnts).each((i,el)=>{
		let {view: {handles},view,model}=el.controller
		handlesArr.push(handles)
		views.push(view)
		models.push(model)
	})
})()

function Handles(){
	
}
$(document).ready(()=>{
	$(handlesArr).each((index,element)=>{
		$(element).each((i:number,el:any)=>{
			cnts[index].find('.inputPanel').append($('<input>',{
				attr: {'handle': i,'controller': index},
				placeholder: 'handle#' + (i+1) + ' value',
				on: {
					change: (e:any)=>{
						if(!cnts[index].controller.mousedown){
							models[index].computePosFromInput(e.target.value,el)
							cnts[index].controller.setHandle(i)
						}
					}
				}

			}))
		})
		$(element).on('handlePositonChanged',function(e){
			$(document).ready(()=>{
				$(this.element.closest('.test').find('input')[element.indexOf(e.target)]).val(this.title.text())
			})
			
		})
	})
	
})
