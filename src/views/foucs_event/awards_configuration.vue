<template>
   <div class="setingprize">
         <el-button type="primary" @click="prizelayer">
               设置加奖
         </el-button>
         <el-button type="primary" @click="addPrize">
               修改加奖上限
         </el-button>
          <!-- 弹窗 -->
        <el-dialog
            title="编辑加奖上限"
            :visible.sync="adddioalog"
            width="500px"
            >
            <el-row>
                <el-col :span="4"><div class="grid-content bg-purple">
                    加奖上限值
                </div></el-col>
                <el-col :span="12"><div class="grid-content bg-purple-light">
                    <el-input v-model="val" type="number"></el-input>
                </div></el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button @click="adddioalog = false">取 消</el-button>
                <el-button type="primary" @click="sure">确 定</el-button>
            </span>
        </el-dialog>
         <div style="margin:10px 0;"></div>
         <el-table
            :data="eventslist"
            border
            style="width: 100%">
            <el-table-column
            prop="lotteryType"
            label="彩种" align="center">
            </el-table-column>
            <el-table-column
            prop="minAmount" align="center"
            label="最低金额方案">
            </el-table-column>
            <el-table-column
            prop="playType" align="center"
            label="玩法">
            </el-table-column>
            <el-table-column
               prop="rate" align="center"
               label="加奖比例">
               <!-- <template slot-scope="scope">
                  <span>{{scope.row.rate*100 + '%'}}</span>
               </template>  -->
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
            >
            </el-pagination>
         </div>
         <!-- 引入弹窗 -->
         <el-dialog
            :title="headername"
            :visible.sync="dialogVisible"
            width="600px">
               <div class="settingprize">
                  <div class="frow">
                     <el-row>
                        <el-col :span="5">
                           <div class="grid-content bg-purple-dark">
                              <div class="kindname">
                                    彩种:
                              </div>
                           </div>
                        </el-col>
                        <el-col :span="14">
                           <div class="grid-content bg-purple-dark">
                              <el-select v-model="value" placeholder="请选择一个彩种" @change="getval">
                                 <el-option 
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                 </el-option>
                              </el-select>
                           </div>
                        </el-col>
                     </el-row>
                  </div>
                  <div class="frow">
                     <el-row>
                        <el-col :span="5">
                           <div class="grid-content bg-purple-dark">
                              <div class="kindname">
                                    金额方案:
                              </div>
                           </div>
                        </el-col>
                        <el-col :span="14">
                           <div class="grid-content bg-purple-dark">
                              <el-input v-model.number="amount" placeholder="请输入最小方案金额" style="width: 215px;" type="number"></el-input>
                           </div>
                        </el-col>
                     </el-row>
                  </div>
                  <div class="frow">
                        <el-row>
                           <el-col :span="5">
                              <div class="grid-content bg-purple-dark">
                                 <div class="kindname">
                                       玩法选择:
                                 </div>
                              </div>
                           </el-col>
                           <el-col :span="19">
                              <div class="grid-content bg-purple-dark">
                                 <el-checkbox-group v-model="checkedPlays" @change="handplay">
                                    <el-checkbox v-for="(play,index) in playgames" :label="play.value" :key="index" border>{{play.name}}</el-checkbox>
                                 </el-checkbox-group>
                              </div>
                           </el-col>
                        </el-row>
                     </div>
                     <div class="frow">
                        <el-row>
                           <el-col :span="5">
                              <div class="grid-content bg-purple-dark">
                                 <div class="kindname">
                                       加奖率:
                                 </div>
                              </div>
                           </el-col>
                           <el-col :span="14">
                              <div class="grid-content bg-purple-dark">
                                 <el-input v-model.number="num" placeholder="请输入0-1之间的小数" style="width: 215px;" type="number"></el-input>
                              </div>
                           </el-col>
                        </el-row>
                     </div>
               </div>
            <span slot="footer" class="dialog-footer">
               <el-button @click="dialogVisible = false">取 消</el-button>
               <el-button type="primary" @click="Bonus" v-if="headername=='设置加奖'">确 定</el-button>
               <el-button type="primary" @click="editSure" v-else>确 定</el-button>
            </span>
         </el-dialog>
   </div>
</template>
<script>
import { getAddPirzeConfigList,setAddPrize,getMaxAddPrize,updateMaxAddPrize } from '@/api/events'
import { Message, MessageBox } from 'element-ui'
const cityOptions = [
   { name: '自由过关', value: 116 },
   { name: '单关', value: 117 },
   { name: '2串1', value: 118 },
   { name: '3串1', value: 119 },
   { name: '4串1', value: 120 },
   { name: '5串1', value: 121 },
   { name: '6串1', value: 122 },
   { name: '7串1', value: 123 },
   { name: '8串1', value: 124 }
]
export default {
   data() {
      return {
         eventslist: [],
         total: 0,
         val:'',//加奖上限值
         adddioalog:false,
         headername:'',
         dialogVisible:false,
         currentPage:1,
         options: [
            {
               value: '49',
               label: '竞彩足球胜平负/让球'
            },
            {
               value: '42',
               label: '竞彩足球混合过关'
            },
            {
               value: '35',
               label: '竞彩足球比分'
            },
            {
               value: '36',
               label: '竞彩足球进球数'
            },
            {
               value: '37',
               label: '竞彩足球半全场'
            },
            {
               value: '304',
               label: '竞彩篮球单关投注'
            },
            {
               value: '30',
               label: '竞彩篮球胜负'
            },
            {
               value: '31',
               label: '竞彩篮球让分胜负'
            },
            {
               value: '32',
               label: '竞彩篮球胜分差'
            },
            {
               value: '33',
               label: '竞彩篮球大小分'
            },
            {
               value: '43',
               label: '竞彩篮球混合过关'
            }
         ],
         value: '', // 选中的彩种
         amount: '', // 金额方案
         num: '', // 加奖率
         checkedPlays: [], // 选中的玩法
         playgames: cityOptions,
         page:1,
         pageSize:20
      }
   },
   created() {
      this.getTable()
   },
   methods: {
      // 设置加奖
      prizelayer(){
         this.headername = "设置加奖"
         this.dialogVisible = true
      },
      // 获取表格数据
      getTable() {
         let obj = {
            page: this.page,
            pageSize: this.pageSize
         }
         getAddPirzeConfigList(obj).then(res => {
             console.log(res.data.data)
             this.eventslist = res.data.data
         }).catch(error => {
             Message.error(error)
         })
         
      },
      //分页
      handleCurrentChange(num){
            this.page = num;
            this.getTable()
        },
        //改变页面大小
        handleSizeChange(num){
            this.pageSize = num;
            this.getTable()
        },
    //   修改当日加奖上限
      addPrize(){
        //   获取当日上限
        
        getMaxAddPrize().then(res => {
            if(res.data.error_code == 200){    
                this.adddioalog = true
                this.val = res.data.data
            }
        })
      },
    //   加奖上限的弹窗修改
        sure(){
            if(!this.val){
                this.$message('不能为空')
            }else{
                let maxAddPrize = this.val;
               updateMaxAddPrize(maxAddPrize)
               .then(res => {
                   console.log(res.data)
                   if(res.data.error_code == 200){
                       this.$message(res.data.message)
                       this.adddioalog = false
                   }
               })
            }
        },
       // 下拉的回调
      getval() {
         console.log(this.value)
      },
      // 选择框的回调
      handplay(value) {
         this.checkedPlays = value
      },
      // 将数据保存到接口
      Bonus() {
         if (!this.value) {
            this.$message('请选择一个彩种')
         } else if (this.num >= 1 || this.num < 0) {
            this.$message('请输入0-1之间的小数')
         } else {
            let newobj = {
               lotteryType: this.value,
               minAmount: this.amount || 0,
               playTypes: this.checkedPlays.join(','),
               rate: this.num || 0
            }
           setAddPrize(newobj)
           .then(res => {
                  if (res.status == 200) {
                     if (res.data.error_code == 200) {
                        this.$message(res.data.message)
                        this.checkedPlays = [];
                        this.value = ''
                        this.num  = ''
                        this.amount = ''
                        this.dialogVisible = false
                        this.getTable()
                     } else {
                        this.$message(res.data.message)
                     }
                  }
               })
         }
      },
      // 添加数据
      // 编辑
      edit(a){
         this.headername = "编辑加奖"
         this.dialogVisible = true
         let play =  this.options.filter(e =>{
            return a.lotteryType == e.label
         })
         this.value = play[0].value
         this.amount = a.minAmount
         // 将字符串分割成数组
         let playsArr = a.playType.split(',')
         let opt=[];
         this.playgames.forEach(s =>{
           playsArr.forEach(j => {
               if(j==s.name){
                  opt.push(s)
               }
            });
         })
         opt.forEach(k =>{
            this.checkedPlays.push(k.value)
         })
         this.num = a.rate
      },
      // 编辑按钮的弹窗的确定回调
      editSure(){
         // 获取修改后的值(判断)
         if (!this.value) {
            this.$message('请选择一个彩种')
         } else if (this.num >= 1 || this.num < 0) {
            this.$message('请输入0-1之间的小数')
         } else {
            let obj = {
               lotteryType: this.value,
               minAmount: this.amount || 0,
               playTypes: this.checkedPlays.join(','),
               rate: this.num || 0
            }
            this.$http
               .get(api.lottery + '/lottery/updateAddPirzeConfig', { params: obj })
               .then(res => {
                  if (res.status == 200) {
                     if (res.data.error_code == 200) {
                        this.$message(res.data.message)
                        this.checkedPlays = [];
                        this.value = ''
                        this.num  = ''
                        this.amount = ''
                        this.dialogVisible = false
                        this.getTable(1)
                     } else {
                        this.$message(res.data.message)
                     }
                  }
               })
         }
      }
   }
}
</script>

<style scoped>
.setingprize{
    padding: 10px 20px
}
div.page{
   padding: 10px 0;
}
div.frow {
   padding: 10px 0;
}
div.btn {
   padding: 10px 140px;
   /* float: right; */
}
div.kindname {
   line-height: 32px;
   color: #666;
   font-size: 14px;
   text-align: right;
   padding-right: 30px;
}
.el-checkbox {
   display: block !important;
   width: 100px;
   float: left;
   margin-top: 10px;
   margin-right: 10px;
}
.el-checkbox + .el-checkbox {
   margin-left: 0 !important;
}
</style>