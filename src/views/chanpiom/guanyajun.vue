<template>
    <div class="crown">
        <div class="btns">
            <el-button type="primary" @click="defeat">开失败队伍</el-button>
            <el-button type="danger" @click="success">开成功队伍</el-button>
            <el-button>
                <el-switch
                    v-model="value3"
                    active-text="开"
                    @change="callback"
                    inactive-text="关">
                </el-switch>
            </el-button>
        </div>

          <el-table
            ref="multipleTable"
            :data="tableData3"
            tooltip-effect="dark"
            border
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
            type="selection">
            </el-table-column>
            <el-table-column
            label="国旗"
            align="center"
            >
            <template slot-scope="scope">
                <!-- {{ scope.row.nationalFlag.indexOf()}} -->
                <img :src="scope.row.nationalFlag.substring(0,scope.row.nationalFlag.indexOf('—'))" alt="">
                —
                <img :src="scope.row.nationalFlag.substring(scope.row.nationalFlag.indexOf('—')+1)" alt="">
            </template>
            </el-table-column>
            <el-table-column
                prop="sellStatus"
                label="售票状态"
                align="center"

                >
            </el-table-column>
            <el-table-column
            prop="sp"
            label="sp值"
            align="center"

            show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="supportRate"
                label="支持率"
            align="center"

                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="teamId"
                label="队伍ID"
            align="center"

                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="teamName"
            align="center"
                label="队伍名称"
                show-overflow-tooltip>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData3: [],
            selecons:[],
            value3:null,
        }
    },
    created() {
        this.getAll()
    },
    methods: {
        handleSelectionChange(val) {
            this.selecons = val
        },
        getAll() {
            this.$ajax.get(api.lottery + '/champion/getMatchUpList').then(res => {
                this.tableData3 = res.data
                this.gameOpen = res.isOpen
                if(res.isOpen==1){
                    this.value3 = true
                }else{
                    this.value3 = false
                }
            })
        },
        defeat(){
            if(this.selecons&&this.selecons.length>0){
                let arr = [] 
                this.selecons.forEach(e=>{
                    arr.push(e.id)
                })
                let model = {
                    matchIdList:arr.join(',')
                }
                this.$ajax.get(api.lottery + '/champion/putFailTeam',model).then(res => {
                    if(res.error_code==200){
                        this.$message(res.message)
                        this.getAll()
                    }else{
                        this.$message(res.message)
                    }
                })
            }else{
                this.$message('请至少选择一个队伍！')
            }
        },
        success(){
             if(this.selecons.length>0&&this.selecons.length<2){
                let arr = [] 
                this.selecons.forEach(e=>{
                    arr.push(e.teamId)
                })
                let model = {
                    teamId:arr.join(','),
                    type:2
                }
                this.$ajax.get(api.lottery + '/champion/putSuccessTeam',model).then(res => {
                    if(res.error_code==200){
                        this.$message(res.message)
                        this.getAll()
                    }else{
                        this.$message(res.message)
                    }
                })
            }else if(this.selecons.length > 1){
                this.$message('只能选择一个队伍！')
            }else{
                this.$message('请选择一个队伍！')
            }
        },
                // switch的回调
        callback(val){
            if(val){
                this.open(1)
            }else{
                this.open(2)
            }
        },
                // 开停售
        open(a){
            let model = {
                type:a
            }
            this.$ajax.get(api.lottery +'/champion/openAndClose',model).then(res=>{
                if(res.error_code==200){
                    this.$message('设置' + res.message)
                    this.getAll()
                }else{
                    this.$message(res.message)
                }
            })
        }
    }
}
</script>

<style scoped>
.crown{
    padding: 10px 20px
}
div.btns{
    padding: 10px 0;
}
</style>