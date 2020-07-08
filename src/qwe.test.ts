import {Controller} from './controller/controller2'
import $ from 'jquery'
import puppeteer from 'puppeteer'
const initOptions:any = {
			vertical: false,
			step:1,
			handles:3,
			title:true,
			range:true,
			values: ['1','2','3','4','5','1','2','3','4','5'],
			// values: [50,100],
			initialValues:['2','4'],
			type: 'string',
			slidersize: 0,
			stepsize: 0,
			el: $('.js-test')
		}

describe('intializing slider',()=>{
	let c:any
	beforeEach(()=>{
		c = new Controller({...initOptions,initialValues: [1,2]})
		c.getSlidersize = jest.fn(()=>500)
		c.init()
	})
	test('slider exists',()=>{
		expect(c.view.slider).toBeDefined()
	})
	test('correct number of model handles array items',()=>{
		expect(c.model.handlePos.length).toBe(initOptions.handles)
		expect(c.model.handleSteps.length).toBe(initOptions.handles)
		expect(c.view.handles.length).toBe(initOptions.handles)
	})
	test('coorect number of handles appended to slider',()=>{
		expect(c.view.slider.axis.children('.handle').length).toBe(initOptions.handles)
	})
	test('getslidersize to be called',()=>{
		expect(c.getSlidersize).toBeCalled()
	})
	test('slidersize != 0',()=>{
		expect(c.options.slidersize).not.toBe(0)
	})
	test('handles initial pos',()=>{
		$(c.options.initialValues).each((i,el)=>{
			if(c.model.handlePos[i]){
				const pos = c.model.computePosByValue(el)
				expect(c.model.handlePos[i]).toBe(pos)
			}
		})
	})
	test('checking type of values & initialValues',()=>{
		expect(c.options.type).toEqual(typeof c.options.values[0])
		expect(c.options.type).toEqual(typeof c.options.initialValues[0])
	})
});
