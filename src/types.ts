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
	wrapper:JQuery
	element:JQuery
	axis:JQuery
	scale:JQuery
}
type Handle = {
	element:JQuery
	titleWrapper:JQuery
	title:JQuery
	offset:number
}
