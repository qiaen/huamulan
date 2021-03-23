/*
 * @Author: Teemo
 * @Date: 2021-02-04 15:38:05
 * @LastEditTime: 2021-03-02 15:45:06
 * @LastEditors: Please set LastEditors
 * @Description: null
 * @FilePath: /vue3-ts/src/components/Interface.ts
 */
/** 0: girl, 1: boy */
enum status{
    error = 100,
    success = 200
}
console.log('------')
console.log(status)
type Sex = 0|1
/** 列表人员信息 */
export interface Person {
    /** 日期 */
    date: string;
    /** 姓名 */
    name: string;
    /** 年龄 */
    age?: number;
    sex: Sex;
    /** 地址 */
    address: string;
}
