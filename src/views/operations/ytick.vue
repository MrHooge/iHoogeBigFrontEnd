<template>
<!-- //  运营寻票操作 -->
    <div class="recordtick app-container">
        <el-row :gutter="30">
            <el-col :span="3">
                <div class="grid-content bg-purple-dark">
                    <div class="custname">
                        提交关注的客户名
                    </div>
                </div>
            </el-col>
            <el-col :span="5">
                <div class="grid-content bg-purple-dark">
                <el-input
                    placeholder="请输入客户名"
                    v-model="custormsname"
                clearable>
                </el-input>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple-dark">
                    <div class="custname0">{{ custormsname }}</div>
                </div>
            </el-col>
            <el-col :span="3">
                <div class="grid-content bg-purple-dark">
                  <el-button type="primary">提交</el-button>
                </div>
            </el-col>
        </el-row> 
        <div class="lastrow">
            <el-row :gutter="30">
                <el-col :span="3">
                    <div class="grid-content bg-purple-dark">
                        <div class="custname">
                            寻票票号N0.
                        </div>
                    </div>
                </el-col>
                <el-col :span="5">
                    <div class="grid-content bg-purple-dark">
                    <el-input
                        placeholder="请输入票号数字"
                        v-model="ticknum"
                    clearable>
                    </el-input>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-dark">
                        <div class="custname0">{{ ticknum }}</div>
                    </div>
                </el-col>
                <el-col :span="3">
                    <div class="grid-content bg-purple-dark">
                    <el-button type="primary">提交</el-button>
                    </div>
                </el-col>
            </el-row>    
        </div>  
        <div class="shuoming">
            
            
            <p class="colr1">
                <i class="el-icon-star-on"></i>
               查询结果：根据判断显示结果，已提交。
            </p>

            <p class="colr1">
                <i class="el-icon-star-on"></i>
                使用规则
            </p>

            <p>1、比赛投注截止时间前3分钟后无法使用</p>
            
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
               custormsname: '',
               ticknum: '' 
            }
        }
    }
</script>

<style lang="scss" scoped>
.recordtick{
    color: #444;
    padding:2% 10px;
    font-size: 15px;
    div.lastrow{
        padding: 20px 0;
    }
    div.shuoming {
    border: 1px solid #fff;
    border-radius: 8px;
    padding: 10px 20px;
    width: 475px;
    margin-top: 50px;
    background-color: #f9f9f9;
    box-shadow: 0px 0px 15px #999;
        p{
            font-size: 14px;
            line-height: 30px;
        }
        p.colr1{
            color:#E6A23C;
            font-size: 15px;
        }
    }
 
    .custname{
        text-align: left;
        line-height: 36px;
    }
    .custname0{
        text-align: center;
        line-height: 36px;
        width: 100%;
    }
}

</style>