<template>
   <div class="effectiveagent">
      <!-- 1 2代理及底下会员黑名单 3代理白名单 4代理及底下会员白名单 -->
      <div class="bens">
         <el-button type="primary" @click="setAgent(1)">设置加奖黑名单</el-button>
         <el-button type="danger" @click="setAgent(3)">设置加奖白名单</el-button>
         <!-- <el-button type="danger">设置代理及底下会员黑名单</el-button>
         <el-button type="danger">设置代理及底下会员白名单</el-button> -->
      </div>
          <el-table
            :data="tableData"
            border
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
               type="selection"
               width="55">
            </el-table-column>
            <el-table-column
            prop="account"
            label="用户名"
            align="center"
            >
            </el-table-column>
            <el-table-column
            prop="mobile"
            align="center"
            
            label="手机号"
            >
            </el-table-column>
            <el-table-column
            prop="name"
            label="姓名"
            align="center">
            </el-table-column>
            <el-table-column
            prop="username"
            align="center"
            
            label="昵称">
            </el-table-column>
         </el-table>
         <!-- 分页 -->
           <div class="page">
            <el-pagination
               background
               @current-change = "currpage"
               :page-size="pages"
               layout="prev, pager, next"
               :total="total">
            </el-pagination>
         </div>
   </div>
</template>

<script>
import api from '@/api/Api'

export default {
    data() {
        return {
            tableData: [],
            pages: 20,
            selections:[],
            total: 0
        }
    },
    filters: {},
    created() {
        this.getTable(1)
    },
    methods: {
        // 获取表格数据
        getTable(curr) {
            let obj = {
                page: curr,
                pageSize: 20
            }
            this.$http
                .get(api.member + '/user/getAgentList', {
                    params: obj
                })
                .then(res => {
                    if (res.status == 200) {
                        if (res.data.error_code == 200) {
                            this.tableData = res.data.data.list
                            this.total = res.data.data.total
                        }
                    }
                })
        },
        // 分页的回调
        currpage(val) {
            this.getTable(val)
        },
        // 选择框全部
        handleSelectionChange(selection) {
            console.log(selection)
            this.selections = selection
        },
        //   设置黑名单
        setAgent(types) {
            if(this.selections&&this.selections.length > 0){
                let arr = [];
                this.selections.forEach(e=>{
                    arr.push(e.id)
                })
                let obj = {
                    ids:arr.join(','),
                    type:types
                }
                this.$ajax.get(api.lottery +'/lottery/setAddPrizeBlackOrWhite',obj).then(res => {
                    if(res.error_code==200) {
                        this.$message('设置' + res.message)
                        this.getTable(1)
                    } else {
                        this.$message(res.message)
                    }
                })
            }else{
                this.$message('请至少选择一个代理人员')
            }
          
        },
    }
}
</script>

<style scoped>
div.page {
    padding: 10px 0;
}
div.bens {
    padding: 0 0 20px 0;
}
</style>