<template>
	<div name="" id="map"></div>
</template>

<script>
import { Map, View } from 'ol'
// import TileLayer from 'ol/layer/Tile'
// import XYZ from 'ol/source/XYZ'
import { fromLonLat } from 'ol/proj'
import { defaults } from 'ol/control'

export default {
	name: 'MapInit',
	data() {
		return {
			map: {},
		}
	},
	methods: {
		/**
		 * 地图初识化方法
		 */
		mapInit() {
			const map = new Map({
				target: 'map',
				layers: [
					// new TileLayer({
					// 	source: new XYZ({
					// 		url:
					// 			'https://mt1.google.cn/vt/lyrs=y@113&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=',
					// 	}),
					// 	visible: true,
					// 	id: 'baseLayer',
					// }),
				],
				view: new View({
					center: fromLonLat([108.13580457448796, 34.3243210417221]),
					zoom: 12,
				}),
				controls: defaults({ zoom: false }),
			})
			this.map = map
		},
	},
	mounted: function() {
		// 初识化地图
		this.mapInit()
	},
}
</script>

<style scoped>
#map {
	height: 100%;
}
</style>
