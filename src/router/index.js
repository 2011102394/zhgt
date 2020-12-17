import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


// 定义路由
const routes = [
	{
		path: '/',
		redirect:'/oneMap/resourcesScan'
	},
	{
		path:'/oneMap',
		name:'OneMap',
		component:()=>import('../views/oneMap/OneMap.vue'),
		children:[
			{
				path:'/oneMap/resourcesScan',
				name:'ResourcesScan',
				component:()=>import('../views/oneMap/ResourcesScan.vue')
			},
			{
				path:'/oneMap/themeMap',
				name:'ThemeMap',
				component:()=>import('../views/oneMap/ThemeMap.vue')
			},
			{
				path:'/oneMap/ContrastiveAnalysis',
				name:'ContrastiveAnalysis',
				component:()=>import('../views/oneMap/ContrastiveAnalysis.vue')
			}
		]
	}
]

// 创建router实例
const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
})

export default router
