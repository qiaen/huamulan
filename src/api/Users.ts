import Http from '../utils/Http'

/** 获取用户列表 */
export const getList = (params: any) => Http.setPromise(`POST`, `/getUsers`, params)