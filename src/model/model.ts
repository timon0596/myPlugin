export class Model{
	handlePos:number[]=[]
	handleSteps:number[]=[]
	constructor(public options:initOptions){
		for(let i=0;i<this.options.handles;i++){
			this.handlePos.push(0)
			this.handleSteps.push(0)
		}
	}
	computePos({pageX: x,pageY: y}:JQuery.ClickEvent|JQuery.MouseMoveEvent,i:number,{offsetTop:top,offsetLeft:left,offsetHeight:height}:boundingRect):void{
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
	computeTitle(i:number):string|number{
			const index = this.handleSteps[i]
			return this.options.type=='string'?this.options.values[index]:<number>this.handleSteps[i]+<number>this.options.values[0]
	}
	computePosByValue(value:string|number,index:number):void{
		if(isNaN(Number(value))&&this.options.type=='number'){
			return
		}
		if(this.options.type=='string'){

			const i=this.options.values.indexOf(<never>value)
			this.handleSteps[index]=i!=-1?i:0
			this.handlePos[index]=this.handleSteps[index]*this.options.singleStep
		}
		else{
			this.handleSteps[index] = Number(value)>this.options.values[1]?
				<number>this.options.values[1]:
				Number(value)<this.options.values[0]?
					<number>this.options.values[0]:Number(value)
			this.handleSteps[index]=this.handleSteps[index]-<number>this.options.values[0]
			this.handlePos[index]=this.handleSteps[index]*this.options.singleStep
		}

	}
	range():range{
		const start = this.handlePos.length<2?0:Math.min(...this.handlePos)
		console.log(this.handlePos)
		return {start,lngt: Math.max(...this.handlePos) - start}
	}
}