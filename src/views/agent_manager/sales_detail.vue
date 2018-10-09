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
        <!-- <div :class="jcName" :id="jcId" :style="{height:jcHeight,width:jcWidth}" ref="jcEchart"></div>
        <div :class="zgName" :id="zgId" :style="{height:zgHeight,width:zgWidth}" ref="zgEchart"></div>
        <div :class="gdName" :id="gdId" :style="{height:gdHeight,width:gdWidth}" ref="gdEchart"></div>
        <div :class="yjName" :id="yjId" :style="{height:yjHeight,width:yjWidth}" ref="yjEchart"></div> -->
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
        // jcName: {
        //     type: String,
        //     default: 'jcName'
        // },
        // zgName: {
        //     type: String,
        //     default: 'zgName'
        // },
        // gdName: {
        //     type: String,
        //     default: 'gdName'
        // },
        // yjName: {
        //     type: String,
        //     default: 'yjName'
        // },
        moneyId: {
            type: String,
            default: 'moneyId'
        },
        // jcId: {
        //     type: String,
        //     default: 'jcId'
        // },
        // zgId: {
        //     type: String,
        //     default: 'zgId'
        // },
        // gdId: {
        //     type: String,
        //     default: 'gdId'
        // },
        // yjId: {
        //     type: String,
        //     default: 'yjId'
        // },
        moneyWidth: {
            type: String,
            default: '800px'
        },
        // jcWidth: {
        //     type: String,
        //     default: '800px'
        // },
        // zgWidth: {
        //     type: String,
        //     default: '800px'
        // },
        // gdWidth: {
        //     type: String,
        //     default: '800px'
        // },
        // yjWidth: {
        //     type: String,
        //     default: '800px'
        // },
        moneyHeight: {
            type: String,
            default: '400px'
        },
        // jcHeight: {
        //     type: String,
        //     default: '400px'
        // },
        // zgHeight: {
        //     type: String,
        //     default: '400px'
        // },
        // gdHeight: {
        //     type: String,
        //     default: '400px'
        // },
        // yjHeight: {
        //     type: String,
        //     default: '400px'
        // },
    },
    data() {
        return {
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
        this.getTableList()
    },
    filters: {
        sumCommision(sum){
            return sum ? sum : 0
        }
    },
    methods: {
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
                isMonth: this.isMOuth
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

div.row {
   padding: 20px 0;
   
}
p.taost{
   color: #f00;
   font-size: 14px;
   padding-top: 10px;
}
</style>
