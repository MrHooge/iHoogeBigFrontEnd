<!-- 活动管理 -->
<template>
  <div class="activityGiftcard">
    <div class="btnbox">
            <el-button type="primary" @click="givemoney">充值送彩金卡</el-button>
             <el-dialog
            title="充值送彩金卡"
            :visible.sync="dialogVisible"
            width="500px">
            <div class="">
                <el-row>
                    <el-col :span="4">
                        <div class="grid-content bg-purple">
                            用户名
                        </div>
                    </el-col>
                    <el-col :span="15">
                        <div class="grid-content bg-purple-light">
                            <el-input v-model="username" placeholder="请输入用户名"></el-input>
                        </div>
                    </el-col>
                </el-row>
                <br>
                <el-row>
                    <el-col :span="4">
                        <div class="grid-content bg-purple">
                            金额
                        </div>
                    </el-col>
                    <el-col :span="15">
                        <div class="grid-content bg-purple-light">
                            <!-- <el-input v-model="money" placeholder="请输入赠送金额" type="number"></el-input> -->
                            <el-select v-model="money" placeholder="请选择">
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
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="sure">确 定</el-button>
            </span>
        </el-dialog>
      
        </div>
  </div>
</template>

<script>
import { addGoldCard } from '@/api/activity'
import { Message, MessageBox } from 'element-ui'
export default {
         data() { 
              return {
                dialogVisible:false,
                username:'',
                options:[
                  {
                    value:'888',
                    label:'888元彩金卡'
                  },
                  {
                    value: '288',
                    label: '288元彩金卡'
                    },
                {
                    value: '128',
                    label: '128元彩金卡'
                    },
                {
                    value: '64',
                    label: '68元彩金卡'
                    },
                {
                    value: '28',
                    label: '28元彩金卡'
                    },
                {
                    value: '8',
                    label: '8元彩金卡'
                    },
                {
                    value: '5',
                    label: '5元彩金卡'
                    },
                {
                    value: '2',
                    label: '2元彩金卡'
                    },
                ],
                money:''

    }
                 },
                 components: {},
                 methods:{
                   //弹出框
                   givemoney(){
                     this.money = '',
                     this.username = '',
                     this.dialogVisible = true
                   },
                   //确定按钮的回调
                   sure(){
                     let arr = []
                     let obj = {
                       account: this.username,
                       money: this.money,
                       require_type: 2
                     }
                     arr.push(obj);
                    let newobj = JSON.stringify(arr)
                    //console.log(newobj);
                    addGoldCard(newobj).then(res => {
                      if(res.data.error_code === 200){
                          this.$message(res.data.message)
                        //Message.success(res.message);
                        this.dialogVisible = false
                      }
                    })

                   }

                 }
}
</script>

<style scoped>
.activityGiftcard{
    padding: 0 20px;
}
.btnbox {
    padding: 20px 0;
}
div.gift {
    padding: 10px 0;
}
</style>
