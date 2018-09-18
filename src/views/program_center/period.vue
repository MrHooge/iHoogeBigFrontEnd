<template>
<div class="midder">
     <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            border>
            <el-table-column
                prop="id"
                align="center"
                label="id">
            </el-table-column>
            <el-table-column

                align="center"                
                label="是否可用">
                <template slot-scope="scope">
                    {{scope.row.isAble | userful}}
                </template>
            </el-table-column>
            <el-table-column
                align="center"                
                label="是否当前期">
                <template slot-scope="scope">
                    {{scope.row.isCurrentTerm | present}}
                </template>
            </el-table-column>
            <el-table-column
                prop="lotteryType"
                align="center"                
                label="彩种">
            </el-table-column>
            <el-table-column
                align="center"                
                label="开奖时间">
                <template slot-scope="scope">
                    {{scope.row.openDateTime | type}}
                </template>
            </el-table-column>
            <el-table-column
                prop="outTerm"
                align="center"                
                label="外部彩期">
            </el-table-column>
            <el-table-column
                prop="result"
                align="center"                
                label="开奖结果">
            </el-table-column>
            <el-table-column
                prop="resultDetail"
                align="center"                
                label="开奖描述">
            </el-table-column>
            <el-table-column
                align="center"                
                label="开始时间">
                 <template slot-scope="scope">
                    {{scope.row.startDateTime | type}}
                </template>
            </el-table-column>
            <el-table-column
                prop="term"
                align="center"                
                label="彩期">
            </el-table-column>
             <el-table-column
                align="center"                
                label="终端截止时间">
                 <template slot-scope="scope">
                    {{scope.row.terminalEndDateTime | type}}
                </template>
            </el-table-column>
             <el-table-column
                prop="testMachineCode"
                align="center"                
                label="试机号">
            </el-table-column>
            <el-table-column
                prop="totalAmount"
                align="center"                
                label="投注额">
            </el-table-column>
            <el-table-column
                align="center"                
                label="操作">
                <template slot-scope="scope">
                           <el-popover
                               placement="right"
                               width="1300"
                               trigger="click">
                               <el-table :data="walletData">
                                   <el-table-column
                                        prop="id"
                                        align="center"
                                        label="id">
                                    </el-table-column>
                                    <el-table-column
                                        prop="isAble"
                                        align="center"                
                                        label="是否可用">
                                         <template slot-scope="scope">
                                            {{scope.row.isAble | userful}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        align="center"                
                                        label="是否当前期">
                                        <template slot-scope="scope">
                                            {{scope.row.isCurrentTerm | present}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        prop="lotteryType"
                                        align="center"                
                                        label="彩种">
                                    </el-table-column>
                                    <el-table-column
                                        align="center"                
                                        label="开奖时间">
                                        <template slot-scope="scope">
                                            {{scope.row.openDateTime | type}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        prop="outTerm"
                                        align="center"                
                                        label="外部彩期">
                                    </el-table-column>
                                    <el-table-column
                                        prop="result"
                                        align="center"                
                                        label="开奖结果">
                                    </el-table-column>
                                    <el-table-column
                                        prop="resultDetail"
                                        align="center"                
                                        label="开奖描述">
                                    </el-table-column>
                                    <el-table-column
                                        align="center"                
                                        label="开始时间">
                                        <template slot-scope="scope">
                                            {{scope.row.startDateTime | type}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        prop="term"
                                        align="center"                
                                        label="彩期">
                                    </el-table-column>
                                    <el-table-column
                                        align="center"                
                                        label="终端截止时间">
                                        <template slot-scope="scope">
                                            {{scope.row.terminalEndDateTime | type}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        prop="testMachineCode"
                                        align="center"                
                                        label="试机号">
                                    </el-table-column>
                                    <el-table-column
                                        prop="totalAmount"
                                        align="center"                
                                        label="投注额">
                                    </el-table-column>
                                   </el-table>
                                   <el-button slot="reference" @click="showdetail(scope.row,'modify')" style="width:70px;height:30px;line-height:10px;padding-left:10px">查看明细</el-button>
                                   </el-popover><br />                                 
                           <el-button type="primary" @click="update(scope.row,'modify')" style="width:70px;height:30px;line-height:10px;padding-left:20px">编辑</el-button>              
                           <el-dialog title="编辑" :visible.sync="dialogFormVisible">
                           是否可用：<el-radio v-model="radio" label="0" border style="margin:5px;" size="mini">是</el-radio>
                            <el-radio v-model="radio" label="1" border style="margin:5px;" size="mini">否</el-radio><br />
                           状态：<el-radio v-model="status" label="0" border style="margin:5px;" size="mini">已取消</el-radio>
                            <el-radio v-model="status" label="1" border style="margin:5px;" size="mini">未开启</el-radio>
                            <el-radio v-model="status" label="2" border style="margin:5px;" size="mini">已开启</el-radio>
                            <el-radio v-model="status" label="3" border style="margin:5px;" size="mini">关闭</el-radio>
                            <el-radio v-model="status" label="4" border style="margin:5px;" size="mini">已开奖</el-radio>
                            <el-radio v-model="status" label="5" border style="margin:5px;" size="mini">已派奖</el-radio>
 
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="dialogFormVisible = false">取 消</el-button>
                                <el-button type="primary" @click="getroid">确 定</el-button>
                            </div>
                            </el-dialog>
                           </template>
            </el-table-column>
        </el-table>
        <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[10, 20, 30, 40, 50]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalList"
            >
            </el-pagination>
</div>
</template>

<script>
import { findTerm,updateTerm } from '@/api/period'
export default {
    data(){
        return{
            tableData:[],
            page:1,
            pageSize:20,
            startDateTime:'',
            walletData:[],
            dialogFormVisible:false,
            status:'',
            radio:'',
            lotteryTypeValue:'',
            term:'',
            totalList: 0,
        }
    },
    filters:{
        type(a){
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

        },
        userful(time){
            return time == 1 ? "是" :"否"
        },
        present(studio){
            if(studio==0){
                return "是"
            }else if(studio==1){
                return "否"
            }else{
                return "全部"
            }
        }
    },
    created(){
        this.gettable()
    },
    methods:{
        //获取数据列表
        gettable(){
            //console.log(this.$route.query)
            let obj = {
                page:this.page,
                pageSize:this.pageSize,
                lotteryTypeValue:this.$route.query.radio,
                term:''
            }
            findTerm(obj)
            .then(res => {
                this.tableData = res.data.data.list
                this.totalList = res.data.data.total
            })
        },
        //翻页
        handleCurrentChange(num){
            this.page = num;
            this.gettable()
        },
        //改变页面大小
        handleSizeChange(num){
            this.pageSize = num;
            this.gettable()
        },
        //查看明细
        showdetail(data){
            let obj = {
                page:this.page,
                pageSize:this.pageSize,
                lotteryTypeValue:data.lotteryType,
                term:data.term
            }
            findTerm(obj)
            .then(res => {
                this.walletData = res.data.data.list
            })
        },
        //编辑
        update(data){
            this.dialogFormVisible = true
            this.lotteryTypeValue = data.lotteryType
            this.term = data.term
        },
        //确认
        getroid(){
           let model ={
               isAble:this.radio,	
                lotteryTypeValue:this.lotteryTypeValue,		
                status:this.status,	
                term:this.term
           }
           updateTerm(model).then(res => {
               if(res.data.error_code == 200){
                   this.$message(res.data.message)
                   this.dialogFormVisible = false
               }
           })
           
        }
    }
}
</script>

<style scoped>
.midder{
    padding: 10px 20px
}
</style>
