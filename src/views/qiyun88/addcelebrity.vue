 <template>
 <div class="main">
     <el-form :inline="true" class="demo-form-inline" style="text-align: center;margin-top:50px;">
        <el-form-item label="红人" v-model="redman">
            <el-input
                placeholder="请输入红人"
                v-model="redman.red01"
                clearable
                >
            </el-input>
            <el-input
                placeholder="请输入红人"
                v-model="redman.red02"
                clearable
                >
            </el-input>
            <el-input
                placeholder="请输入红人"
                v-model="redman.red03"
                clearable
                >
            </el-input>
            <el-input
                placeholder="请输入红人"
                v-model="redman.red04"
                clearable
                >
            </el-input>
            <el-input
                placeholder="请输入红人"
                v-model="redman.red05"
                clearable
                >
            </el-input>
             <el-input
                placeholder="请输入红人"
                v-model="redman.red06"
                clearable
                >
            </el-input>
             <el-input
                placeholder="请输入红人"
                v-model="redman.red07"
                clearable
                >
            </el-input>
             <el-input
                placeholder="请输入红人"
                v-model="redman.red08"
                clearable
                >
            </el-input>
        </el-form-item>
        <el-form-item label="内容">
            <el-input
                placeholder="请输入内容"
                v-model="content01"
                clearable
                >
            </el-input>
            <el-input
                placeholder="请输入内容"
                v-model="content02"
                clearable
                >
            </el-input>
            <el-input
                placeholder="请输入内容"
                v-model="content03"
                clearable
                >
            </el-input>
            <el-input
                placeholder="请输入内容"
                v-model="content04"
                clearable
                >
            </el-input>
            <el-input
                placeholder="请输入内容"
                v-model="content05"
                clearable
                >
            </el-input>
            <el-input
                placeholder="请输入内容"
                v-model="content06"
                clearable
                >
            </el-input>
            <el-input
                placeholder="请输入内容"
                v-model="content07"
                clearable
                >
            </el-input>
            <el-input
                placeholder="请输入内容"
                v-model="content08"
                clearable
                >
            </el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">增加</el-button>
        </el-form-item>
    </el-form>
 </div>
    
</template>
<script>
import { addCelebrity} from '@/api/sunburn'
export default {
    data(){
        return{
            accounts: '',
            
            content01: '',
            content02: '',
            content03: '',
            content04: '',
            content05: '',
            content06: '',
            content07: '',
            content08: '',

            redman: {
                red01: '',
                red02: '',
                red03: '',
                red04: '',
                red05: '',
                red06: '',
                red07: '',
                red08: '',
            },
        }
    },
    created() {
    },
    methods:{
        onSubmit() {
            let arr = []
            for(var i in this.redman) {
                
                if(this.redman[i] != ''){
                    arr.push(this.redman[i])
                }
            }
            this.accounts = arr.join(',')
            let obj = {
                accounts: this.accounts,
            }
            addCelebrity(obj)
                .then(res => {
            })
        }
    },
}
</script>
<style scoped>
.el-form--inline .el-form-item {
    display: inline-block;
    margin-right: 10px;
    vertical-align: top;
    width: 25%;
}
.main >>> .el-input__inner{
    display: block;
    margin-bottom: 20px;
}
</style>
