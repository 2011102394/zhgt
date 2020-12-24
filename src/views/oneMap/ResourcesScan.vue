<template>
	<div class="map-resource-container">
		<map-init ref="mapInit" />
		<layer-list-pan :map="map" v-if="mapInit" />
		<popup-content :map="map" v-if="mapInit" />
		<switch-base-map class="switch-base-container" :map="map" v-if="mapInit"/>
	</div>
</template>

<script>
import MapInit from '../../components/gisTools/MapInit.vue'
import LayerListPan from './LayerListPan.vue'
import GeoJSON from 'ol/format/GeoJSON'
import axios from 'axios'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import PopupContent from './PopupContent.vue'
import Pubsub from 'pubsub-js'
import SwitchBaseMap from '../../components/gisTools/switchBaseMap/SwitchBaseMap.vue'
export const pubsubID = 'popup-content'
export default {
	name: 'ReourcesScan',
	components: {
		MapInit,
		LayerListPan,
		PopupContent,
		SwitchBaseMap,
	},
	data() {
		return {
			map: {},
			// 地图实例初始化成功
			mapInit: false,
			// 点选绘制的图层
			vectorLayer: undefined,
			// 弹窗的dom元素
			popup: undefined,
		}
	},
	mounted() {
		this.map = this.$refs.mapInit.map
		this.mapInit = true
		this.identifyQuery()
	},
	methods: {
		identifyQuery() {
			const map = this.map
			map.on('click', function(e) {
				const overlay = map.getOverlayById('attr-popup')
				// 关闭弹窗
				overlay.setPosition(undefined)
				const vectorLayer = this.vectorLayer
				if (vectorLayer) {
					map.removeLayer(vectorLayer)
				}
				const layers = map.getLayers().array_.concat()
				layers.reverse().pop()
				let targetLayer
				for (let i = 0; i < layers.length; i++) {
					if (layers[i].values_.visible) {
						targetLayer = layers[i]
						break
					}
				}
				if (!targetLayer) {
					return
				}
				const view = map.getView()
				const viewResolution = view.getResolution()
				const url = targetLayer
					.getSource()
					.getFeatureInfoUrl(
						e.coordinate,
						viewResolution,
						view.getProjection(),
						{
							INFO_FORMAT: 'application/json',
						}
					)
				axios.get(url).then((res) => {
					const geoJsonReader = new GeoJSON()
					if (res.data.features[0]) {
						const feature = geoJsonReader.readFeatures(res.data.features[0])
						const properties = res.data.features[0].properties
						Pubsub.publish(pubsubID, properties)
						const vecotrLayer = new VectorLayer()
						const vectorSource = new VectorSource({ features: feature })
						vecotrLayer.setSource(vectorSource)
						this.vectorLayer = vecotrLayer
						map.addLayer(vecotrLayer)
						// 显示弹窗
						overlay.setPosition(e.coordinate)
					}
				})
			})
		},
	},
}
</script>

<style scoped lang="less">
.map-resource-container {
	height: calc(~'100vh - 61px');
	.switch-base-container{
		position: absolute;
		right: 24px;
		bottom: 20px;
	}
}
</style>
