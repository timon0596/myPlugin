import $ from 'jquery'

export class Model{
	handlePos:number[]=[]
	handleSteps:number[]=[]
	constructor(public options:any){
		for(let i=0;i<this.options.handles;i++){
			this.handlePos.push(0)
			this.handleSteps.push(0)
		}
	}
	computePos({pageX: x,pageY: y}:MouseEvent,i:number,{offsetTop:top,offsetLeft:left,offsetHeight:height,offsetWidth:width}:any){
		const pos = this.options.vertical?
			top + height - y - this.handlePos[i]:
			x-left-this.handlePos[i]
		const pos1 = this.options.vertical?
			top + height - y:
			x-left
			
			this.handlePos[i]+=Math.abs(pos)/this.options.stepsize>1?Math.round(pos/this.options.stepsize)*this.options.stepsize:0
			this.handlePos[i] = pos1>this.options.slidersize?
				this.options.slidersize:
				pos1<0? 0:this.handlePos[i]
			this.handleSteps[i] = Math.round(this.handlePos[i]/this.options.singleStep)
	}
	computeTitle(i:number){
			const index = this.handleSteps[i]
			return this.options.type=='string'?this.options.values[index]:this.handleSteps[i]+this.options.values[0]
	}
	computePosByValue(value:string|number,index:number){

		if(this.options.type=='string'){

			const i=this.options.values.indexOf(value)
			this.handleSteps[index]=i!=-1?i:0
			this.handlePos[index]=this.handleSteps[index]*this.options.singleStep
		}
		else{
			this.handleSteps[index]=Number(value)>this.options.values[1]?
				this.options.values[1]:
				Number(value)<this.options.values[0]?
					this.options.values[0]:Number(value)
			this.handleSteps[index]=this.handleSteps[index]-this.options.values[0]
			this.handlePos[index]=this.handleSteps[index]*this.options.singleStep
		}

	}
	range(){
		return {start : Math.min(...this.handlePos),lngt: Math.max(...this.handlePos) - Math.min(...this.handlePos)}
	}
	
}