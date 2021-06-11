import { ref, reactive, computed } from 'vue'
import store from '../store/index'
/** 混入常用变量和方法，如分页相关方法，加载中，主表等 */
export default function setup(get: Function|void): object {
    /** 主表格数据，用来存放list数据 */
    let mainTable = ref([])
    /** 批量选择 */
    let mainSelected = ref([])
    /** 主表复选项变动 */
    function mainSelectionChange(rows: any) {
        mainSelected.value = rows
    }
    // let store = useStore()
    /** 表单分页信息, pageNo: 页码, total: 总数, pageSize: 每页数量, layout: 总数, layout: 支持功能, sizes: 可选分页*/
    let pageInfo = reactive( {
        // 当前查看的页码
        pageNo: 1,
        // 表总数量
        total: 0,
        // 每页数量，默认20
        pageSize: 20,
        // 分页组件支持的功能
        layout: 'total, sizes, prev, pager, next, jumper',
        // 可选择的分页数下拉选项
        sizes: [20, 50, 100, 200]
    })
    /** 主 加载中 */
    let xoading = ref(false)
    /** 初始化数据，重置页面为1，然后调用入参数get方法 */
    function init() {
        pageInfo.pageNo = 1
        get && get()
    }
    /** 每页数量变动，初始化到第一页开始加载 */
    function sizeChange(val: number) {
        pageInfo.pageNo = 1
        pageInfo.pageSize = val
        init()
    }
    /** 切换页码 */
    function pageChange(val: number) {
        pageInfo.pageNo = val
        get && get()
    }
    /** 接口枚举 */
    const serviceEnum: any = computed(() => store.getters.serviceEnum)
    /** 匹配枚举 返回label  this.matchEnum('PULL_INCRE_TYPE', 'day_all') */
    function matchEnum(type: string, key: string) {
        let enums = serviceEnum.value[type]
        let MN = ''
        if (enums) {
            for (let {name, value} of enums) {
                if (value == key) {
                    MN = name
                    break
                }
            }
        }
        return MN
    }
    
    return {
        mainTable,
        mainSelected,
        mainSelectionChange,
        pageInfo,
        sizeChange,
        pageChange,
        init,
        xoading,
        serviceEnum,
        matchEnum
    }
}