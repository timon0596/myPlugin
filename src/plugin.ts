import {Controller} from './controller/controller2'
interface JQuery {
   timonSliderPlugin(options?: options): any
}
(function($){
	$.fn.timonSliderPlugin = function(options:options){
		let initOptions:initOptions = {
			
			vertical: false,
			step:1,
			handles:2,
			title:true,
			range:true,
			// values: ['1','2','3','4','5','1','2','3','4','5'],
			values: [123,567],
			initialValues:[234,262,125],
			type: 'string',
			slidersize: 0,
			stepsize: 0,
			singleStep: 0,
			diapason: 0,
			el: $()
		}
		initOptions = {...initOptions,...options,el: this}

		const controller = new Controller(initOptions)
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







