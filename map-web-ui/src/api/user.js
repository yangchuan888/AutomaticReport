import {request} from '../utils/request'

export const requestLogin = params => {
  return request('/abc/user/login', params)
}
// 树形 
export const tree = params => {
  return request('/abc/map/catalog/tree', params)
}
export const saveAs = params => {
  return request('/abc/map/catalog/save', params)
}
