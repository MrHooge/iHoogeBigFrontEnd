<template>

	<div class="content">
        <div class="box">
            <div class="title">加白管理</div>
            <span class="item">自动加白设置</span>
            <div class="switch">               
                <el-switch
                    v-model="value"
                    active-text="开"
                    @change="callback"
                    inactive-text="关">
                </el-switch>
            </div>
        </div>
        <div style="width:50%;margin: 0 auto;text-align:center;margin-top:50px;">
            <span>客户当日下单超限提醒</span>
            <el-input type="number" placeholder="请输入数量" v-model="num" style="width:200px;"></el-input>
            <el-button type="primary" @click="remind">配置</el-button>
        </div>
        
	</div>
</template>

<script>
import { jiabai , currentjiabai} from '@/api/sys_user'
import { updateRemindNum } from '@/api/events'
export default {
    data() {
        return {
            value:null,
            num: '',  //存储数量
		};
    },
    created(){
        this.currentjiabai()
    },
    methods: {
        //配置订单数量提醒
        remind(){
            let obj = {
                num: this.num
            }
            updateRemindNum(obj).then(res => {
                if(res.data.error_code === 200){
                    this.$message.success(res.data.message)
                    this.num = ''
                }else{
                    this.$message.error(res.data.message)
                }
            })
        },
        callback(val){
            if(val){
                this.switch(1)
            }else{
                this.switch(0)
            }
        },
        switch(a){
            let obj={
                status:a
            }
            jiabai(obj).then(res => {})          
        },
        currentjiabai(){
            currentjiabai().then(res=>{
                this.value=res.data.data
            })
        }   
        
    }
    
}
</script>

<style lang="scss" scoped>
.box{
    width: 800px;
    height: 120px;
    border: 1px solid #dedede;
    border-radius: 20px;
    margin: 0 auto;
    margin-top:50px;
    padding-top: 20px;
    box-sizing: border-box;
}
.title{
    width: 100px;
    height: 20px;
    margin: 0px auto;
    margin-bottom: 20px;
}
.item{
    display: inline-block;
    float: left;
    margin:0 100px;
    margin-bottom: 40px;
}
.switch{
    margin:0 100px;
    float: right;
}
</style>