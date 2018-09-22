<template>
    <div>
       <el-form :inline="true" class="demo-form-inline" style="margin-top:50px;margin-left:50px;">
           <el-form-item label="数据抓取调整">
                <el-radio label="1" v-model="sourse">500万</el-radio>
                <el-radio label="2" v-model="sourse">飞鲸</el-radio>
            </el-form-item>
            <el-button type="primary" @click="reviseSpSourse">确认修改</el-button>
       </el-form> 
    </div>
</template>
<script>
import { getSpSourse , reviseSpSourse} from '@/api/sunburn'
import { Message, MessageBox } from 'element-ui'
export default {
    data(){
        return{
            sourse: ''
        }
    },
    created(){
        this.getSpSourse()
    },
    methods:{
        //获取当前竞彩足球SP抓取来源
        getSpSourse(){
            getSpSourse().then(res =>{
                if(res.data.error_code === 200){
                    this.sourse = res.data.data.toString()
                }
                else{
                    this.$message.error(res.data.message)
                }
            })
        },
        reviseSpSourse(){
            let obj = {
                sourse: this.sourse
            }
            reviseSpSourse(obj).then(res =>{
                if(res.data.error_code === 200){
                    this.$message.success(res.data.message)
                }
                else{
                    this.$message.error(res.data.message)
                }
            })
        }

    }
}
</script>

<style>
</style>