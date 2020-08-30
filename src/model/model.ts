export class Model{
    private singleStep=0
    private stepSize=0
    private handlePosition:Array<number>
    private sliderSize = 0
    private type: string
    private el:any = {}
    private diapason = 0
    constructor(private options:any){
        this.handlePosition = new Array(this.options.handles).fill(0)
        this.type = typeof this.options.values[0]
        this.diapason = this.type=='number'?(this.options.values[1] - this.options.values[0]):0
    }
    handlePos(i:number):number{
        return this.handlePosition[i]
    }
    computeSliderSize(slider:JQuery<HTMLElement>):void{
        this.sliderSize = slider[0].getBoundingClientRect()[this.options.vertical?'height':'width']
    }
    computeSingleStep():void{
        if(this.type=='string'){
            this.singleStep = this.sliderSize/(this.options.values.length-1)
        }
        else{
            this.singleStep =  this.sliderSize/(this.options.values[1]-this.options.values[0])
        }
    }
    computeStepSize():void{
        this.stepSize = this.singleStep*this.options.step
    }
    getTitleValue(i:number):number|string{
        if(this.type=='number'){
            return Math.round(this.handlePosition[i]/this.singleStep+this.options.values[0])
        }else{
           return this.options.values[this.handlePosition[i]/this.singleStep]
        }
    }
    computeHandlePosition({i,e,slider}:handlePosArgument):void{
        if(typeof e=='string'){

        }
        else if(typeof e=='number'){
            e=e-this.options.values[0]
            this.handlePosition[i]  = Math.round(e/this.diapason*this.sliderSize)
            console.log(e/this.diapason)
        }
        else{
            if(this.options.vertical){
                this.handlePosition[i] = 0
            }
            else{
                const mousePosition =  e.pageX-slider[0].offsetLeft
                const handleSteps = Math.round((mousePosition - this.handlePosition[i])/(e.type=='click'?this.singleStep:this.stepSize))
                this.handlePosition[i]+= handleSteps*(e.type=='click'?this.singleStep:this.stepSize)
            }
        }
        this.handlePosition[i] = this.handlePosition[i]<0?0:this.handlePosition[i]
        this.handlePosition[i] = this.handlePosition[i]>this.sliderSize?this.sliderSize:this.handlePosition[i]
    }
    
}