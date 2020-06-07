export class Model{
	constructor(public options:any){
	}
	computeHandlePosition(handle:any,e:MouseEvent,slider:any){
		let pos = this.options.vertical?
			slider.offsetTop + slider.offsetHeight - e.clientY - handle.offset :
			e.clientX - slider.offsetLeft - handle.offset
		let pos2 = this.options.vertical?
			slider.offsetTop + slider.offsetHeight - e.clientY :
			e.clientX - slider.offsetLeft
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
	computeInitPosition(handle:any,i:number){
		if(typeof this.options.initialValues[0]=='number'){
			handle.offset = this.options.initialValues[i]?
				Math.round((this.options.initialValues[i] - this.options.values[0])/Math.abs(this.options.values[0]-this.options.values[1])*
					this.options.slidersize/this.options.stepsize)*
					this.options.stepsize :
				handle.offset
		}else{
			handle.offset = this.options.initialValues[i]?
				this.options.values.indexOf(this.options.initialValues[i])*this.options.stepsize:
				handle.offset
		}
	}
}