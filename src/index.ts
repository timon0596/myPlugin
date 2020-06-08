import "./index.pug"
import './plugin.ts'
import './style.sass'
let options:any = {
	
	vertical: false,
	step:1
	
}
let cnt1 = $('.slider1').timonSliderPlugin(options)
let cnt2 = $('.slider2').timonSliderPlugin({vertical: true})
let cnt3 = $('.slider3').timonSliderPlugin({...options,handles: 2})
let cnts = [cnt1,cnt2,cnt3]
let {view: {handles: handles1}, view: view1,model: model1}= cnt1.controller
let {view: {handles: handles2}, view: view2,model: model2}= cnt2.controller
let {view: {handles: handles3}, view: view3,model: model3}= cnt3.controller
let handles = [handles1,handles2,handles3]
let views = [view1,view2,view3]
let models = [model1,model2,model3]

$(document).ready(()=>{
	$(handles).each((index,element)=>{
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
