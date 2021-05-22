import Http from '../utils/Http'

/** 获取作业列表 */
export const jobList = (params: any) => Http.setPromise(`GET`, `/jobList`, params)