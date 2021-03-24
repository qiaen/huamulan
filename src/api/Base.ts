import Http from '@units/Http'

// 获取用户信息
export const getUserInfo = (params) => Http.setPromise(`GET`, `/api/getUserInfo`, params)
// 通过类型获取可用数据源列表
export const getAvailableDataSource = (params) => Http.setPromise(`GET`, `/datasource/listAvailable`, params)
// 通过数据源表
export const getTablesBySourceId = (params) => Http.setPromise(`POST`, `/datasource/getTables`, params)
// 获取所有枚举接口
export const getAllEnum = (params) => Http.setPromise(`GET`, `/api/getAllEnum`, params)
// 获取源数据主题枚举
export const metadataSuperList = (params) => Http.setPromise(`POST`, `/api/hive-metadata/theme/superList`, params)