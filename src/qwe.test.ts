import {Controller} from './controller/controller2'
import $ from 'jquery'
const initOptions:initOptions = {
			vertical: false,
			step:1,
			handles:2,
			title:true,
			range:true,
			values: ['1','2','3','4','5','1','2','3','4','5'],
			// values: [123,567],
			initialValues:[234,262,125],
			type: 'string',
			slidersize: 0,
			stepsize: 0,
			singleStep: 0,
			diapason: 0,
			el: $()
		}

describe('common test',()=>{
	let c:any
	beforeEach(()=>{
		c = new Controller({...initOptions,initialValues: [1,2],values: ['qqqqqqqq','wwwwww','eeeeeee','qweqwe','qweqweqwe','aaaaaaa']})
		c.getSlidersize = jest.fn(()=>500)
		c.init()
	})
	test('typeof initialValues != typeof values',()=>{
		expect(c.options.initialValues).toEqual(c.options.values)
		expect(c.model.handlePos.length).toEqual(c.options.handles)
		$(c.model.handlePos).each((i,el)=>{
			expect(el).toBe(c.options.singleStep*i)
		})
	})
	test('setHandle',()=>{
		const event = $.Event('mousemove')
		event.pageX = 251
		event.pageY = 251
		c.mousedown=true
		c.setHandle(event)
		expect(c.model.handlePos[0]).toBe(300)
		expect(c.model.handleSteps[0]).toBe(3)
		expect(c.view.handles[0].handle.css('left')).toBe('300px')
	})
	test('setHandleByValue',()=>{
		c.setHandleByValue('eeeeeee',0)
		expect(c.model.handlePos[0]).toBe(200)
		expect(c.model.handleSteps[0]).toBe(2)
		expect(c.view.handles[0].handle.css('left')).toBe('200px')
		c.setHandleByValue('111111',0)
		expect(c.model.handlePos[0]).toBe(0)
		expect(c.model.handleSteps[0]).toBe(0)
		expect(c.view.handles[0].handle.css('left')).toBe('0px')
	})
	test('mousemove',()=>{
		c.view.handles[0].handle.trigger('mousedown')
		const e = $.Event('mousemove')
		e.pageX = 349
		$(document).trigger(e)
		expect(c.model.handlePos[0]).toBe(300)
		expect(c.model.handleSteps[0]).toBe(3)
		expect(c.view.handles[0].handle.css('left')).toBe('300px')
		expect(c.view.handles[0].title.text()).toBe('qweqwe')
		expect(c.view.slider.range.css('width')).toBe('200px')
		expect(c.view.slider.range.css('left')).toBe('100px')
	})
});
