<template>
    <div class="LuckyDraw">
        <div class="btnbox">
            <el-button type="primary" @click="addactivey">添加活动</el-button>
        </div>
          <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
            align="center"
            label="活动名称">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.activity_name }}</span>
            </template>
            </el-table-column>
            <el-table-column
            align="center"
            label="活动内容" >
            <template slot-scope="scope">
                <span>{{scope.row.content}}</span>
            </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="活动描述" >
                <template slot-scope="scope">
                    <span>{{scope.row.description}}</span>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="开始时间" >
                <template slot-scope="scope">
                    <span>{{scope.row.start_time | times}}</span>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="结束时间" >
                <template slot-scope="scope">
                    <span>{{scope.row.end_time | times}}</span>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="活动状态" >
                <template slot-scope="scope">
                    <span>
                        {{scope.row.is_switch | status}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="操作" algin="center">
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
        <!-- 添加活动的弹窗 -->
        <el-dialog
            :title="title"
            :visible.sync="dialogVisible"
            width="700px"
            >
            <div class="content">
                <div class="frow">
                    <el-row>
                        <el-col :span="4">
                            <div class="grid-content bg-purple">
                                活动名称
                            </div>
                        </el-col>
                        <el-col :span="18">
                            <div class="grid-content bg-purple">
                                <el-input v-model="aname"></el-input>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div class="frow">       
                    <el-row>
                        <el-col :span="4">
                            <div class="grid-content bg-purple">
                                活动内容
                            </div>
                        </el-col>
                        <el-col :span="18">
                            <div class="grid-content bg-purple">
                                <el-checkbox-group v-model="checkList">
                                    <el-checkbox  v-for="(name,index) in lables" :key="index" :label="name"></el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div class="frow">                
                    <el-row>
                        <el-col :span="4">
                            <div class="grid-content bg-purple">
                                活动描述
                            </div>
                        </el-col>
                        <el-col :span="18">
                            <div class="grid-content bg-purple">
                                <el-input v-model="description" type="textarea"></el-input>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div class="frow">                
                    <el-row>
                        <el-col :span="4">
                            <div class="grid-content bg-purple">
                                活动时间
                            </div>
                        </el-col>
                        <el-col :span="18">
                            <div class="grid-content bg-purple">
                                <el-date-picker
                                    v-model="stime"
                                    value-format="yyyy-MM-dd HH-mm-ss"
                                    type="datetimerange"
                                    placeholder="选择开始日期时间">
                                </el-date-picker>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div class="frow">                
                    <el-row>
                        <el-col :span="4">
                            <div class="grid-content bg-purple">
                                活动状态
                            </div>
                        </el-col>
                        <el-col :span="18">
                            <div class="grid-content bg-purple">
                                <el-switch
                                    v-model="Switchstatus"
                                    active-text="开启"
                                    inactive-text="关闭">
                                </el-switch>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="sure" v-if="title=='添加活动'">确 定</el-button>
                <el-button type="primary" @click="editsure" v-else>确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { getActivityData,addActivity } from '@/api/activity'
import { Message, MessageBox } from 'element-ui'
import setTime from './index.js'
export default {
    data() {
        return {
            tableData: [], //表格数据
            value3: '',
            title:'',
            dialogVisible: false,
            aname: '', // 活动名称
            description: '', //描述
            checkList: [], //选中的模块
            stime: [], //活动时间
            id:'', //每条数据的id
            Switchstatus:false,
            lables: [
                '竞彩足球',
                '竞彩篮球',
                '跟单详情页',
                '冠亚军',
                '数字彩',
                '北单',
                '老足彩'
            ],
            
            
        }
    },
    filters: {
        status(a) {
            return a ? '开启' : '关闭'
        },
        times(b) {
            return setTime(b)
        }
    },
    //获取数据
    created(){
        this.getTable();

    },
    methods: {
        getTable(){
            getActivityData().then(res => {
                this.tableData = res.data.data;
            }).catch(error => {
                Message.error(error)
            })
        },
        //添加活动
        addactivey(){
            this.aname=''
            this.checkList=[]
            this.description=''
            this.stime=[]
            this.Switchstatus==true
            this.title='添加活动'
            this.dialogVisible = true

        },
        //添加活动确定
        sure(){
             if(!this.aname){
                this.$message('请输入活动名称')
            }else if(!this.checkList){
                this.$message('请选择至少一个活动名称')
                
            }else if(!this.description){
                this.$message('请输入活动描述')
                
            }else if(this.stime.length==0){
                this.$message('请选择活动时间')
            }else{ 
                let is_switch;
                if(this.Switchstatus==true){
                   is_switch = 1
                }else{
                    is_switch = 0
                }  
                
                let form = {
                    activity_id:this.id ||'',
                    activity_name:this.aname,
                    content:this.checkList.join(','),
                    description:this.description,
                    end_time:this.stime[1],
                    is_edit:0 ,
                    start_time:this.stime[0],
                    is_switch
                }
                    
                addActivity(form).then(res =>{
                    if (res.data.error_code === 200) {
                         Message.success('添加信息成功');
                         this.dialogVisible = false;
                         this.getTable();
                          } else {
                               Message.error(res.data.message)
                               }
                })

            }
        },
        //编辑
        handleEdit(a){
            this.stime = [];
            this.title = "编辑活动"
            this.dialogVisible = true
            this.aname = a.activity_name
            this.id = a.id
            this.checkList = a.content.split(',')
            this.description = a.description
            this.stime.push(setTime(a.start_time))
            this.stime.push(setTime(a.end_time))
            if(a.is_switch==1){
                this.Switchstatus=true
            }else{
                this.Switchstatus = false
            }
        },
            //编辑确定
            editsure(){
                 if(!this.aname){
                this.$message('请输入活动名称')
            }else if(!this.checkList){
                this.$message('请选择至少一个活动名称')
                
            }else if(!this.description){
                this.$message('请输入活动描述')
                
            }else if(this.stime.length==0){
                this.$message('请选择活动时间')
            }else{
                let is_switch;
                if(this.Switchstatus==true){
                   is_switch = 1
                }else{
                    is_switch = 0
                }  
                
                let form = {
                    activity_id:this.id,
                    activity_name:this.aname,
                    content:this.checkList.join(','),
                    description:this.description,
                    end_time:this.stime[1],
                    is_edit:1 ,
                    start_time:this.stime[0],
                    is_switch
                }
                    
                addActivity(form).then(res =>{
                    if (res.data.error_code === 200) {
                         Message.success('修改信息成功');
                          this.dialogVisible = false;
                         this.getTable();
                          } else {
                               Message.error(res.data.message)
                               }
                })

            }
            }
        
    }
    
        }
    
</script>

<style scoped>
.LuckyDraw{
    padding: 0 20px;
}
.btnbox {
    padding: 20px 0;
}
div.frow {
    padding: 10px 0;
}
</style>