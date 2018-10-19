<template>
	<div class="backend app-container">
		<div class="layerbody">
			<span style="font-size:14px;color:red">注：书写格式为“用户名：金额”；例：喜塔腊：50（标点符号必须为中文标点符号）</span>
			<div class="main">
				   <el-input
					type="textarea"
					:rows="1"
					placeholder="请输入内容"
					v-model="textarea" clearable>
					</el-input>
					<el-button type="primary"
				           icon="el-icon-search"
				           @click="makersure"
						   style="margin-top:20px;margin-left:700px">彩金赠送</el-button>	
			</div>
		</div>
	</div>
</template>

<script>
import { findAllMember, presentes } from '@/api/sys_user'
import waves from '@/directive/waves/index.js' // 水波纹指令
import { Message } from 'element-ui'
import treeTable from '@/components/TreeTable'
import { getCookies, setCookies, removeCookies } from '@/utils/cookies'
export default {    
	data() {
		return {
			textarea:'',
		}
	},
	methods: {
		//将字符串转化为对象的方法
		StringtoObject(messagetext){
			const a = arg => arg.split('，');
			const b = arg => arg.join('：');
			const c = arg => arg.split('：');			

			const d = arg => arg.reduce((prev,val) => {
				if(prev.length) {
					const i = prev.length-1;
					if(prev[i] && ! Object.values(prev[i])
					[0]){
						const key = Object.keys(prev[i]).join('');
						prev[i][key] = val;

					}else prev.push({[val]:void(0)})
					return prev
				}
				prev.push({[val]:void(0)})
				return prev
			},[])
			const h = (...args) => arg => args.reduce((a,b) => (...args) => b(a(arg)))()
			const fn = h(a,b,c,d);
			return fn(messagetext)
		},
		makersure() {
			let params = this.StringtoObject(this.textarea)
			let userName = getCookies('name')
			if (this.textarea == '') {
				Message.success('请输入内容')
				return
			} else {
				presentes(userName,JSON.stringify(params)).then(res => {
					if (res.data.error_code = 200) {
						Message.success(res.data.message)
						this.input = ''
					} else {
						Message.success(res.data.message)
					}
				})
			 }
		},
	}
}
</script>

<style scoped>
.layerbody >>> .el-textarea__inner{
    min-height: 40px !important;
}
.main {
  margin-top: 30px;
}
</style>
