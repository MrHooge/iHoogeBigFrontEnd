<template>
<div>
    <div class="topten">

        <div class="grid-content bg-purple">
            <el-input v-model="name" placeholder="请输入查询的账号" clearable></el-input>
        </div>
        <div>
            <div class="block"
                style="display: inline-block;">
                <el-date-picker v-model="startTime"
                                type="datetime"
                                placeholder="选择日期"
                                value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
            </div>
            至
            <div class="block"
                style="display: inline-block;">
                <el-date-picker v-model="endTime"
                                type="datetime"
                                placeholder="选择日期"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                default-time="23:59:59">
                </el-date-picker>
            </div>
        </div>
        
        <div>
            <el-button type="primary" @click="search">查询</el-button>
        </div>
            
    </div>
    <div class="container">
        
        <div class="table-data">
            <el-table :data="tableData" border style="width: 100%">

                <el-table-column
                    prop="id"
                    align="center" 
                    width="170"
                    label="序号">
                </el-table-column>

                <el-table-column
                    prop="backAccount"
                    align="center"
                    width="330"
                    label="用户">
                </el-table-column>

                <el-table-column
                    prop="amount"
                    align="center"
                    width="500"
                    label="线下加款">
                </el-table-column>

            </el-table>
        </div>
    </div>
    <div class="page"
         v-show="pageShow">
      <el-pagination background
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="page"
                     :page-sizes="[10, 20, 30, 40, 50]"
                     :page-size="pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="totalList"
                     v-if="totalList != ''">
      </el-pagination>
    </div>
</div>
</template>

<script>
//getBackAccountChargeLine
import {getBackAccountChargeLine} from "@/api/sys_user";
import axios from "axios";

export default {
    data(){
        return{
            name:'',
            startTime:this.getNowFormatDate("00:00:00"),
            endTime:this.getNowFormatDate("23:59:59"),
            tableData: [], //表格的数据
            pageShow: true,
            page:1,
            pageSize: 20,
            totalList:0,
            
        }
    },
    created(){
        this.getChargeLine(1)
        
    },
    methods:{
        //获取当前日期
        getNowFormatDate(hour) {
            var date = new Date();
            var seperator1 = "-";
            var seperator2 = ":";
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + hour
            return currentdate;
        },
        
        search(){
            this.getChargeLine();
        },
        //改变页面大小
        handleSizeChange(pageSize) {
            this.pageSize = pageSize
            this.getChargeLine();
        },
        // 分也回调
        handleCurrentChange(page) {
            this.page = page
            this.getChargeLine();
        },
        // /backAccount=manager&account=&create_time=&end_time=&page=1&pageSize=10
        getChargeLine() {
            
            let obj={
                page:this.page,
                pageSize:this.pageSize,
                backAccount:this.name,
                account:"",
                create_time:this.startTime,
                end_time:this.endTime,
            }
            // axios.get('http://192.168.1.37:10040/xxPay/getBackAccountChargeLine',{params: obj}).then(res=>{
            //     if (res.status == 200) {
            //         if(res.data.error_code === 200){
            //             this.tableData = res.data.data.list
            //             this.totalList = res.data.data.total;
            //             this.totalList < this.pageSize ? this.pageShow = false : this.pageShow = true;
            //             this.tableData.forEach((e,index)=>{
            //                 e.id = index + 1 
            //             })
            //         }else{
            //             this.$message.error(res.data.message)
            //         }
            //     }
            // })
            getBackAccountChargeLine(obj).then(res => {
                if (res.status == 200) {
                    if(res.data.error_code === 200){
                        this.tableData = res.data.data.list
                        this.totalList = res.data.data.total;
                        this.totalList < this.pageSize ? this.pageShow = false : this.pageShow = true;
                        this.tableData.forEach((e,index)=>{
                            e.id = index + 1 
                        })
                    }else{
                        this.$message.error(res.data.message)
                    }
                }
            });
        },
    }
}
</script>

<style scoped>
.topten, .page{
    width: 1000px;
    margin:0px auto;
    margin-top:50px;
    display: flex;
    justify-content: space-between;
}
.container{
    padding: 50px;
    display: flex;
    justify-content: center;
}
.table-data{
    /* width: 1000px; */
}
</style>