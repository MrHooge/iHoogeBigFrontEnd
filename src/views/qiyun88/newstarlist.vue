<template>
   <div class="effectiveagent">
       <div class="btn">
            <el-button type="primary" @click="addNewStar">添加新星榜</el-button>      
       </div>
       <!-- 弹窗 -->
        <el-dialog
            title="添加新星榜"
            :visible.sync="dialogVisible"
            width="500px"
            >
            <el-row>
                <el-col :span="4"><div class="grid-content bg-purple">
                    用户名
                </div></el-col>
                <el-col :span="12"><div class="grid-content bg-purple-light">
                    <el-input v-model="val" placeholder="请输入用户名"></el-input>
                </div></el-col>
            </el-row>
            <p class="toasts">注：一次输入多个用户时,请使用逗号隔开</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="sure">确 定</el-button>
            </span>
            </el-dialog>

        <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
        prop="account"
        label="用户名"
        align="center"
        >
        </el-table-column>
        <el-table-column
            prop="username"
            label="昵称"
            align="center">
        </el-table-column>
        <el-table-column
            align="center"
            label="用户头像"
            >
            <template slot-scope="scope"
            >
                <img :src="'https://'+scope.row.pictureUrl" alt="" width='50px;'>
            </template>
        </el-table-column>
        <el-table-column
            prop="winRate"
            label="中奖率"
            align="center">
        </el-table-column>
        </el-table>
   </div>
</template>

<script>
import { getNewStar,addNewStar } from '@/api/sunburn'
export default {
    data() {
        return {
            tableData: [],
            val:'',
            dialogVisible:false,
        }
    },
    filters: {},
    created() {
        this.getTable()
    },
    methods: {
        // 获取表格数据
        getTable() {
            let dan = ''
                getNewStar(dan)
                .then(res => {
                    //console.log(res.data.data)
                    this.tableData = res.data.data
                })
        },
        addNewStar() {
            this.dialogVisible = true        
        },
        sure(){
            let accounts = this.val
                addNewStar(accounts)
                .then(res => {
                    console.log(res.data.error_code)
                    if (res.data.error_code == 200) {
                        this.$message(res.data.message)
                        this.dialogVisible = false
                    }else{
                        this.$message(res.message)                        
                    }
            })
        }
    }
}
</script>

<style scoped>
.effectiveagent{
    padding: 10px 20px
}
div.btn{
    padding-bottom: 0.5rem;
}
p.toasts{
    color: #f00;
    padding: 10px 0;
}
</style>