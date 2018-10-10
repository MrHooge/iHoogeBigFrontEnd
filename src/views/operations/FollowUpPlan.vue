<template>

	<!-- 自动跟单 -->
	<div class="followup app-container">
		<div class="row">
			<el-input v-model="num"
			          placeholder="请输入跟单数"
			          style="width: 180px;"
			          type="number"
			          clearable></el-input>
			<el-input v-model="serial "
			          placeholder="请输入跟单编号"
			          style="width: 180px;margin-left:50px;"
			          type="number"
			          clearable></el-input>
			<div style="display:inline-block">
				<el-input v-model="interval"
				          placeholder="请输入跟单时间间隔"
				          style="width: 180px;margin-left:50px;"
				          type="number"
				          clearable></el-input> 秒</div>
			<el-button type="primary"
			           @click="automatic"
			           style="margin-left:50px;">自动跟单</el-button>
		</div>
	</div>
</template>

<script>
import { autoCopyPlan } from '@/api/sys_user'
import waves from '@/directive/waves/index.js' // 水波纹指令
import { Message } from 'element-ui'
import treeTable from '@/components/TreeTable'
import { getCookies, setCookies, removeCookies } from '@/utils/cookies'
export default {
	data() {
		return {
			num: "",
			serial: "",
			interval: ""
		};
	},
	methods: {
		automatic() {
			if (!this.num) {
				this.$message("请输入跟单数");
			} else if (!this.serial) {
				this.$message("请输入跟单编号");

			} else if (!this.interval) {
				this.$message("请输入跟单时间间隔");
			} else {
				let obj = {
					count: this.num || "",
					planNo: this.serial || "",
					time: this.interval || ""
				};
				autoCopyPlan(obj).then(res => {
					console.log(res)
					if (res.status == 200) {
						if (res.data.error_code == 200) {
							this.$message.success(res.data.message);
						} else if (res.data.error_code == 405) {
							this.$message.error(res.data.message);
						} else {
							this.$message.error(res.data.message);
						}
					}
				})
				// this.$http
				//   .get(api.lottery + "/lottery/autoCopyPlan", { params: obj })
				//   .then(res => {
				//     if (res.status == 200) {
				//             if(res.data.error_code==200){
				//                  this.$message(res.data.message); 
				//             }else if(res.data.error_code==405){
				//                 this.$message(res.data.message);
				//             }else{
				//                  this.$message(res.data.message);
				//             }
				//         }
				//   });
			}
		}
	}
};
</script>

<style scoped>
.row >>> input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  margin: 0;
}
</style>