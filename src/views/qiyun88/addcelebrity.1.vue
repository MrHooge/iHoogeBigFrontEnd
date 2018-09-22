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
    <p style="padding-left:200px;">备注：没有添加红人的位置会为空，需要每一个都添加一遍！</p>
    <div style="text-align:center;">
        <p>当前的红人列表</p>
        <el-table
            :data="navLi"
            border
            style="width:50%;text-align:center;margin:0 auto;">
            <el-table-column
            prop="account"
            label="账号">
            </el-table-column>
            <el-table-column
            prop="username"
            label="昵称">
            </el-table-column>
        </el-table>
    </div>
    
 </div>
    
</template>
<script>
import { addCelebrity,getSuperMan,} from '@/api/sunburn'
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
            navLi: [],
        }
    },
    created() {
        this.getList()
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
            addCelebrity(obj).then(res => {
                if(this.accounts === ''){
                    this.$message.error('请输入你要添加的红人账号！')
                }
                else{
                    if(res.data.error_code == 200){
                        this.$message.success(res.data.message)
                    }else{
                        this.$message.error(res.data.message)
                    }
                }
                
            })
        },
        getList () {
			//  超级大神列表
			// this.$axios.get(api.member + '/user/getSuperMan').then(res => {
			// 	console.log(res)
			// 	if (res.data.data.length > 0) {
			// 		this.navLi = this.removeEmptyArrayEle(res.data.data)
			// 	} else {
			// 		this.hren = true
			// 	}
            // })

            getSuperMan().then(res =>{
                console.log(res)
                this.navLi = this.removeEmptyArrayEle(res.data.data)
            })
        },
        removeEmptyArrayEle (arr) {
			for (var i = 0; i < arr.length; i++) {
				if (arr[i] == undefined) {
					arr.splice(i, 1)
					i = i - 1 // i - 1 ,因为空元素在数组下标 2 位置，删除空之后，后面的元素要向前补位，
					// 这样才能真正去掉空元素,觉得这句可以删掉的连续为空试试，然后思考其中逻辑
				}
			}
			return arr
		},
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
.main >>> .is-leaf{
    text-align: center;
}
</style>
