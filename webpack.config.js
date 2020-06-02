const path = require('path');
const HWP=require('html-webpack-plugin');
const webpack = require('webpack');
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');

// const autoprefixer = require('autoprefixer');
module.exports = {
	
	entry: './src/index.ts',
	output: {
		filename: 'main.[hash].js',
		path: path.resolve(__dirname,'dist')
	},devtool: 'source-map',
	resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
	module:{
		rules: [{
			test:/\.pug$/,
			loader: 'pug-loader',
			options: {pretty: true}
		},
		{
			test:/\.js$/,
			loader: 'babel-loader',
			exclude:'/node_modules/'
		},
		{
	        test: /\.tsx?$/,
	        loader: 'awesome-typescript-loader'
	    },
		{
		    test: /\.(scss|sass)$/,
		    use: [
				    {
				      loader: 'style-loader', 
				    }, {
				      loader: 'css-loader', 
				      loader: 'postcss-loader', 
				      options: {
				        plugins: function () {
				          return [
				            require('precss'),
				            require('autoprefixer')
				          ];
				        }
				      }
				    },
				    {
				      loader: 'sass-loader' // compiles SASS to CSS
				    }
		    	 ]
		  	},
  		{	
			test:/\.css$/,
			use:[
				"style-loader",
				"css-loader"
				]
		},
		{
         test: /\.(woff|svg|ttf|eot|woff2)$/,
         exclude: [path.resolve(__dirname, "src/img"),path.resolve(__dirname, "node_modules")],
         use: [
         	'file-loader',
         ]         
       }]
	},
	plugins:[
		
		new HWP({
			template: './src/index.pug',
			filename: 'index.html'
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery'
		}),
		new HWP({
			filename: "index.html",
			template: './src/index.pug'
		})
	]
}