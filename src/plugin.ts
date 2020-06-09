import {Controller} from './controller/controller2'
interface JQuery {
   timonSliderPlugin(options?: options): any
}
(function($){
	$.fn.timonSliderPlugin = function(options:options){
		let initOptions:initOptions = {
			
			vertical: false,
			step:1,
			handles:3,
			title:true,
			range:true,
			values: ['1','2','3','4','5','1','2','3','4','5'],
			initialValues:['2','4'],
			type: 'string',
			slidersize: 0,
			stepsize: 1,
			el: $()
		}
		initOptions = {...initOptions,...options,el: this}

		const controller = new Controller(initOptions)
		const opt:options = {...initOptions}
		return new Proxy(this,{
			get(target,prop:any){
				switch(prop){
					case 'controller':
						return controller
					case 'options':
						delete opt['el']
						return opt
					default:
						return target[prop]		
				}
			}
		});
	}
}(jQuery))







