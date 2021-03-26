// 用来解决在ts文件中importxxx.vue文件vscode错误提示了异常的问题
declare module "*.vue" {
    import Vue from 'vue'
    export default Vue
}