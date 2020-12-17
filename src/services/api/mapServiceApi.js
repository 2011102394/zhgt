import axios from 'axios'

/**
 * 查询地图服务列表
 */
export async function queryMapServiceList(){
  const url = '/data/index.json'
  return axios.get(url)
}