<!-- 修改作业运维状态 -->
<template>
	<el-dialog title="状态修改" v-model="dialog.changeStatus" custom-class="zm-dialog task-status" width="500px" append-to-body>
		<section>
			<el-form ref="elform" :model="form" :rules="rules" size="small" label-width="90px">
				<el-form-item label="用户状态" prop="status">
					<el-radio-group v-model="form.status">
						<el-radio :label="0">禁用</el-radio>
						<el-radio :label="1">启用</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="" class="">
					<p class="lineh16 fc999 fsize13">
						i.不会检查当前用户状态，强制修改
					</p>
					<p class="lineh16 fc999 fsize13">
						ii.相同状态不会重复修改
					</p>
					<p class="lineh16 fc999 fsize13">
						iii.管理员帐号例外，将会被跳过
					</p>
				</el-form-item>
				<el-form-item label=" " class="txright">
					<el-button @click="dialog.changeStatus = false">取 消</el-button>
					<el-button @click="submit" type="primary" icon="el-icon-s-promotion">确定</el-button>
				</el-form-item>
			</el-form>
		</section>
	</el-dialog>
</template>
<script lang="ts">
import { reactive, ref, watch } from 'vue'
export default {
	props: ['loading', 'dialog'],
	name: 'change-status',
	setup(props, ctx) {
        /** 注意大小写 */
        const elform: any = ref(null)
        /** 校验规则 */
        let rules = reactive({
            status: { required: true, message: '请选择状态', trigger: 'change' }
        })
        /** 储存表单数据 */
        let form = reactive({
            status: null
        })
        /** 提交 */
        function submit() {
            elform.value.validate((valid: boolean) => {
                if (valid) {
                    ctx.emit('changeStatus', form.status)
                } else {}
            })
        }
        watch(()=> props.dialog.changeStatus, (val: boolean)=>{
            if(val) {
                // form.status = null
                // console.log(elform.value)
                elform.value && elform.value.resetFields()
            }
        })
		return {
			form,
			rules,
            submit,
            elform
		}
	}
}
</script>
<style lang="less">
.task-status {
	.el-form {
		padding: 15px 8%;
	}
	// 第三个，文字提示
	.el-form-item--small.el-form-item:nth-child(2) .el-form-item__content {
		margin-left: 40px !important
	}
	.el-form-item--small.el-form-item:last-child {
		margin-bottom: 0px;
		margin-top: 30px;
	}
}
</style>