<template>
	<div class="map-container">
		<map-init ref="mapInit" />
	</div>
</template>

<script>
import MapInit from '../../components/gisTools/MapInit.vue'
import VectorLayer from 'ol/layer/Vector'
import { Vector as VectorSource } from 'ol/source'
import GeoJSON from 'ol/format/GeoJSON'
import PointData from './data/demo-label-style-line.js'
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style'
import {fromLonLat} from 'ol/proj'

const image = new CircleStyle({
	radius: 5,
	fill: null,
	stroke: new Stroke({ color: 'red', width: 1 }),
})
const styles = {
	Point: new Style({
		image: image,
	}),
	LineString: new Style({
		stroke: new Stroke({
			color: 'green',
			width: 10,
		}),
	}),
	MultiLineString: new Style({
		stroke: new Stroke({
			color: 'green',
			width: 1,
		}),
	}),
	MultiPoint: new Style({
		image: image,
	}),
	MultiPolygon: new Style({
		stroke: new Stroke({
			color: 'yellow',
			width: 1,
		}),
		fill: new Fill({
			color: 'rgba(255, 255, 0, 0.1)',
		}),
	}),
	Polygon: new Style({
		stroke: new Stroke({
			color: 'blue',
			lineDash: [4],
			width: 3,
		}),
		fill: new Fill({
			color: 'rgba(0, 0, 255, 0.1)',
		}),
	}),
	GeometryCollection: new Style({
		stroke: new Stroke({
			color: 'magenta',
			width: 2,
		}),
		fill: new Fill({
			color: 'magenta',
		}),
		image: new CircleStyle({
			radius: 10,
			fill: null,
			stroke: new Stroke({
				color: 'magenta',
			}),
		}),
	}),
	Circle: new Style({
		stroke: new Stroke({
			color: 'red',
			width: 2,
		}),
		fill: new Fill({
			color: 'rgba(255,0,0,0.2)',
		}),
	}),
}

const styleFunction = function(feature) {
	return styles[feature.getGeometry().getType()]
}
export default {
	name: 'PointDemo',
	mounted: function() {
		const map = this.$refs.mapInit.map
		const vectorSource = new VectorSource({
			features: new GeoJSON().readFeatures(PointData.pointData),
		})
		const vecLayer = new VectorLayer({
      zIndex:100,
			source: vectorSource,
			style: styleFunction,
    })
		map.addLayer(vecLayer)
		const view = map.getView()
		const center = view.getCenter()
		const centerTransform = fromLonLat(center,'EPSG:4326')
		console.log(centerTransform)
		console.log(view)
	},
	components: {
		MapInit,
	},
}
</script>

<style scoped lang="less">
.map-container {
	height: calc(~'100vh - 61px');
}
</style>
