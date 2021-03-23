<!--
 * @Author: your name
 * @Date: 2021-02-04 15:01:14
 * @LastEditTime: 2021-03-02 15:52:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue3-ts/src/components/ElementView.vue
-->
<template>
  <section>
    <el-button type="primary" size="small" @click="addTable">nihao</el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="age" label="年龄" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>
  </section>
</template>

<script lang="ts">
import { ref, defineComponent, reactive, getCurrentInstance } from "vue";
import { Person } from "./Interface";
enum status{
  /**失败*/
    error=100,
    /**成功 */
    success=200,
    running
}
export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: {
      type: String,
      required: true,
    },
  },
  setup: () => {
    const tableData: Person[] = reactive([]);
    function addTable() {
      tableData.push({
        date: "2020-12-01",
        name: "Lili",
        age: 12,
        sex: 1,
        address: "Jinrongjie Center",
      });
    }
    const {ctx} = getCurrentInstance()
    console.log(getCurrentInstance())
    ctx.$message("mesage")
    return { tableData, addTable };
  },
});
</script>

<style scoped>
a {
  color: #42b983;
}
</style>