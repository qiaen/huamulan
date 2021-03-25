import Http from '../units/Http'
// 获取运维列表
export const getList = (params: any) => Http.setPromise(`POST`, `/api/getUsers`, params)