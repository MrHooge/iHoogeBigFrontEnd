<!-- 业绩明细 -->
<template>
    <div class="sales_detail" style="padding:0 20px">
        <!-- 搜索 -->
        <div class="row">
            <div class="item">
                <el-input placeholder="请输入账号" v-model="account" style="width: 200px;margin-right:50px;" clearable></el-input>
                <el-input placeholder="请输入昵称" v-model="username" style="width: 200px;margin-right:50px;" clearable></el-input>
            </div>
            <div class="item">
                <el-date-picker
                v-model="startTime"
                type="date"
                style="margin-right:20px"
                placeholder="请选择开始日期"
                value-format="yyyy-MM-dd">
                </el-date-picker>

                <el-date-picker
                v-model="endTime"
                align="right"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择结束日期"
                >
                </el-date-picker>
            </div>
        </div>
        <div class="second">
            <div class="item">
                <el-button type="primary"
                            style="margin-left:30px;"
                            @click="search">查询</el-button>
                <el-button type="primary"
                            style="margin-left:30px;"
                            @click="exportSome">导出</el-button>
            </div>
        </div>
        <div class="taost">
            注:老销售使用sj查询，新销售使用昵称查询，本表格只支持查询单个代理人员七天或当月的数据
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
            <!-- <el-table-column
                    label="开户数"
                    prop="accountNum"
                    align="center">
                    
            </el-table-column>
            <el-table-column
                    label="激活数"
                    prop="activeNum"
                    align="center">
            </el-table-column> -->
            <el-table-column
                    label="消费数(个)"
                    prop="allPayNum"
                    align="center">
            </el-table-column>
            <el-table-column
                    label="竞彩（金额）"
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
            <!-- <el-table-column
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
            </el-table-column>   -->
            <el-table-column
                    label="佣金(金额)"
                    prop="commission"
                    align="center">
                    <template slot-scope="scope">
                        <span >{{ scope.row.commission | sumCommision }}</span>
                    </template>
            </el-table-column>
        </el-table>

        <div :class="moneyName" :id="moneyId" :style="{height:moneyHeight,width:moneyWidth}" ref="moneyEchart"></div>
    </div>
</template>
<script>

import { Message, MessageBox } from 'element-ui'
import { findAllMember} from '@/api/customer'
import { findAgentInfoByAccount, exportExcle } from '@/api/sys_user'
import echarts from 'echarts'   //引入图表插件
export default {
    props: {
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
            startTime:this.fun_date(-7),
            endTime:this.getNowFormatDate(),
            chart1: null,
            // chart2: null,
            // chart3: null,
            // chart4: null,
            // chart5: null,

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

            time: [],   //存储日期
            xfs: [],   //存储消费数
            jc: [],   //存储竞彩
            zg: [],   //存储自购
            gd: [],   //存储跟单
            yj: [],   //存储佣金

        }
    },
    created(){
        // this.getTableList()
    },
    filters: {
        sumCommision(sum){
            return sum ? sum : 0
        }
    },
    methods: {
        //获取当前日期
        getNowFormatDate() {
            var date = new Date();
            var seperator1 = "-";
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var currentdate = year + seperator1 + month + seperator1 + strDate;
            return currentdate;
        },
        //获取过去的时间
        fun_date(aa){
            var date1 = new Date(),
            time1=date1.getFullYear()+"-"+(date1.getMonth()+1)+"-"+date1.getDate();//time1表示当前时间
            var date2 = new Date(date1);
            date2.setDate(date1.getDate()+aa);
            var month = date2.getMonth() + 1;
            var strDate = date2.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var time2 = date2.getFullYear()+"-"+month+"-"+strDate;
            return time2
        },  
        //金额图表
        moneyEchart() {
            this.time = []
            this.jc = []  //竞彩金额
            this.zg = []  //自购金额
            this.gd = []  //跟单金额
            this.yj = []
            this.chart1 = echarts.init(this.$refs.moneyEchart);
            // 把配置和数据放这里
            let obj = {
                account: this.account,
                isMonth: this.isMOuth
            }
            findAgentInfoByAccount(obj)
            .then(res => {
                this.tableData = res.data.data
                res.data.data.forEach(e => {
                    this.time.push(e.date)
                    // this.xfs.push(e.allPayNum)
                    this.jc.push(e.allBuy)   //竞彩金额
                    this.zg.push(e.selfBuy)  //自购金额
                    this.gd.push(e.fllowBuy)  //跟单金额
                    this.yj.push(e.commission)
                })
                this.chart1.setOption({
                    title: {
                        text: '业绩明细',
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
                        data: this.time.reverse(),
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
                            data: this.jc.reverse(),
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
                            data: this.zg.reverse(),
                            markPoint: {
                                data: [
                                    {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'},
                                    [{
                                        symbol: 'none',
                                        x: '90%',
                                        yAxis: 'max'
                                    }, {
                                        symbol: 'circle',
                                        label: {
                                            normal: {
                                                position: 'start',
                                                formatter: '最大值'
                                            }
                                        },
                                        type: 'max',
                                        name: '最高点'
                                    }]
                                ]
                            }
                        },
                        {
                            name:'跟单（金额）',
                            
                            type:'line',
                            data: this.gd.reverse(),
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
                            data: this.yj.reverse(),
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
                });
            })
            .catch(error => {
                Message.error(error)
            })
        },
        //查询
        search() {
            if (!this.account && !this.username) {
                this.page = 1
                this.getTableList()
                this.moneyEchart();
            } else {
                if(this.account === ''){
                    this.getAccount()
                }else{
                    this.page = 1
                    this.getTableList()
                    this.moneyEchart();
                    this.$message.success("搜索成功")
                }
            }
        },
        //用昵称查询账号
        getAccount(){
            let obj = {
                username: this.username
            }
            findAllMember(obj).then(res => {
                this.account = res.data.data.list[0].ACCOUNT
                this.page = 1
                this.getTableList()
                this.moneyEchart();
                // this.Jc();   //竞彩
                // this.Zg();   //自购
                // this.Gd();   //跟单
                // this.Yj();   //佣金
                this.$message.success("搜索成功")
            })
        },
        
        //获取表单数据
        getTableList(){
            let obj = {
                account: this.account,
                startTime:this.startTime,
                endTime:this.endTime,
                // isMonth: this.isMOuth

            }
            findAgentInfoByAccount(obj)
            .then(res => {
                this.tableData = res.data.data
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
					// accountNum: Number(e.accountNum).toFixed(2), //开户数
					// activeNum: Number(e.activeNum).toFixed(2), //激活数
					allPayNum: Number(e.allPayNum).toFixed(2), //消费数
					allBuy: Number(e.allBuy).toFixed(2), //竞彩
					selfBuy: Number(e.selfBuy).toFixed(2), // 自购
					fllowBuy: Number(e.fllowBuy).toFixed(2),   //跟单
					// beidan: Number(e.beidan).toFixed(2),  //北单
					// laozhucai: Number(e.laozhucai).toFixed(2),  //老足彩
					// shuzi: Number(e.shuzi).toFixed(2),   //数字
                    // offer: Number(e.offer).toFixed(2), //扣减
                    commision: Number(e.commision).toFixed(2), //佣金
				}
				this.newarr.push(newobj)
			})
			var model = {
				listParams: JSON.stringify(this.newarr),
				title: "业绩明细"
			};
			exportExcle(model.listParams, model.title)
				.then(res => {})
			require.ensure([], () => {
				const { export_json_to_excel } = require('../../vendor/Export2Excel');
                // const tHeader = ['编号', '日期', '开户数', '激活数', '消费数（个）', '竞彩（金额）', '自购（金额）', '跟单（金额）', '北单（金额）', '老足彩（金额）', '数字（金额）', '扣减（金额）', '佣金（金额）']; //对应表格输出的title
				const tHeader = ['编号', '日期', '消费数（个）', '竞彩（金额）', '自购（金额）', '跟单（金额）', '佣金（金额）']; //对应表格输出的title
                // 对应表格输出的数据
                // const filterVal = ['index','date','accountNum','activeNum','allPayNum','allBuy', 'selfBuy', 'fllowBuy', 'beidan','laozhucai','shuzi','offer','commision'];
                const filterVal = ['index','date','allPayNum','allBuy', 'selfBuy', 'fllowBuy','commision'];

				const list = this.tableData;
				const data = this.formatJson(filterVal, list);
				export_json_to_excel(tHeader, data, this.username + '的业绩明细'); //对应下载文件的名字
			})

		}
    }
}
</script>

<style scoped>

.row {
   padding: 20px 0;
   width: 1200px;
   display: flex;
   justify-content: flex-start;
}
.item{
    display: flex;
    justify-content: center;
    align-items: center;
}
.second{
    width: 600px;
    display: flex;
    justify-content: flex-start;
}
.taost{
   color: #f00;
   font-size: 14px;
   padding-top: 10px;
}
</style>
