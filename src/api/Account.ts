import Http from '../units/Http'

/** 登录 */
export const login = (params: any) => Http.setPromise(`POST`, `/api/login`, params)