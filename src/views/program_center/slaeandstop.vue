<template>
    <div class="sale">
         <el-table :data="tableData" border style="width: 100%;">
            <el-table-column
                prop="竞彩篮球"
                label="竞彩篮球"
                align="center">
            </el-table-column>
            <el-table-column
                prop="竞彩足球"
                align="center"
                label="	竞彩足球">
            </el-table-column>    
            <el-table-column
                align="center"
                label="	操作">
                <template slot-scope="scope">
               <el-button type="primary" @click="inquire">修改</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="修改" :visible.sync="dialogShenVisible" width="500px" top="30vh">
            <div class="body">
              彩种：<el-radio v-model="type" label="38" border style="margin:5px;" size="mini">足球 </el-radio>
              <el-radio v-model="type" label="39" border style="margin:5px;" size="mini">篮球 </el-radio><br />
              状态：<el-radio v-model="status" label="0" border style="margin:5px;" size="mini">开售</el-radio>
              <el-radio v-model="status" label="1" border style="margin:5px;" size="mini">停售</el-radio>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogShenVisible = false">取 消</el-button>
                <el-button type="primary" @click="sure">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { getLotteryTypeIsSale,updateLotteryTypeIsSale } from '@/api/period'
export default {
    data(){
        return {
            dialogShenVisible:false,
            type:'',
            status:'',
            tableData:[]

        }
    },
    created(){
        this.gettable()
    },
    methods:{
        //获取数据
        gettable(){
            getLotteryTypeIsSale().then(res => {
                console.log(res)
                this.tableData.push(res.data.data)
            })
        },
        //修改
        inquire(){
            this.dialogShenVisible = true
        },
        //确认
        sure(){
            let lotteryType = this.type;
            let status = this.status;
            updateLotteryTypeIsSale(lotteryType,status).then(res => {
                if(res.data.error_code == 200){
                    this.$message.success(res.data.message);
                    this.dialogShenVisible = false
                }else{
                    this.$message.error(res.data.message);
                    this.dialogShenVisible = false
                }
            })
        }
    },
}
</script>

<style scoped>
.sale{
    padding: 10px 20px
}
</style>
