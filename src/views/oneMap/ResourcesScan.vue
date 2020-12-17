<template>
	<div class="map-resource-container">
		<map-init ref="mapInit" />
		<layer-list-pan :map="map" v-if="mapInit" />
	</div>
</template>

<script>
import MapInit from '../../components/gisTools/MapInit.vue'
import LayerListPan from './LayerListPan.vue'
export default {
	name: 'ReourcesScan',
	components: {
		MapInit,
		LayerListPan,
	},
	data() {
		return {
			map: {},
			// 地图实例初始化成功
			mapInit: false,
		}
	},
	mounted() {
		this.map = this.$refs.mapInit.map
		this.mapInit = true
	},
}
</script>

<style scoped lang="less">
.map-resource-container {
	height: calc(~'100vh - 61px');
	.test-bt {
		position: absolute;
		top: 100px;
		right: 100px;
	}
	.test-bt-2 {
		position: absolute;
		top: 200px;
		right: 100px;
	}
}
</style>
