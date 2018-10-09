<!-- 业绩明细 -->
<template>
  <div class="sales_detail"
       style="padding:0 20px">
    <!-- 搜索 -->
    <div class="row">
        <el-input
            placeholder="请输入代理用户名"
            v-model="account"
            style="width: 200px;margin-right:50px;" clearable>
        </el-input>
        <el-input v-model="username" placeholder="请输入昵称" style="width: 150px;margin-right:100px;margin-top:40px" clearable></el-input>
        <el-date-picker v-model="datetime"
                        value-format="yyyy-MM-dd"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
        </el-date-picker>
        <el-button  type="primary"
                    @click="search"
                    @keyup.13="getone"
                    style="margin-left:50px;"
                    :loading="istrue">搜索
        </el-button>
        <el-button  type="success"
                    @click="exportSome"
                    style="margin-left:50px;">导出
        </el-button>
        <p class="taost">
            注:金额默认是消费金额
        </p>
      <!-- 上下页 -->
    </div>
    <el-table   :data="tableData"
                border
                style="width: 100%;">
        <el-table-column type="index"
                        align="center"
                        label="编号">
        </el-table-column>
        <el-table-column label="代理名字"
                        prop="agentName"
                        align="center">
        </el-table-column>
        <el-table-column label="消费数(个)"
                        prop="allBuyNum"
                        align="center">
        </el-table-column>
        <el-table-column label="自购数(个)"
                        prop="CountSelfBuyNum"
                        align="center">
        </el-table-column>
            <el-table-column label="跟单数(个)"
                        prop="CountFllowBuyNum"
                        align="center">
        </el-table-column>
        <el-table-column label="竞彩（金额）"
                        prop="allBuyMoney"
                        align="center">
        </el-table-column>
        <el-table-column label="自购(金额)"
                        prop="selfBuy"
                        align="center">
        </el-table-column>
        <el-table-column label="跟单(金额)"
                        prop="fllowBuy"
                        align="center">
        </el-table-column>
            <!-- <el-table-column label="北单(金额)"
                        prop="beidan"
                        align="center">
        </el-table-column>
        <el-table-column label="老足彩(金额)"
                        prop="laozucai"
                        align="center">
        </el-table-column>
        <el-table-column label="数字(金额)"
                        prop="shuzi"
                        align="center">
        </el-table-column>
            <el-table-column label="扣减(金额)"
                        prop="koujian"
                        align="center">
        </el-table-column> -->
        <el-table-column label="佣金(金额)"
                         prop="sumCommision"
                         align="center">
            <template slot-scope="scope">
                <span>{{ scope.row.sumCommision | sumCommision }}</span>
            </template>
        </el-table-column>
        <el-table-column label="渠道"
                        prop="qdName"
                        align="center"
                        v-if="qudaoShow">
        </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination style="margin:20px auto"
                   background
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="pageCurr"
                   :page-sizes="[10, 20, 50, 100]"
                   :page-size="10"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="totalList"
                   v-if="totalList != ''">
    </el-pagination>
    <div :class="NumName" :id="NumId" :style="{height:NumHeight,width:NumWidth}" ref="NumEchart"></div>
    <div :class="moneyName" :id="moneyId" :style="{height:moneyHeight,width:moneyWidth}" ref="moneyEchart"></div>
    </div>
</template>

<script>
import { Message, MessageBox } from 'element-ui'
import { findAllMember} from '@/api/customer'
import { findAgentInfoByAccount,  exportExcle, findSaleInfo } from '@/api/sys_user'
import { getCookies, setCookies, removeCookies } from '@/utils/cookies'
import echarts from 'echarts'   //引入图表插件
export default {
    props: {
        //个数
        NumName: {
            type: String,
            default: 'NumName'
        },
        NumId: {
            type: String,
            default: 'NumId'
        },
        NumWidth: {
            type: String,
            default: '800px'
        },
        NumHeight: {
            type: String,
            default: '400px'
        },
        //金额
        moneyName: {
            type: String,
            default: 'moneyName'
        },
        moneyId: {
            type: String,
            default: 'moneyId'
        },
        moneyWidth: {
            type: String,
            default: '800px'
        },
        moneyHeight: {
            type: String,
            default: '400px'
        },
    },
    data() {
        return {
            chart1: null,
            chart2: null,

            dlAccount: [],   //存储代理用户
            xfs: [],   //存储消费数
            zgs: [],   //存储自购数
            gds: [],   //存储跟单数
            jc: [],   //存储竞彩
            zg: [],   //存储自购
            gd: [],   //存储跟单
            yj: [],   //存储佣金

            tableData: [],
            account: '', // 用户名
            agentName: '',
            loginAccount: getCookies('name'),
            pageCurr: 1,
            pages: 10,
            start_time: '',
            end_date: '',
            datetime: '', // 获取的日期和时间
            newarr: [],
            totalList: 0,
            istrue: false,
            username: '',   //昵称
        }
    },
    created() {
        console.log(this.roleId)
        this.getTableList()
        // this.getTodayDate()
        if(this.roleId === '10000181' ){
            this.qudaoShow = false
        }else{
            this.qudaoShow = true
        }
        console.log(this.qudaoShow)
    },
    filters: {
        sumCommision(sum) {
            return sum ? sum : 0
        }
    },
    methods: {
        //个数图表
        NumEchart() {
            this.chart1 = echarts.init(this.$refs.NumEchart);
            // 把配置和数据放这里
            let paramsObj = {
                agentName: this.account,
                loginAccount: this.loginAccount,
                page: this.pageCurr,
                pageSize: this.pages,
                start_time: this.start_time,
                end_date: this.end_date
            }
            findSaleInfo(paramsObj).then(res => {
                console.log(res)
                if(res.data.error_code === 200){
                    this.istrue = false
                    this.tableData = res.data.data.list
                    this.tableData.forEach(e => {
                        this.dlAccount.push(e.agentName)
                        this.xfs.push(e.allBuyNum)   //消费数
                        this.zgs.push(e.CountSelfBuyNum)   //自购数
                        this.gds.push(e.CountFllowBuyNum)   //跟单数
                    })
                }
                this.chart1.setOption({
                    title: {
                        text: '业绩汇总（个数）',
                        // subtext: '纯属虚构'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['消费数（个）','自购数（个）','跟单数（个）']
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            dataView: {readOnly: false},
                            magicType: {type: ['line', 'bar']},
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    xAxis:  {
                        type: 'category',
                        boundaryGap: false,
                        data: this.dlAccount,
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            // formatter: '{value} °C'
                        }
                    },
                    series: [
                        {
                            name:'消费数（个）',
                            
                            type:'line',
                            data: this.xfs,
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            }
                        },
                        {
                            name:'自购数（个）',
                            
                            type:'line',
                            data: this.zgs,
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            }
                        },
                        {
                            name:'跟单数（个）',
                            
                            type:'line',
                            data: this.gds,
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            }
                        },
                    ]
                })
            })
            .catch(error => {
                Message.error(error)
            })
        },
        //金额图表
        moneyEchart() {
            this.chart2 = echarts.init(this.$refs.moneyEchart);
            // 把配置和数据放这里
            let paramsObj = {
                agentName: this.account,
                loginAccount: this.loginAccount,
                page: this.pageCurr,
                pageSize: this.pages,
                start_time: this.start_time,
                end_date: this.end_date
            }
            findSaleInfo(paramsObj).then(res => {
                console.log(res)
                if(res.data.error_code === 200){
                    this.istrue = false
                    this.tableData = res.data.data.list
                    this.tableData.forEach(e => {
                        // this.dlAccount.push(e.agentName)
                        this.jc.push(e.allBuyMoney)   //竞彩金额
                        this.zg.push(e.selfBuy)   //自购金额
                        this.gd.push(e.fllowBuy)   //跟单金额
                        this.yj.push(e.sumCommision)   //佣金金额
                    })
                }
                this.chart2.setOption({
                    title: {
                        text: '业绩汇总（金额）',
                        // subtext: '纯属虚构'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['竞彩（金额）','自购（金额）','跟单（金额）','佣金（金额）']
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            dataView: {readOnly: false},
                            magicType: {type: ['line', 'bar']},
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    xAxis:  {
                        type: 'category',
                        boundaryGap: false,
                        data: this.dlAccount,
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            // formatter: '{value} °C'
                        }
                    },
                    series: [
                        {
                            name:'竞彩（金额）',
                            
                            type:'line',
                            data: this.jc,
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            }
                        },
                        {
                            name:'自购（金额）',
                            
                            type:'line',
                            data: this.zg,
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            }
                        },
                        {
                            name:'跟单（金额）',
                            
                            type:'line',
                            data: this.gd,
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            }
                        },
                        {
                            name:'佣金（金额）',
                            
                            type:'line',
                            data: this.yj,
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            }
                        },
                    ]
                })
            })
            .catch(error => {
                Message.error(error)
            })
        },
        //查询
        search() {
            if (!this.account && !this.username) {
                this.istrue = true
                this.start_time = this.datetime[0]
                this.end_date = this.datetime[1]
                this.page = 1
                this.getTableList()
                this.NumEchart();     //个数图表
                this.moneyEchart();   //金额图表
            } else {
                if(this.account === ''){
                    this.getAccount()
                }else{
                    this.istrue = true
                    this.start_time = this.datetime[0]
                    this.end_date = this.datetime[1]
                    this.page = 1
                    this.getTableList()
                    this.NumEchart();     //个数图表
                    this.moneyEchart();   //金额图表
                }
            }
            console.log(this.start_time)
        },
        //用昵称查询账号
        getAccount(){
            let obj = {
                username: this.username
            }
            findAllMember(obj).then(res => {
                console.log(res.data.data.list[0].ACCOUNT)
                this.account = res.data.data.list[0].ACCOUNT
                this.istrue = true
                this.start_time = this.datetime[0]
                this.end_date = this.datetime[1]
                this.page = 1
                this.getTableList()
                this.NumEchart();     //个数图表
                this.moneyEchart();   //金额图表
                this.$message.success("搜索成功")
            })
        },
        
        handleSizeChange(val) {
            this.pages = val
            this.getTableList()
        },
        handleCurrentChange(val) {
            this.pageCurr = val
            this.getTableList()
        },
        //获取表单数据
        getTableList() {
            let paramsObj = {
                agentName: this.account,
                loginAccount: this.loginAccount,
                page: this.pageCurr,
                pageSize: this.pages,
                start_time: this.start_time,
                end_date: this.end_date
            }
            findSaleInfo(paramsObj).then(res => {
                if(res.data.error_code === 200){
                    this.istrue = false
                    this.tableData = res.data.data.list
                    this.totalList = res.data.data.total
                }
            
            })
            .catch(error => {
                Message.error(error)
            })
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]))
        },
        //导出表格
        exportSome() {
            this.tableData.forEach((e, index) => {
                console.log(e)
                let newobj = {
                num: index,
                agentName: e.agentName,
                allBuyNum: Number(e.allBuyNum).toFixed(2),
                CountSelfBuyNum: Number(e.CountSelfBuyNum).toFixed(2),
                CountFllowBuyNum:Number(e.CountFllowBuyNum).toFixed(2),
                allBuyMoney:e.allBuyMoney,
                selfBuy: Number(e.selfBuy).toFixed(2),
                fllowBuy: Number(e.followBuy).toFixed(2),
                beidan: Number(e.beidan).toFixed(2),
                laozucai: Number(e.laozucai).toFixed(2),
                shuzi: Number(e.shuzi).toFixed(2),
                koujian: Number(e.koujian).toFixed(2),
                sumCommision: (e.sumCommision ? e.sumCommision : 0).toFixed(2),
                qdName:e.qdName
                
                }
                this.newarr.push(newobj)
            })
            var model = {
                listParmas: JSON.stringify(this.newarr),
                title: "业绩汇总"
            };
            exportExcle(model.listParmas, model.title).then(res => {})
            console.log(this.newarr)
            require.ensure([], () => {　　　　　　　
                const {
                    export_json_to_excel
                } = require('../../vendor/Export2Excel');　　　　　　　　
                const tHeader = ['编号', '代理名字', '消费数(个)', '自购数(个)', '跟单数(个)', '竞彩', '自购(金额)', '跟单(金额)', '北单(金额)', '老足彩(金额)', '数字(金额)','扣减(金额)','佣金(金额)','渠道']; //对应表格输出的title
                　　　　　　　　
                const filterVal = ['num','agentName','allBuyNum','CountSelfBuyNum','CountFllowBuyNum','allBuyMoney', 'selfBuy', 'fllowBuy', 'beidan','laozucai','shuzi','koujian','sumCommision','qdName']; // 对应表格输出的数据　　　　　
                const list = this.tableData;　　　　　　　　
                const data = this.formatJson(filterVal, list);　　　　　　　　
                export_json_to_excel(tHeader, data, '业绩汇总'); //对应下载文件的名字　　　　
            })
        }
    }
}
</script>

<style scoped>
div.row {
  padding: 20px 0;
}

p.taost {
  color: #f00;
  font-size: 14px;
  padding-top: 10px;
}
</style>
