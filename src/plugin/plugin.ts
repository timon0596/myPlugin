import {Controller} from './../controller/controller'
(function($){
	$.fn.timonSliderPlugin = function(options?: options){
		let defaultOptions:initOptions = {
			vertical: false,
			step:2,
			handles:1,
			title:true,
			range:true,
			values: ['aaa','sss','ddd','fff','qqq','www','eee','rrr','zzz','xxx'],
			initialValues:['qqq','www','eee'],
		}
		const initOptions = {...defaultOptions,...options,el: $(this)}
		const controller = new Controller(initOptions)
		controller.init(this)
		return new Proxy(this,{
			get(target:any,prop){
				switch(prop){
					case 'controller':
						return controller
					default:
						return target[prop]		
				}
			}
		});
	}
}(jQuery))






