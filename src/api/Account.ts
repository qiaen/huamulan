import Http from '@utils/Http'

/** 登录 */
export const login = (params: any) => Http.setPromise(`POST`, `/login`, params)