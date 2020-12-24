import TileWMS from 'ol/source/TileWMS'
import Tile from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'

/**
 * 根据id查找对应的图层
 * @param {*} map  地图实例
 * @param {*} id  图层id
 */
const findLayerById = (map, id) => {
	const layerArray = map.getLayers().array_
	let layer
	if (layerArray.length > 0) {
		layerArray.forEach((item) => {
			if (item.values_.id === id) {
				layer = item
			}
		})
	}
	return layer
}

/**
 * 添加图层到地图中
 * @param {*} map 地图实例对象
 * @param {*} param 服务参数
 * @param {*} type 服务类型
 */
const addLayer = (map, param, type) => {
	switch (type) {
		case 'WMS': {
			addWMSTileLayer(map, param)
			break
		}
		case 'XYZ': {
			addXYZLayer(map, param)
			break
		}
		default:
			return
	}
}

const addXYZLayer = (map, param) => {
	const { url, id, visible } = param
	const xyzLayer = new Tile({
		id,
		visible,
		source: new XYZ({
			url,
		}),
	})
	map.addLayer(xyzLayer)
}

/**
 * 创建图层
 * @param {*} param
 * @param {*} type
 */
const createLayer = (param, type) => {
	let resLayer
	switch (type) {
		case 'WMS': {
			resLayer = createWMSTileLayer(param)
			break
		}
		case 'XYZ': {
			resLayer = createXYZLayer(param)
			break
		}
		default:
			return
	}
	return resLayer
}

/**
 * 创建xyzLayer
 * @param {*} param
 */
const createXYZLayer = (param) => {
	const { url, id, visible } = param
	const xyzLayer = new Tile({
		id,
		visible,
		source: new XYZ({
			url,
		}),
	})
	return xyzLayer
}

/**
 * 创建WMSTileLayer图层
 * @param {*} param
 */
const createWMSTileLayer = (param) => {
	const { url, options, id } = param
	const wmsTileLayer = new Tile({
		id,
		visible: param.visible,
		source: new TileWMS({
			url,
			params: options,
		}),
	})
	return wmsTileLayer
}

/**
 * 添加WMS服务到地图中
 * @param {*} map 地图实例对象
 * @param {*} param 服务参数
 */
const addWMSTileLayer = (map, param) => {
	const { url, options, id } = param
	const wmsTileLayer = new Tile({
		id,
		visible: param.visible,
		source: new TileWMS({
			url,
			params: options,
		}),
	})
	map.addLayer(wmsTileLayer)
}
export default {
	findLayerById,
	addLayer,
	createLayer,
}
