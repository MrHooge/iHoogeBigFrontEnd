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
        
	</div>
</template>

<script>
import { jiabai , currentjiabai} from '@/api/sys_user'
export default {
    data() {
        return {
            value:null,
		};
    },
    created(){
        this.currentjiabai()
    },
    methods: {
        callback(val){
            // console.log(val)
            if(val){
                this.switch(1)
            }else{
                this.switch(0)
            }
        },
        switch(a){
            console.log(a)
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