import "./index.pug"
import './plugin.ts'
import './style.sass'
let options:any = {
	
	vertical: false,
	step:1
	
}
let cnt1 = $('.slider1').timonSliderPlugin(options)
$('.slider2').timonSliderPlugin({vertical: true})
$('.slider3').timonSliderPlugin({...options,handles: 2})
let {view: {handles: handles1}, view: view1,model: model1}= cnt1.controller


$(document).ready(()=>{
	$(handles1).each((i,el)=>{
		cnt1.find('.inputPanel').append($('<input>',{
			attr: {'handle': i},
			placeholder: 'handle#' + (i+1) + ' value',
			on: {
				change: (e:any)=>{
					if(!cnt1.controller.mousedown){
						model1.computePosFromInput(e.target.value,el)
						cnt1.controller.setHandle(i)
					}
				}
			}

		}))
	})
	$(handles1).on('handlePositonChanged',function(e){
		$(document).ready(()=>{
			$(this.element.closest('.test').find('input')[handles1.indexOf(e.target)]).val(this.title.text())
		})
		
	})
})
