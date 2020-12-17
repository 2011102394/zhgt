const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
module.exports = {
	pages: {
		index: {
			// page 的入口
			entry: 'src/main.js',
			// 模板来源
			template: 'public/index.html',
			// 在 dist/index.html 的输出
			filename: 'index.html',
			// 当使用 title 选项时，
			// template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
			title: '智慧国土大数据展示平台数据',
			// 在这个页面中包含的块，默认情况下会包含
			// 提取出来的通用 chunk 和 vendor chunk。
			chunks: ['chunk-vendors', 'chunk-common', 'index'],
		},
	},
	devServer: {
		proxy: {
			'/geoserver': {
				target: 'http://localhost:8080/geoserver',
				ws: true,
				changeOrigin: true,
				pathRewrite: { '^/geoserver': '' },
			},
			'/arsc': {
				target: 'http://192.168.8.186:10007/arsc',
				ws: true,
				changeOrigin: true,
				pathRewrite: { '^/arsc': '' },
			},
		},
	},
	configureWebpack: {
		plugins: [
			// Copy Cesium Assets, Widgets, and Workers to a static directory
			new CopyWebpackPlugin({
				patterns: [
					{ from: 'node_modules/cesium/Build/Cesium/Workers', to: 'Workers' },
					{
						from: 'node_modules/cesium/Build/Cesium/ThirdParty',
						to: 'ThirdParty',
					},
					{ from: 'node_modules/cesium/Build/Cesium/Assets', to: 'Assets' },
					{ from: 'node_modules/cesium/Build/Cesium/Widgets', to: 'Widgets' },
				],
			}),
			new webpack.DefinePlugin({
				// Define relative base path in cesium for loading assets
				CESIUM_BASE_URL: JSON.stringify('/'),
			}),
		],
		module: {
			// Removes these errors: "Critical dependency: require function is used in a way in which dependencies cannot be statically extracted"
			// https://github.com/AnalyticalGraphicsInc/cesium-webpack-example/issues/6
			unknownContextCritical: false,
			unknownContextRegExp: /\/cesium\/cesium\/Source\/Core\/buildModuleUrl\.js/,
		},
	},
}
