const c:any = []
$('.js-test').each((i,el)=>{
	c[i] = $(el).timonSliderPlugin().controller
	$(el).find('.inputPanel').append(
		$('<button>',{
			class: 'vert',
			text: 'vert',
			on:{
				click: ()=>{
					c[i].vert()
				}
			}
		}),
		$('<button>',{
			class: 'hor',
			text: 'hor',
			on:{
				click: ()=>{c[i].hor()
				}
			}
		}),
		$('<button>',{
			class: 'rng',
			text: 'rng',
			on:{
				click: ()=>{c[i].rng()
				}
			}
		}),
		$('<button>',{
			class: 'titles',
			text: 'title',
			on:{
				click: ()=>{c[i].title()
				}
			}
		})
	)

	c[i].model.handleSteps.forEach((elem:any,ind:number)=>{
		$(el).find('.inputPanel').append($('<input>',{
			val: c[i].model.computeTitle(ind),
			on:{
				blur:function(){
					c[i].setHandleByValue(this.value,ind)
					console.log(this.value)
				}
			}
		}))
	})
	c[i].view.slider.slider.on('changed-handle-pos',(e:any)=>{
		$(el).find('input')[e.handleIndex].value = c[i].model.computeTitle(e.handleIndex)
	})

})