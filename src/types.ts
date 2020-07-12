type initOptions = {
	vertical:boolean
	step:number
	handles:number
	title:boolean
	range:boolean
	values: string[]|[number,number]
	initialValues:string[]|number[]
	type:string
	slidersize:number
	stepsize:number
	singleStep:number
	diapason:number
	el: JQuery
}
type options = {
	vertical?:boolean
	step?:number
	handles?:number
	title?:boolean
	range?:boolean
	values?: string[]|[number,number]
	initialValues?:string[]|number[]
	type?:string
	slidersize?:number
	stepsize?:number
	singleStep?: number
	diapason?:number
	el?: JQuery
}
type Slider = {
	slider:JQuery<HTMLElement>
	axis:JQuery<HTMLElement>
	scale:JQuery<HTMLElement>
	range:JQuery<HTMLElement>
}
type Handle = {
	handle:JQuery<HTMLElement>
	title:JQuery<HTMLElement>
}
type range = {
	start:number
	lngt:number
}
type view = {
	handles:Handle[]
	slider:Slider
	init: ()=>void

	vertical: ()=>void

	horizontal: ()=>void
		
	titleOff: ()=>void
		
	titleOn: ()=>void
		
	rangeOn: ()=>void
		
	rangeOff: ()=>void
		
	setRange: (range:range)=>void

	setHandle: (pos:number,i:number)=>void

	setTitle: (value:string|number,i:number)=>void
	scaleValues: ()=>void
	scaleValuesInit: ()=>void
}
type boundingRect = {
	offsetTop:number
	offsetLeft:number	
	offsetHeight:number
}
type model = {
	handlePos:number[]
	handleSteps:number[]

	computePos: (e:JQuery.ClickEvent|JQuery.MouseMoveEvent,i:number,br:boundingRect)=>void

	computeTitle: (i:number) => string|number

	computePosByValue: (value:string|number,index:number)=>void
	
	range:()=>range
}