import {Controller} from './controller/controller2'

(function($){
	$.fn.timonSliderPlugin = function(options:options){
		let initOptions:initOptions = {
			
			vertical: false,
			step:2,
			handles:1,
			title:true,
			range:true,
			values: ['aaa','sss','ddd','fff','qqq','www','eee','rrr','zzz','xxx'],
			// values: [123,567],
			// initialValues:['3','4','5'],
			// initialValues:[-1000,-1000],
			initialValues:['qqq','www','eee'],
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


interface JQuery {
   timonSliderPlugin(options?: options): any
}




