<template>
	<div class="switch-base-map-container">
		<div
			:class="hightLight === 'vec' ? 'hight-border child-row' : 'child-row'"
			@click="switchBaseLayer('vec')"
		>
			<img src="./img/vec.jpg" alt="地图" title="地图" />
			<div>地图</div>
		</div>
		<div
			:class="hightLight === 'img' ? 'hight-border child-row' : 'child-row'"
			class="child-row"
			@click="switchBaseLayer('img')"
		>
			<img src="./img/img.jpg" alt="影像" title="影像" />
			<div>影像</div>
		</div>
		<div
			:class="hightLight === 'ter' ? 'hight-border child-row' : 'child-row'"
			class="child-row"
			@click="switchBaseLayer('ter')"
		>
			<img src="./img/ter.jpg" alt="遥感" title="遥感" />
			<div>遥感</div>
		</div>
	</div>
</template>

<script>
import config from './config'
import mapUtils from '../../../utils/map/mapUtils'
export default {
	name: 'SwithBaseMap',
	data() {
		return {
			hightLight: 'vec',
		}
	},
	props: {
		// map 对象
		map: {
			type: Object,
		},
	},
	methods: {
		switchBaseLayer(e) {
			this.hightLight = e
			// 查询点击的图层
			const arr = ['vec', 'img', 'ter']
			arr.splice(arr.indexOf(e), 1)
			arr.forEach((item) => {
				mapUtils.findLayerById(this.map, item).setVisible(false)
			})
			mapUtils.findLayerById(this.map, e).setVisible(true)
		},
		baseMapInit() {
			const layerConfigs = config.baseMapUrls
			layerConfigs.forEach((item) => {
				mapUtils.addLayer(this.map, item, item.type)
			})
		},
	},
	mounted: function() {
		// 加载底图
		this.baseMapInit()
	},
}
</script>

<style lang="less" scoped>
.switch-base-map-container {
	display: flex;
	flex-direction: row;
	.child-row {
		display: flex;
		margin-left: 8px;
		flex-direction: column;
		background-color: #fff;
		font-size: 10px;
		:hover {
			cursor: pointer;
		}
	}
	.hight-border {
		border: 1px solid #1890ff;
		color: #1890ff;
	}
}
</style>
