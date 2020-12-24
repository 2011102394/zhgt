<template>
	<div id="popup">
		<ul class="row-container">
			<li v-for="(value, key, index) in popupContent" :key="index" class="row">
				<div class="label">{{ key }}</div>
				<div class="value">{{ value }}</div>
			</li>
		</ul>
	</div>
</template>

<script>
import Overlay from 'ol/Overlay'
import Pubsub from 'pubsub-js'
import { pubsubID } from './ResourcesScan'
export default {
	name: 'PopupContent',
	props: {
		map: {
			type: Object,
		},
	},
	data() {
		return {
			popupContent: {},
		}
	},
	mounted: function() {
		const container = document.getElementById('popup')
		// 渲染弹窗
		this.renderPopup()
		const overlay = new Overlay({
			id: 'attr-popup',
			element: container,
			positioning: 'bottom-center',
			stopEvent: true,
			offset: [0, 0],
			autoPan: true,
		})
		this.map.addOverlay(overlay)
	},
	methods: {
		renderPopup() {
			Pubsub.subscribe(pubsubID, (msg, data) => {
				this.popupContent = data
			})
		},
	},
}
</script>

<style scoped lang="less">
#popup {
	max-height: 300px;
	overflow-y: auto;
	padding: 3px;
	display: flex;
	flex-direction: column;
	margin: 30px;
	margin-top: 0px;
	margin-bottom: 30px;
	width: 280px;
	box-shadow: 0px 0px 80px rgba(10, 100, 150, 1) inset;
	background: linear-gradient(
				to left,
				rgba(255, 255, 255, 1),
				rgba(255, 255, 255, 1)
			)
			left top no-repeat,
		linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 1))
			left top no-repeat,
		linear-gradient(to left, rgba(255, 255, 255, 1), rgba(255, 255, 255, 1))
			right top no-repeat,
		linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 1))
			right top no-repeat,
		linear-gradient(to left, rgba(255, 255, 255, 1), rgba(255, 255, 255, 1))
			left bottom no-repeat,
		linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 1))
			left bottom no-repeat,
		linear-gradient(to left, rgba(255, 255, 255, 1), rgba(255, 255, 255, 1))
			right bottom no-repeat,
		linear-gradient(to left, rgba(255, 255, 255, 1), rgba(255, 255, 255, 1))
			right bottom no-repeat;
	background-size: 3px 20px, 20px 3px, 3px 20px, 20px 3px;
	color: #fff;
	.row-container {
		padding: 0px 0px 0px 12px !important;
		.row {
			width: 100%;
			display: flex;
			flex-direction: row;
			.label {
				width: 50%;
				text-align: left;
			}
			.value {
				width: 50%;
				text-align: left;
				margin-left: 20px;
			}
		}
	}
}
</style>
