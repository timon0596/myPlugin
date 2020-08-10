type initOptions = {
	vertical:boolean
	step:number
	handles:number
	title:boolean
	range:boolean
	values: string[]|[number,number]
	initialValues:string[]|number[]
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
