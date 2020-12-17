<template>
	<div id="viewer"></div>
</template>

<script>
import * as Cesium from 'cesium'
export default {
	name: 'ViewerInit',
	methods: {
		init() {
			const viewer = new Cesium.Viewer('viewer')

			const imageryLayers = viewer.imageryLayers

			const googleMap = new Cesium.UrlTemplateImageryProvider({
				url: 'http://www.google.com/maps/vt?lyrs=s@716&x={x}&y={y}&z={z}',
			})

			imageryLayers.addImageryProvider(googleMap)

			// fly
			viewer.camera.flyTo({
				destination: Cesium.Cartesian3.fromDegrees(
					114.296063,
					30.55245,
					20000000
				),
				orientation: {
					heading: Cesium.Math.toRadians(0),
					pitch: Cesium.Math.toRadians(-90),
					roll: 0.0,
				},
				duration: 10, // fly time 10s
			})
		},
	},
	mounted: function() {
    this.init()
  },
}
</script>

<style lang="less">
.viewer {
	height: calc(~'100vh - 61px');
}
</style>
