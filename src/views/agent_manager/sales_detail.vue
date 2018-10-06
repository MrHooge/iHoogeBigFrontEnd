<!-- 业绩明细 -->
<template>
    <div class="sales_detail" style="padding:0 20px">
        <!-- 搜索 -->
        <div class="row">
            <el-input placeholder="请输入账号" v-model="account" style="width: 300px;margin-right:100px;" clearable></el-input>
            <el-input placeholder="请输入昵称" v-model="username" style="width: 300px;margin-right:100px;" clearable></el-input>
            <el-select v-model="isMOuth" placeholder="请选择时间段" style="margin-right:100px;">
                <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            <el-button type="primary" @click="search" @keyup.13="getone" style="margin-left:100px;">搜索</el-button>
            <el-button type="success" @click="exportSome" style="margin-left:50px;">导出</el-button>
            <p class="taost">
                注:老销售使用sj查询，新销售使用昵称查询，本表格只支持查询单个代理人员七天或当月的数据
            </p>
        </div>
        <el-table
            :data="tableData"
            border
            show-summary
            style="width: 100%;">
            <el-table-column
                    label="日期"
                    prop="date"
                    align="center">
            </el-table-column>
            <el-table-column
                    label="开户数"
                    prop="accountNum"
                    align="center">
                    
            </el-table-column>
            <el-table-column
                    label="激活数"
                    prop="activeNum"
                    align="center">
            </el-table-column>
            <el-table-column
                    label="消费数(个)"
                    prop="allPayNum"
                    align="center">
            </el-table-column>
            <el-table-column
                    label="竞彩"
                    prop="allBuy"
                    align="center"> 
            </el-table-column>
                <el-table-column
                    label="自购(金额)"
                    prop="selfBuy"
                    align="center">
            </el-table-column>
            <el-table-column
                    label="跟单(金额)"
                    prop="fllowBuy"
                    align="center">
            </el-table-column>
            <el-table-column
                    label="北单(金额)"
                    prop="beidan"
                    align="center">
            </el-table-column>
            <el-table-column
                    label="老足彩(金额)"
                    prop="laozhucai"
                    align="center">
            </el-table-column>
            <el-table-column
                    label="数字(金额)"
                    prop="shuzi"
                    align="center">
            </el-table-column>
                <el-table-column
                    label="扣减(金额)"
                    prop="offer"
                    align="center">
            </el-table-column>  
            <el-table-column
                    label="佣金(金额)"
                    prop="commision"
                    align="center">
                    <template slot-scope="scope">
                    <span >{{ scope.row.sumCommision | sumCommision }}</span>
                    </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>

import { Message, MessageBox } from 'element-ui'
import { findAllMember} from '@/api/customer'
import { findAgentInfoByAccount, exportExcle } from '@/api/sys_user'
export default {
    data() {
        return {
            tableData: [],
            account: '', // 用户名
            options1: [
                {
                    value: '1',
                    label: '七天'
                },
                {
                    value: '0',
                    label: '当前月'
                }
            ],
            isMOuth:'1',
            pageCurr:1,
            pages:20,
            stime:'',
            etime:'',
            datetime: '', // 获取的日期和时间
            newarr: [],
            username: '',   //输入想搜索的昵称
        }
    },
    created(){
        this.getTableList(this.account,this.isMOuth)
    },
    filters: {
        sumCommision(sum){
            return sum ? sum : 0
        }
    },
    methods: {
        //查询
        search() {
            if (!this.account && !this.username) {
                this.page = 1
                this.getTableList(this.account,this.isMOuth)
            } else {
                if(this.account === ''){
                    this.getAccount()
                }else{
                    this.page = 1
                    this.getTableList(this.account,this.isMOuth)
                    this.$message.success("搜索成功")
                }
            }
        },
        // search(){
        //     if(!this.account){
        //         this.$message("请输入用户名")
        //     }else if(!this.isMOuth){
        //         this.$message("请输入时间段")
        //     }else{
        //         this.getTableList(this.account,this.isMOuth)
        //         this.$message("搜索成功")
        //     }
        // },
        //用昵称查询账号
        getAccount(){
            let obj = {
                username: this.username
            }
            findAllMember(obj).then(res => {
                // console.log(res.data.data.list[0].ACCOUNT)
                this.account = res.data.data.list[0].ACCOUNT
                this.page = 1
                this.getTableList(this.account,this.isMOuth)
                this.$message.success("搜索成功")
            })
        },
        
        //获取表单数据
        getTableList(account,isMOuth){     
            findAgentInfoByAccount(account,isMOuth)
            .then(res => {
                // console.log(res)
                this.tableData = res.data.data
                // console.log(this.tableData)
            })
            .catch(error => {
                Message.error(error)
            })
        },   
        export2Excel() {},
        formatJson(filterVal, jsonData) {
　　　　　　return jsonData.map(v => filterVal.map(j => v[j]))
        },

         // 导出
		exportSome() {
			let newobj
			this.tableData.forEach((e, index) => {
				newobj = {
					index: index,
                    date: e.date,                //日期
					accountNum: Number(e.accountNum).toFixed(2), //开户数
					activeNum: Number(e.activeNum).toFixed(2), //激活数
					allPayNum: Number(e.allPayNum).toFixed(2), //消费数
					allBuy: Number(e.allBuy).toFixed(2), //竞彩
					selfBuy: Number(e.selfBuy).toFixed(2), // 自购
					fllowBuy: Number(e.fllowBuy).toFixed(2),   //跟单
					beidan: Number(e.beidan).toFixed(2),  //北单
					laozhucai: Number(e.laozhucai).toFixed(2),  //老足彩
					shuzi: Number(e.shuzi).toFixed(2),   //数字
                    offer: Number(e.offer).toFixed(2), //扣减
                    commision: Number(e.commision).toFixed(2), //佣金
				}
				this.newarr.push(newobj)
			})
			var model = {
				listParams: JSON.stringify(this.newarr),
				title: "业绩明细"
			};
			console.log(model)
			exportExcle(model.listParams, model.title)
				.then(res => {})
			console.log(this.newarr)
			require.ensure([], () => {
				const { export_json_to_excel } = require('../../vendor/Export2Excel');
				const tHeader = ['编号', '日期', '开户数', '激活数', '消费数（个）', '竞彩', '自购（金额）', '跟单（金额）', '北单（金额）', '老足彩（金额）', '数字（金额）', '扣减（金额）', '佣金（金额）']; //对应表格输出的title
                // 对应表格输出的数据
                const filterVal = ['index','date','accountNum','activeNum','allPayNum','allBuy', 'selfBuy', 'fllowBuy', 'beidan','laozhucai','shuzi','offer','commision'];
				const list = this.tableData;
				const data = this.formatJson(filterVal, list);
				export_json_to_excel(tHeader, data, this.username + '的业绩明细'); //对应下载文件的名字
			})

		}
    }
}
</script>

<style scoped>

div.row {
   padding: 20px 0;
   
}
p.taost{
   color: #f00;
   font-size: 14px;
   padding-top: 10px;
}
</style>
