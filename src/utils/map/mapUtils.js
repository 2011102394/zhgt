import TileWMS from 'ol/source/TileWMS'
import Tile from 'ol/layer/Tile'

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
		default:
			return
	}
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
		visible:param.visible,
		source:new TileWMS({
			url,
			params:options
		})
	})
	map.addLayer(wmsTileLayer)
}
export default {
	findLayerById,
	addLayer,
}
