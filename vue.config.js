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
			// '/geoserver': {
			// 	target: 'http://localhost:8080/geoserver',
			// 	ws: true,
			// 	changeOrigin: true,
			// 	pathRewrite: {'^/geoserver': ''}
			// },
			'/arsc': {
				target: 'http://192.168.8.21:8080/arsc',
				ws: true,
				changeOrigin: true,
				pathRewrite: {'^/arsc': ''}
			},
		},
	},
}
