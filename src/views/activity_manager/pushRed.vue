<template>
    <div class="robot">
        <div class="btn">
            <el-button type="primary" @click="addjqr">
                发布平台红包
            </el-button>
        </div>
        <!-- 机器人列表 -->
        <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            border
            @selection-change="handleSelectionChange">
            <el-table-column
                type="selection">
                </el-table-column>
            <el-table-column
                prop="account"
                align="center"
                label="用户名">
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
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[10, 20, 30, 40, 50]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalList"
            v-if="totalList != ''"
            style="margin-top:40px"
            >
            </el-pagination>
         </div>
         <!-- 添加机器人弹窗 -->
        <el-dialog
            title="设置机器人抢红包"
            :visible.sync="dialogVisible"
            width="500px"
            >
            <el-row>
                <el-col :span="4"><div class="grid-content bg-purple">
                    红包金额
                </div></el-col>
                <el-col :span="12"><div class="grid-content bg-purple-light">
                    <el-input v-model="amount" placeholder="请输入红包金额" type="number" min="0"></el-input>
                </div></el-col>
            </el-row>
            <br>
            <el-row>
                <el-col :span="4"><div class="grid-content bg-purple">
                    红包名称
                </div></el-col>
                <el-col :span="12"><div class="grid-content bg-purple-light">
                    <el-input v-model="pageName" placeholder="请输入红包名称" clearable></el-input>
                </div></el-col>
            </el-row>
            <br>            
            <el-row>
                <el-col :span="4"><div class="grid-content bg-purple">
                    红包数量
                </div></el-col>
                <el-col :span="12"><div class="grid-content bg-purple-light">
                    <el-input v-model="pageNum" placeholder="请输入红包个数" type="number" min="0"></el-input>
                </div></el-col>
            </el-row>
            <br>
            <el-row>
                <el-col :span="4"><div class="grid-content bg-purple">
                    抢夺金额
                </div></el-col>
                <el-col :span="12"><div class="grid-content bg-purple-light">
                    <el-input v-model="jmoney" placeholder="请输入抢夺的金额" type="number" min="0"></el-input>
                </div></el-col>
            </el-row>
            <br>
            <el-row>
                <el-col :span="4"><div class="grid-content bg-purple">
                    开始时间
                </div></el-col>
                <el-col :span="12"><div class="grid-content bg-purple-light">
                    <el-date-picker
                        v-model="starttime"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="请选择红包开始日期">
                    </el-date-picker>
                </div></el-col>
            </el-row>
            <br>
            <el-row>
                <el-col :span="4"><div class="grid-content bg-purple">
                    红包类型
                </div></el-col>
                <el-col :span="12"><div class="grid-content bg-purple-light">
                    <el-radio v-model="radio" label="1" border style="margin-bottom:20px">手气红包</el-radio><br />
                    <el-radio v-model="radio" label="2" border>标准红包</el-radio>

                </div></el-col>
            </el-row>
            <br>            
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="sure">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { grabRedRacketList2,putRedRacketList2,addRedRacketForPlatform } from '@/api/activity'
import { getRobotList } from '@/api/sys_user'
export default {
    data() {
        return {
            tableData: [], //表格数据
            account:''||null,
            stime:''||null,
            etime:''||null,
            page: 1,
            pageSize:20,
            selectios:[],
            dialogVisible: false,
            starttime:'',
            radio:'1', //选中的红包类型
            jmoney:'', // 机器人抢夺的红包金额
            pageNum:'',  //  红包个数
            pageName:'', // 红包名字
            amount:'',  //红包总金额
            totalList: 0,  //总页数

        }
    },
    created() {
        this.getTable()
    },
    filters: {
        time(a){
             if(a != null){
                 let date = new Date(a);
                let y = date.getFullYear();
                let MM = date.getMonth() + 1;
                MM = MM < 10 ? ('0' + MM) : MM;
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                let h = date.getHours();
                h = h < 10 ? ('0' + h) : h;
                let m = date.getMinutes();
                m = m < 10 ? ('0' + m) : m;
                let s = date.getSeconds();
                s = s < 10 ? ('0' + s) : s;
                return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
             }
        },
    },
    methods: {
        //查询
        search(){
            this.page = 1
            this.getTable()
        },
        // getTable() {
        //     let obj = {
        //         account: this.account,
        //         endTime: this.etime,
        //         startTime: this.stime,
        //         offset: this.page,
        //         pageSize: this.pageSize
        //     }
        //     //抢红包列表
        //     grabRedRacketList2(obj)
        //         .then(res => {
        //             console.log(res)
        //             if(res.data.error_code === 200){
        //                 this.tableData = res.data.data.list
        //                 this.totalList = res.data.data.total
        //             }else{
        //                 this.$message.error(res.data.message)
        //             }
        //         })
        // },

        //  查询所有机器人
        getTable() {   
			let obj = {
				offset: this.page,
				pageSize: this.pageSize
			}
			getRobotList(obj).then(res => {
				console.log(res)
				if (res.data.error_code == 200) {
					this.tableData = res.data.data.list
					this.totalList = res.data.data.total
				}
			})
		},
        handleSelectionChange(val){
            console.log(val)
            this.selectios = val
        },
        addjqr() {
            if(this.selectios&&this.selectios.length>0){
                this.dialogVisible = true
                this.jmoney = ''
                this.pageNum = ''
                this.amount = ''
                this.stime = ''
            }else{
                this.$message("请至少选择一个机器人")
            } 
        },
        sure() {
            if(!this.amount){
                this.$message('请输入红包金额')
            }else if (!this.pageName) {
                this.$message('请输入红包名称')
            } 
            else if (!this.pageNum) {
                this.$message('请输入红包数量')              
            } 
            else if (!this.jmoney) {
                this.$message('请输入机器人抢夺的红包金额')              
            } 
            else if (!this.starttime) {
                this.$message('请输入红包开始时间')              
            } 
            else if (!this.radio) {
                this.$message('请选择一个红包类型')              
            }else if(this.amount==this.jmoney){
                this.$message('抢夺金额必须小于红包金额')              
            }
            else {
                let arr = []
                this.selectios.forEach(a=>{
                    console.log(a.id)
                    arr.push(a.id)
                })
                console.log(arr)
                let model = {
                    money: this.amount,
                    name: this.pageName,
                    number: this.pageNum,
                    robotIdList:arr.join(','),
                    robotMoney:this.jmoney,
                    startTime:this.starttime,
                    type:this.radio
                }
                console.log(model)
                addRedRacketForPlatform(model)
                    .then(res => {
                        if (res.data.error_code == 200) {
                            this.$message(res.data.message) 
                            this.dialogVisible = false
                            this.getTable()
                        } else {
                            this.$message(res.data.message)
                        }
                    })
            }
        },
        //查询发红包
        sendred(){
            let obj = {
                account:this.account,
                endTime:this.etime,
                startTime:this.stime,
                offset: this.page,
                pageSize: this.pageSize
            }
            putRedRacketList2(obj)
                .then(res => {
                    console.log(res.data.data.list)
                    if(res.data.error_code === 200){
                        this.tableData = res.data.data.list
                        this.total = res.data.total
                    }else{
                        this.$message.error(res.data.message)
                    }
                    
                })
        },
        //查询抢红包
        getred(){
             let obj = {
                account:this.account,
                endTime:this.etime,
                startTime:this.stime,
                offset: this.page,
                pageSize: this.pageSize
            }
            grabRedRacketList2(obj)
                .then(res => {
                    console.log(res)
                    this.tableData = res.data.data.list
                    this.total = res.data.total
                })
        },
         //翻页
        handleCurrentChange(num){
            this.page = num;
            this.getred();
            this.sendred()
        },
        //改变页面大小
        handleSizeChange(num){
            this.pageSize = num;
            this.getred();
            this.sendred()
        },
    }
}
</script>

<style scoped>
.robot{
    padding: 10px 20px
}
div.btn {
    padding-bottom: 0.5rem;
}
</style>