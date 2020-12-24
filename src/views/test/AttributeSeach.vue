<template>
	<div class="map-init-container">
		<map-init ref="mapInit" />
	</div>
</template>

<script>
import MapInit from '../../components/gisTools/MapInit.vue'
import MapUtil from '../../utils/map/mapUtils'
import axios from 'axios'
import GeoJSON from 'ol/format/GeoJSON'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
export default {
	components: { MapInit },
	name: 'AttributeSearch',
	data() {
		return {
			map: {},
			vectorLayer: {},
		}
	},
	mounted: function() {
		const map = this.$refs.mapInit.map
		this.map = map
    map.getView().setZoom(4)
    // 添加地图
		this.addLayer(map)
		map.on('click', function(e) {
      const vectorLayer = this.vectorLayer
      if(vectorLayer){
        map.removeLayer(vectorLayer)
      }
			const targetLayer = map.getLayers().array_[1]
			const view = map.getView()
			const viewResolution = view.getResolution()
			const url = targetLayer
				.getSource()
				.getFeatureInfoUrl(e.coordinate, viewResolution, view.getProjection(), {
					INFO_FORMAT: 'application/json',
				})
			axios.get(url).then((res) => {
        
				const geoJsonReader = new GeoJSON()
        const feature = geoJsonReader.readFeatures(res.data.features[0])
        console.log(feature)
        const vecotrLayer = new VectorLayer()
        const vectorSource = new VectorSource({ features: feature })
        vecotrLayer.setSource(vectorSource)
        this.vectorLayer = vecotrLayer
        map.addLayer(vecotrLayer)
			})
		})
	},
	methods: {
		addLayer(map) {
			const params = {
				url: '/geoserver/arsc/wms',
				options: {
					VERSION: '1.1.1',
					STYLES: '',
					LAYERS: 'arsc:china_boundary',
					exceptions: 'application/vnd.ogc.se_inimage',
				},
			}
			MapUtil.addLayer(map, params, 'WMS')
		},
		identifyQuery() {},
	},
}
</script>

<style lang="less" scoped>
.map-init-container {
	height: calc(~'100vh - 61px');
}
</style>
