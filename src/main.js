import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import 'ol/ol.css'
import less from 'less'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import "cesium/Build/Cesium/Widgets/widgets.css";
Vue.config.productionTip = false
Vue.use(less)
Vue.use(ElementUI)
new Vue({
	router,
	render: (h) => h(App),
}).$mount('#app')
