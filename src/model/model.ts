export class Model{
	constructor(public options:initOptions){
	}
	computeHandlePosition(handle:any,e:MouseEvent,slider:any):void{
		const pos = this.options.vertical?
			slider.offsetTop + slider.offsetHeight - e.pageY - handle.offset :
			e.clientX - slider.offsetLeft - handle.offset
		const pos2 = this.options.vertical?
			slider.offsetTop + slider.offsetHeight - e.pageY :
			e.clientX - slider.offsetLeft
			if(e.type=='click'){
				handle.offset = Math.round(pos2/this.options.stepsize)*this.options.stepsize
				return
			}
			if(pos2>this.options.slidersize){
				handle.offset = this.options.slidersize
				return
			}
			else if(pos2<0){
				handle.offset = 0
				return
			}
		if(Math.abs(pos)>this.options.stepsize*this.options.step){
				handle.offset+=Math.round(pos/(this.options.stepsize*this.options.step))*this.options.stepsize*this.options.step
				handle.offset = handle.offset>this.options.slidersize?this.options.slidersize:handle.offset<0?0:handle.offset
			}
	}
	computeInitPosition(handle:any,i:number):void{
		if(typeof this.options.initialValues[0]=='number'){
			handle.offset = this.options.initialValues[i]?
				Math.round((<number>this.options.initialValues[i] - <number>this.options.values[0])/Math.abs(<number>this.options.values[0]-<number>this.options.values[1])*
					this.options.slidersize/this.options.stepsize)*
					this.options.stepsize :
				handle.offset
		}else{
			handle.offset = this.options.initialValues[i]?
				this.options.values.indexOf(<never>this.options.initialValues[i])*this.options.stepsize:
				handle.offset
		}
	}
	computePosFromInput(value:any,handle:any):void{
		
		if(this.options.type=='string'){
			const i = this.options.values.indexOf(<never>value)
			if(i!=-1){
				handle.offset = i*this.options.stepsize
			}else{
				console.log('slider has no such value')
				return
			}
		}else if(!isNaN(Number(value))){

			value=Number(value)>this.options.values[1]?
				this.options.values[1]:value<this.options.values[0]?
					this.options.values[0]:value
			handle.offset = Math.round((value - <number>this.options.values[0])/Math.abs(<number>this.options.values[0]-<number>this.options.values[1])*
					this.options.slidersize/this.options.stepsize)*
					this.options.stepsize
		}

	}
}