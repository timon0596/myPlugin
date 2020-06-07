import {Controller} from './controller/controller2'
interface JQuery {
   timonSliderPlugin(options?: any): any
}
(function($){
	$.fn.timonSliderPlugin = function(options:any){
		let initOptions:any = {
			
			vertical: false,
			step:4,
			handles:3,
			title:true,
			range:true,
			values: ['1','2','3','4','5','1','2','3','4','5'],
			initialValues:['2','4']
		}
		initOptions = {...initOptions,...options,el: this}
		new Controller(initOptions)
		return this;

	}
}(jQuery))







