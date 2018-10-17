<template>
	<div class="app-container">
		<!--   财务资金明细 -->
		<div class="row">
			<el-select v-model="datetype"
			           placeholder="请选择时间段"
			           @change="handledate">
				<el-option v-for="item in options"
				           :key="item.value"
				           :label="item.label"
				           :value="item.value">
				</el-option>
			</el-select>
			<el-button type="primary"
			           style="margin-left:10%;"
			           @click="exportSome">导出</el-button>
		</div>
		<el-table :data="tableData"
		          border
		          show-summary
		          :summary-method="getSummaries"
		          style="width: 100%">
			<el-table-column label="编号"
			                 type="index"
			                 align="center">
			</el-table-column>
            <el-table-column label="日期"
			                 align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.date }}</span>
				</template>
			</el-table-column>
			<el-table-column label="线上充值"
			                 prop="allOnLineMoney"
			                 align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.allOnLineMoney | commissionUse }}</span>
				</template>
			</el-table-column>
			<el-table-column label="线下充值"
			                 prop="allUnderLineMoney"
			                 align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.allUnderLineMoney | commissionUse }}</span>
				</template>
			</el-table-column>
			<el-table-column label="提款"
			                 prop="allWithdrawalMoney"
			                 align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.allWithdrawalMoney | commissionUse }}</span>
				</template>
			</el-table-column>
			<el-table-column label="消费"
			                 prop="allconsumMoney"
			                 align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.allconsumMoney | commissionUse }}</span>
				</template>
			</el-table-column>
			<el-table-column label="税后奖金"
			                 prop="posttaxPrize"
			                 align="center">
			</el-table-column>
			<el-table-column label="当日赠送"
			                 prop="todaySend"
			                 align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.todaySend | commissionUse }}</span>
				</template>
			</el-table-column>
			<el-table-column label="嘉奖"
			                 prop="lotteryCard"
			                 align="center">
			</el-table-column>
			<el-table-column label="彩金卡使用"
			                 prop="lotteryCardUse"
			                 align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.lotteryCardUse | commissionUse}}</span>
				</template>
			</el-table-column>
			<!-- <el-table-column label="佣金使用"
			                 prop="commissionUse"
			                 align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.commissionUse | commissionUse }}</span>
				</template>
			</el-table-column>
			<el-table-column label="销售佣金"
			                 prop="saleCommissionMoney"
			                 align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.saleCommissionMoney | commissionUse }}</span>
				</template>
			</el-table-column> -->
			<el-table-column label="平台收佣"
			                 prop="platformCommissionMoney"
			                 align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.platformCommissionMoney | commissionUse }}</span>
				</template>
			</el-table-column>
						
		</el-table>
        <div :class="moneyName" :id="moneyId" :style="{height:moneyHeight,width:moneyWidth,}" ref="moneyEchart" style="margin-top:50px;"></div>
	</div>
</template>

<script>
import { findFinancialMoneyInfo, exportExcle } from '@/api/sys_user'
import { Message, MessageBox } from 'element-ui'
import waves from '@/directive/waves/index.js' // 水波纹指令
import treeTable from '@/components/TreeTable'
import { getCookies, setCookies, removeCookies } from '@/utils/cookies'
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
            default: '1600px'
        },
        moneyHeight: {
            type: String,
            default: '400px'
        },
    },
	data() {
		return {
            chart: null,
            time: [],   //存储日期
            allOnLineMoney: [],   //存储线上充值
            allUnderLineMoney: [],   //存储线下充值
            allWithdrawalMoney: [],   //存储提款
            allconsumMoney: [],   //存储消费
            posttaxPrize: [],   //存储税后奖金
            todaySend: [],   //存储当日赠送
            lotteryCard: [],   //存储红包嘉奖彩金使用
            lotteryCardUse: [],   //存储彩金卡使用
            commissionUse: [],   //存储佣金使用
            saleCommissionMoney: [],   //存储销售佣金
            platformCommissionMoney: [],   //存储平台收佣

			tableData: [], //表格数据
			username: '', // 用户名
			options: [
				{
					value: '1',
					label: '七天'
				},
				{
					value: '0',
					label: '当前月'
				}
			],
			datetype: '',
			newarr: []
		}
	},
	created() {
		this.getTableList()
	},
	filters: {
		commissionUse(a) {
			return a.toFixed(2)
		}
    },
    mounted() {
        //图表默认显示只能在mounted调用  html渲染后才有数据
        this.moneyEchart();
    },
	methods: {
        //金额图表
        moneyEchart() {
            this.time = []
            this.allOnLineMoney = [],   //存储线上充值
            this.allUnderLineMoney = [],   //存储线下充值
            this.allWithdrawalMoney = [],   //存储提款
            this.allconsumMoney = [],   //存储消费
            this.posttaxPrize = [],   //存储税后奖金
            this.todaySend = [],   //存储当日赠送
            this.lotteryCard = [],   //存储红包嘉奖彩金使用
            this.lotteryCardUse = [],   //存储彩金卡使用
            this.commissionUse = [],   //存储佣金使用
            this.saleCommissionMoney = [],   //存储销售佣金
            this.platformCommissionMoney = [],   //存储平台收佣

            this.chart = echarts.init(this.$refs.moneyEchart);
            // 把配置和数据放这里
            let model = {
				isMonth: this.datetype || 1
			}
			findFinancialMoneyInfo(model).then(res => {
				if (res.status == 200) {
					if (res.data.data && res.data.data.length > 0) {
                        this.tableData = res.data.data
                        console.log(this.tableData)
                        this.tableData.forEach(e => {
                            this.time.push(e.date)
                            this.allOnLineMoney.push(e.allOnLineMoney)   //线上充值

                            this.allUnderLineMoney.push(e.allUnderLineMoney)   //线下充值
                            this.allWithdrawalMoney.push(e.allWithdrawalMoney)   //提款
                            this.allconsumMoney.push(e.allconsumMoney)   //消费
                            this.posttaxPrize.push(e.posttaxPrize)   //税后奖金
                            this.todaySend.push(e.todaySend)   //当日赠送
                            this.lotteryCard.push(e.lotteryCard)   //红包嘉奖彩金使用
                            this.lotteryCardUse.push(e.lotteryCardUse)   //彩金卡使用
                            this.commissionUse.push(e.date)   //佣金使用
                            this.saleCommissionMoney.push(e.commissionUse)   //销售佣金
                            this.platformCommissionMoney.push(e.platformCommissionMoney)   //平台收佣
                        })
                        // console.log(this.allOnLineMoney);
                        
                        this.chart.setOption({
                            title: {
                                text: '财务资金明细',
                                // subtext: '纯属虚构'
                            },
                            tooltip: {
                                trigger: 'axis'
                            },
                            legend: {
                                data:['线上充值','线下充值','提款','消费','税后奖金','当日赠送','红包嘉奖彩金使用','彩金卡使用','佣金使用','销售佣金','平台收佣']
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
                                    name:'线上充值',
                                    
                                    type:'line',
                                    data: this.allOnLineMoney.reverse(),
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
                                    name:'线下充值',

                                    type:'line',
                                    data: this.allUnderLineMoney.reverse(),
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
                                    name:'提款',
                                    
                                    type:'line',
                                    data: this.allWithdrawalMoney.reverse(),
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
                                    name:'消费',
                                    
                                    type:'line',
                                    data: this.allconsumMoney.reverse(),
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
                                    name:'税后奖金',
                                    
                                    type:'line',
                                    data: this.posttaxPrize.reverse(),
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
                                    name:'当日赠送',
                                    
                                    type:'line',
                                    data: this.todaySend.reverse(),
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
                                    name:'红包嘉奖彩金使用',
                                    
                                    type:'line',
                                    data: this.lotteryCard.reverse(),
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
                                    name:'彩金卡使用',
                                    
                                    type:'line',
                                    data: this.lotteryCardUse.reverse(),
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
                                    name:'佣金使用',
                                    
                                    type:'line',
                                    data: this.commissionUse.reverse(),
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
                                    name:'销售佣金',
                                    
                                    type:'line',
                                    data: this.saleCommissionMoney.reverse(),
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
                                    name:'平台收佣',
                                    
                                    type:'line',
                                    data: this.platformCommissionMoney.reverse(),
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
					}
				}
			})
            .catch(error => {
                Message.error(error)
            })
        },
		// 下拉框的回调
		getval(val) {
			this.getTableList()
		},
		//   筛选数据
		getone() {
			this.getTableList()
		},
		// 对接接口数据
		getTableList() {
			let model = {
				isMonth: this.datetype || 1
			}
			findFinancialMoneyInfo(model).then(res => {
				console.log(res)
				if (res.status == 200) {
					if (res.data.data && res.data.data.length > 0) {
                        this.tableData = res.data.data
                        let arr = []
                        this.tableData.forEach(e => {
                            arr.push(e.allOnLineMoney)
                            
                        })
                        console.log(arr)
					}
				}
			})

		},
		// 时间段的回调
		handledate() {
            this.getTableList(this.datetype)
            this.moneyEchart()
		},
		//   合计的方法
		getSummaries(param) {
			const { columns, data } = param
			const sums = []
			columns.forEach((column, index) => {
				if (index === 0) {
					sums[index] = '合计'
					return
				}
				const values = data.map(item => Number(item[column.property]))
				if (!values.every(value => isNaN(value))) {
					sums[index] = values.reduce((prev, curr) => {
						const value = Number(curr)
						if (!isNaN(value)) {
							let numsum = prev + curr
							let y = numsum.toFixed(2)
							return Number(y)
						} else {
							return prev
						}
					}, 0)
					sums[index] += ' 元'
				} else {
					sums[index] = ''
				}
			})
			return sums
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
                    date: e.date,
					allUnderLineMoney: e.allUnderLineMoney.toFixed(2),
					commissionUse: e.commissionUse.toFixed(2),
					allconsumMoney: e.allconsumMoney.toFixed(2),
					posttaxPrize: e.posttaxPrize.toFixed(2),
					todaySend: e.todaySend.toFixed(2),
					lotteryCard: e.lotteryCard.toFixed(2),
					lotteryCardUse: e.lotteryCardUse.toFixed(2),
					commissionUse: e.commissionUse.toFixed(2),
					saleCommissionMoney: e.saleCommissionMoney.toFixed(2),
                    platformCommissionMoney: e.platformCommissionMoney.toFixed(2),
				}
				this.newarr.push(newobj)
			})
			var model = {
				listParams: JSON.stringify(this.newarr),
				title: "财务资金明细"
			};
			console.log(model)
			exportExcle(model.listParams, model.title)
				.then(res => {})
			console.log(this.newarr)
			require.ensure([], () => {
				const { export_json_to_excel } = require('../../vendor/Export2Excel');
				const tHeader = ['编号', '日期', '线下充值', '提款', '消费', '税后奖金', '当日赠送', '红包嘉奖奖金使用', '彩卡金使用', '佣金使用', '销售佣金', '平台收佣']; //对应表格输出的title
                // const filterVal = this.newarr; // 对应表格输出的数据
                const filterVal = ['index','date','allUnderLineMoney','commissionUse','allconsumMoney','posttaxPrize', 'todaySend', 'lotteryCard', 'lotteryCardUse','commissionUse','saleCommissionMoney','platformCommissionMoney'];
				const list = this.tableData;
				const data = this.formatJson(filterVal, list);
				export_json_to_excel(tHeader, data, '财务资金明细'); //对应下载文件的名字
			})

		}
	}
}
</script>
<style scoped>
.row {
  padding: 10px 0 20px 0;
}
</style>

