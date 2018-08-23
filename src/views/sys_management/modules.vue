<!--  -->
<template>
  <div class="app-container">
    <el-button v-waves type="primary" @click="showDailag">添加模块</el-button>
    <el-table
    :data="tableData"
    border
    style="width: 100%; margin-top: 20px">
      <!-- <el-table-column
        prop="id"
        label="模块ID"
        width="100"
        align="center">
      </el-table-column> -->
      <el-table-column
        prop="name"
        label="模块名称"
        width="180"
        align="center">
      </el-table-column>
      <el-table-column
        prop="MEMO"
        label="模块描述"
        align="center">
      </el-table-column>
      <el-table-column
        label="操作"
        align="center">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" @click="showDailag(scope.row, 'modify')" icon="el-icon-edit"></el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 修改权限 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="模块ID" :label-width="formLabelWidth" v-if="dialogType=='modify'">
          <el-input v-model="form.model_id" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="模块名称" :label-width="formLabelWidth">
          <el-input v-model="form.modelName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="模块描述" :label-width="formLabelWidth">
          <el-input v-model="form.desc" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitInfos">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { findAllParentModel, addParentModel, updateParentModel } from '@/api/sys_user'
import waves from '@/directive/waves/index.js' // 水波纹指令
import { Message } from 'element-ui'
import treeTable from '@/components/TreeTable'
export default {
  components: { treeTable },
  data() {
    return {
      dialogTitle: '添加权限',
      dialogType: 'add',
      tableData: [],
      dialogFormVisible: false,
      form: {
        model_id: '',
        desc: '',
        modelName: ''
      },
      formLabelWidth: '120px'
    }
  },
  created() {
    this.getFindAllParentModel()
  },
  directives: {
    waves
  },
  methods: {
    // 查询所有模块
    getFindAllParentModel(id) {
      findAllParentModel(id).then(res => {
        if (res.data.error_code === 200) {
          this.tableData = res.data.data
        }
      }).catch(error => {
        Message.error(error)
      })
    },
    showDailag(data, type) {
      if (type === 'modify') {
        this.dialogTitle = '修改模块信息'
        this.dialogType = 'modify'
        this.form.desc = data.MEMO
        this.form.model_id = data.id
        this.form.modelName = data.name
        this.dialogType = type
      } else {
        this.dialogTitle = '添加模块'
        this.dialogType = 'add'
        this.form = {}
      }
      this.dialogFormVisible = true
    },
    submitInfos() {
      console.log(this.form)
      console.log(this.dialogType)
      if (this.dialogType === 'modify') {
        updateParentModel(this.form).then(res => {
          if (res.data.error_code === 200) {
            Message.success('修改模块成功')
          } else {
            Message.error(res.data.message)
          }
        })
      } else {
        addParentModel(this.form).then(res => {
          if (res.data.error_code === 200) {
            Message.success('添加模块成功')
          } else {
            Message.error(res.data.message)
          }
        }).catch(error => {
          Message.error(error)
        })
      }
      const _this = this
      setTimeout(() => {
        _this.getFindAllParentModel()
      }, 800)
      this.dialogFormVisible = false
    }
  }
}
</script>

<style scoped>

</style>