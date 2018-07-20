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
        <div class="gift">
                  <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
            align="center"
            label="用户账号">
            </el-table-column>
            <el-table-column
            align="center"
            label="彩金卡名字" >
            </el-table-column>
            <el-table-column
                align="center"
                label="获得时间" >
            </el-table-column>
            <el-table-column
                align="center"
                label="截至时间" >
            </el-table-column>
            <el-table-column
                align="center"
                label="满额度使用" >
            </el-table-column>
            <el-table-column
                align="center"
                label="金额" >
            </el-table-column>
            <el-table-column label="获得渠道" algin="center">
              <el-table-column
                align="center"
                label="使用状态" >
            </el-table-column>
            <el-table-column
                align="center"
                label="使用时间" >
            </el-table-column>
            <template slot-scope="scope">
                <el-button
                size="mini"
                type="primary"
                @click="handleEdit(scope.row)">编辑</el-button>
                <!-- <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row)">删除</el-button> -->
            </template>
            </el-table-column>
        </el-table>
        </div>
        </div>
  </div>
</template>

<script>
import { addGoldCard } from '@/api/activity'
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
                    let newobj = JSON.stringify(arr.push(obj))
                    addGoldCard(newobj).then(res => {
                      if(res.data.error_code === 200){
                        Message.success('保存成功');
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
