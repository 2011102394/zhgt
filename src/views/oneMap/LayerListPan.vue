<template>
	<div class="lists" :style="{ height: '80%' }">
		<div class="topic title">
			<div
				style="
          margin-right: 10px;
          font-size: 20px;
          font-weight: bold;
          line-height: 30px;
          margin-top:10px;
        "
			>
				资源目录
			</div>
		</div>
		<div class="tree">
			<el-tree
				:data="list"
				ref="rightsTree"
				node-key="id"
				show-checkbox
				default-expand-all
				:default-checked-keys="defaultChecked"
				@node-click="handleNodeClick"
				@check="handleNodeClick"
			></el-tree>
		</div>
	</div>
</template>

<script>
import { queryMapServiceList } from '../../services/api/mapServiceApi'
import MapUtil from '../../utils/map/mapUtils'
export default {
	name: 'LayerListPan',
	props: {
		map: {
			type: Object,
		},
	},
	data() {
		return {
			list: [],
			defaultChecked: [],
		}
	},

	methods: {
		handleNodeClick(data) {
			this.defaultChecked = []
			const id = data.id
			let addOrRemove
			const list = this.list
			for (let i = 0; i < list.length; i++) {
				const children = list[i].children
				children.forEach((child) => {
					if (child.id === id) {
						addOrRemove = child.checked = !child.checked
					}
				})
			}
			const map = this.map 
			const layers = map.getLayers();
			layers.array_[id].setVisible(addOrRemove)
		},
	},
	created: function() {
		// 获取资源目录树
		queryMapServiceList().then((res) => {
			const list = res.data.data
			const map = this.map
			const url =
				'/arsc/%E6%99%BA%E6%85%A7%E5%9B%BD%E5%9C%9F%E5%A4%A7%E6%95%B0%E6%8D%AE%E5%B1%95%E7%A4%BA%E5%B9%B3%E5%8F%B0/wms'
			// 加载图层
			for (let i = 0; i < list.length; i++) {
				const children = list[i].children
				children.forEach((child) => {
					const params = {
						id: child.id,
						url: url,
						visible: child.checked,
						options: {
							LAYERS: child.LAYERS,
						},
					}
					MapUtil.addLayer(map, params, 'WMS')
				})
			}
			this.list = res.data.data
		})
	},
}
</script>

<style>
.lists {
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	box-shadow: 5px 5px 5px #000000;
	position: absolute;
	text-align: center;
	top: 8%;
	left: 1%;
	font-size: 35px;
	color: white;
	background-color: rgba(0, 100, 200, 0.7);
	height: 80%;
	width: 15%;
}

.tree {
	height: 93.5%;
	overflow-y: scroll;
}
.content .title {
	display: flex;
	justify-content: center;
}
.title div {
	font-size: 30px;
	margin-bottom: 10px;
}

.el-tree {
	color: rgba(255, 255, 255, 1);
	background: transparent;
}
.el-tree-node__content {
	background-color: rgba(100, 100, 100, 0.5);
	color: #fff;
	border: 1px solid black;
}
.el-tree-node__content:hover {
	background-color: #3274e6;
	color: #fff;
}
/* 设置三角形图标的颜色 */
.el-tree-node__expand-icon {
	color: #fff;
}
/* 改变被点击节点背景颜色，字体颜色 */
.el-tree-node:focus > .el-tree-node__content {
	background-color: #3274e6;
	color: #fff;
}
/* 设置节点鼠标悬浮三角图标鼠标悬浮的颜色 */
.el-tree-node__content:hover .el-tree-node__expand-icon {
	color: #000;
}
.el-checkbox .el-checkbox__inner {
	display: none;
}
div[role='group'] .el-checkbox .el-checkbox__inner {
	display: inline-block;
}
/* 滚动条样式 */
::-webkit-scrollbar {
	width: 0.5rem;
	height: 0.5rem;
	background: hsla(0, 0%, 100%, 0.6);
}

::-webkit-scrollbar-track {
	border-radius: 0;
}
::-webkit-scrollbar-thumb {
	border-radius: 0;
	background-color: rgba(95, 95, 95, 0.4);
	transition: all 0.2s;
	border-radius: 0.5rem;
}
</style>
