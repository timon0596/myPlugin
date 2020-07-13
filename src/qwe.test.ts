import {Controller} from './controller/controller'
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
	test('boundary positions',()=>{
		c.view.handles[0].handle.trigger('mousedown')
		const e = $.Event('mousemove')
		e.pageX = 1000
		$(document).trigger(e)
		expect(c.model.handlePos[0]).toBe(500)
		c.vert()
		e.pageY=1000
		$(document).trigger(e)
		expect(c.model.handlePos[0]).toBe(0)
	})
});
describe('number values, step>1',()=>{
	let c:any
	beforeEach(()=>{
		c = new Controller({...initOptions,values: [100,600],step: 13,initialValues:[200,250,10],handles: 3})
		c.getSlidersize = jest.fn(()=>500)
		c.model.computePos = jest.fn(
			({pageX: x,pageY: y}:JQuery.ClickEvent|JQuery.MouseMoveEvent,i:number,{offsetTop:top,offsetLeft:left,offsetHeight:height}:boundingRect)=>{
					const pos = c.model.options.vertical?
						top + height - y - c.model.handlePos[i]:
						x-left-c.model.handlePos[i]
					const pos1 = c.model.options.vertical?
						top + height - y:
						x-left
						
						c.model.handlePos[i]+=Math.abs(pos)/c.model.options.stepsize>1?Math.round(pos/c.model.options.stepsize)*c.model.options.stepsize:0
						c.model.handlePos[i] = pos1>c.model.options.slidersize?
							c.model.options.slidersize:
							pos1<0? 0:c.model.handlePos[i]
						c.model.handleSteps[i] = Math.round(c.model.handlePos[i]/c.model.options.singleStep)
				}
		)
		c.init()
	})
	test('initialValues',()=>{
		[100,150,0].forEach((el,i)=>{
			expect(el).toEqual(c.model.handlePos[i])
		})
	})
	test('mousemove',()=>{
		$(c.view.handles[2].handle).trigger('mousedown')
		const event = $.Event('mousemove')
		event.pageX = 250
		$(document).trigger(event)
		expect(c.model.handlePos[2]).toBe(Math.floor(250/13)*c.options.stepsize)
	})
	test('computep pos by value',()=>{
		c.setHandleByValue(150,0)
		expect(c.model.handlePos[0]).toBe(50)
		expect(c.model.handleSteps[0]).toBe(50)
		expect(c.view.handles[0].handle.css('left')).toBe('50px')
		expect(c.view.handles[0].title.text()).toBe('150')
		expect(c.view.slider.range.css('width')).toBe('150px')
		expect(c.view.slider.range.css('left')).toBe('0px')
	})
	test('slider click',()=>{
		const e = $.Event('click')
		e.pageX = 349
		c.view.slider.slider.trigger(e)
		expect(c.model.computePos).toBeCalled()
	})
});
