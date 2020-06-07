import "./index.pug"
import './plugin.ts'
import './style.sass'
let options:any = {
	
	vertical: false,
	
}
$('.slider1').timonSliderPlugin(options)
$('.slider2').timonSliderPlugin({vertical: true})
$('.slider3').timonSliderPlugin({...options,handles: 2})