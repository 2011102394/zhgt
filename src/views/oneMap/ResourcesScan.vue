<template>
	<div class="map-resource-container">
		<map-init ref="mapInit" />
		<layer-list-pan :map="map" v-if="mapInit" />
		<el-button type="primary" class="switch-bt" @click.stop="switchMode">{{show3D?'切换二维':'切换三维'}}</el-button>
	</div>
</template>

<script>
import MapInit from '../../components/gisTools/MapInit.vue'
import LayerListPan from './LayerListPan.vue'
import OLCesium from 'olcs/OLCesium.js'
import * as Cesium from 'cesium'
window.Cesium = Cesium
export default {
	name: 'ReourcesScan',
	components: {
		MapInit,
		LayerListPan,
	},
	methods:{
		switchMode(){
			const show3D = !this.show3D
			this.show3D = show3D
			this.ol3d.setEnabled(show3D)
		}
	},
	data() {
		return {
			map: {},
			// 地图实例初始化成功
			mapInit: false,
			// 显示三维
			show3D: false,
			// ol-cesium对象
			ol3d: undefined,
		}
	},
	mounted() {
		this.map = this.$refs.mapInit.map
		this.mapInit = true
		const ol3d = new OLCesium({ map: this.$refs.mapInit.map })
		this.ol3d = ol3d
		ol3d.setEnabled(false)
	},
}
</script>

<style scoped lang="less">
.map-resource-container {
	height: calc(~'100vh - 61px');
	.switch-bt {
		position: absolute;
		top: 70px;
		right: 100px;
	}
	.test-bt-2 {
		position: absolute;
		top: 200px;
		right: 100px;
	}
}
</style>
