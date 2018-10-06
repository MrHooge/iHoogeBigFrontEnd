<template>
    <div>
        <el-button type="primary" style="margin:20px;" @click="addApparatus">添加打票机</el-button>
        <!-- 弹窗 -->
        <el-dialog
            title="添加打票机"
            :visible.sync="adddioalog"
            width="500px"
            >
            <el-row>
                <el-col :span="6">
                    <div class="grid-content bg-purple" style="line-height: 40px;">
                        请输入id：
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-light">
                        <el-input v-model="id" clearable></el-input>
                    </div>
                </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button @click="adddioalog = false">取 消</el-button>
                <el-button type="primary" @click="sure">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { addApparatus } from '@/api/ticket'
import { Message, MessageBox } from 'element-ui'
export default {
    data(){
        return{
            adddioalog: false,  //添加打票机跳出的弹窗
            id: '',   //输入的id
        }
    },
    filters:{
    },
    created(){
    },
    methods:{
        addApparatus(){
            this.adddioalog = true
        },
        //点击确认按钮 添加打票机
        sure(){
            let obj = {
                id: this.id
            }
            addApparatus(obj).then(res=> {
                console.log(res)
                if(res.data.error_code === 200){
                    this.adddioalog = false
                    this.$message.success(res.data.message)
                }else{
                    this.adddioalog = false
                    this.$message.error(res.data.message)
                }
            })
        }
    }
}
</script>

<style>
</style>