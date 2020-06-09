import "./index.pug"
import './plugin.ts'
import './style.sass'
import './types'
const options:options = {
	
	step:2,
	title: false,
	handles:2
	
}
const opts:options[] = [
					options,
					{vertical: true},
					{	step: 10,
						vertical: true,
						values: [40,340],
					},
					{...options,handles: 2},
					{
						values: ['qwe','qwe1','qwer','qweqwe','werwertw','asdasd','asd'],
						vertical:true,
						initialValues: ["2","2","4"]
					}
				]

const cnts: any[] = []
$('.js-test').each((i,el)=>{
	cnts.push($(el).timonSliderPlugin(opts[i]))
})
const handlesArr:any[] = [];
const views:any[] = [];
const models:any[]= [];
(()=>{
	$(cnts).each((i,el)=>{
		const {view: {handles},view,model}=el.controller
		handlesArr.push(handles)
		views.push(view)
		models.push(model)
	})
})()


$(document).ready(()=>{
	$(handlesArr).each((index,element)=>{
		cnts[index].find('.config').text(JSON.stringify(cnts[index].options,null,2))
		$(element).each((i:number,el:any)=>{
			cnts[index].find('.inputPanel').append($('<input>',{
				attr: {'handle': i,'controller': index},
				placeholder: 'handle#' + (i+1) + ' value',
				on: {
					change: (e:JQuery.ChangeEvent)=>{
						console.log(e.target.value)
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
