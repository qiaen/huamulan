import Http from '../units/Http'

/** 获取用户列表 */
export const getList = (params: any) => Http.setPromise(`POST`, `/getUsers`, params)