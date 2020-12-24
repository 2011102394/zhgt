const baseMapUrls = [
	{
		id: 'vec',
		name: '地图',
		url:
			'https://mt1.google.cn/vt/lyrs=m@113&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=',
    visible: true,
    type:'XYZ'
	},
	{
		id: 'img',
		name: '影像',
		url:
			'https://mt1.google.cn/vt/lyrs=y@113&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=',
    visible: false,
    type:'XYZ'
	},
	{
		id: 'ter',
		name: '遥感',
		url:
			'/arsc/%E6%99%BA%E6%85%A7%E5%9B%BD%E5%9C%9F%E5%A4%A7%E6%95%B0%E6%8D%AE%E5%B1%95%E7%A4%BA%E5%B9%B3%E5%8F%B0/wms',
    visible: false,
    options:{
      "LAYERS": "智慧国土大数据展示平台:610431BJ2DOM1",
    },
    type:'WMS'
	},
]

export default {baseMapUrls}
