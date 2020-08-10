import "./index.pug"
import './plugin/style.sass'
import './plugin/plugin.ts'
const c:any = []
const opts:options[] = 
[
	{values: [100,600],step: 11,initialValues:[200,250,10],handles: 3},
	{values: [100,600],step: 13,initialValues:[200,250,10],handles: 1, vertical:true},
	{values: [0,160],step: 3,handles: 2},
	{values: ['a','b','c','d'],handles: 1,step: 1},
	{handles: 3,initialValues: [1]},
	{handles: 3,initialValues: [1],vertical: true},
]
$('.js-test').each((i,el)=>{
	c[i] = $(el).timonSliderPlugin(opts[i]).controller


})

