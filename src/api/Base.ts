import Http from '../units/Http'

/** 获取用户信息 */
export const getUserInfo = (params: any) => Http.setPromise(`GET`, `/api/getUserInfo`, params)
/** 获取所有枚举接口 */
export const getAllEnum = (params: any) => Http.setPromise(`GET`, `/api/getAllEnum`, params)