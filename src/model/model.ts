export class Model{
    private singleStep=0
    private stepSize=0
    private handlePosition=0
    private sliderSize = 0
    private type: string
    private el:any = {}
    private diapason = 0
    constructor(private options:any){
        this.type = typeof this.options.values[0]
        this.diapason = this.type=='number'?(this.options.values[1] - this.options.values[0]):0
    }
    get handlePos(){
        return this.handlePosition
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
    computeStepSize(){
        this.stepSize = this.singleStep*this.options.step
    }
    getTitleValue(){
        if(this.type=='number'){
            return Math.round(this.handlePosition/this.singleStep+this.options.values[0])
        }else{
           return this.options.values[this.handlePosition/this.singleStep]
        }
    }
    computeHandlePosition(e:JQuery.MouseMoveEvent|JQuery.ClickEvent|string|number,slider:JQuery<HTMLElement>):void{
        if(typeof e=='string'){

        }
        else if(typeof e=='number'){
            e=e-this.options.values[0]
            this.handlePosition  = Math.round(e/this.diapason*this.sliderSize)
            console.log(e/this.diapason)
        }
        else{
            if(this.options.vertical){
                this.handlePosition = 0
            }
            else{
                const mousePosition =  e.pageX-slider[0].offsetLeft
                const handleSteps = Math.round((mousePosition - this.handlePosition)/(e.type=='click'?this.singleStep:this.stepSize))
                this.handlePosition+= handleSteps*(e.type=='click'?this.singleStep:this.stepSize)
            }
        }
        this.handlePosition = this.handlePosition<0?0:this.handlePosition
        this.handlePosition = this.handlePosition>this.sliderSize?this.sliderSize:this.handlePosition
    }
    
}