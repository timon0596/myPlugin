import "./index.pug"
import './controller/controller.ts'
import './style.sass'
let options: any = {vertical: true}
$('.slider_regular').timonSliderPlugin({vertical: false})
$('.slider_vertical').timonSliderPlugin(options)