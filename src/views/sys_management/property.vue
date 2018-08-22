<!--  -->
<template>
  <div class="app-container">
    <el-button v-waves type="primary" @click="showDailag">添加权限</el-button>

    <!-- <tree-table style="width: 100%; margin-top: 20px" :data="totalData" :columns="columns" border>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" @click="showDailag(scope.row)" icon="el-icon-edit"></el-button>
        </template>
      </el-table-column>
    </tree-table> -->
    <el-table
    :data="tableData"
    border
    style="width: 100%; margin-top: 20px">
      <el-table-column
        prop="id"
        label="权限ID"
        width="80"
        align="center">
      </el-table-column>
      <el-table-column
        prop="model_name"
        label="权限名称"
        width="180"
        align="center">
      </el-table-column>
      <el-table-column
        prop="model_url"
        label="权限路径"
        align="center">
      </el-table-column>
      <el-table-column
        prop="parent_name"
        label="模块名称"
        align="center">
      </el-table-column>
      <el-table-column
        prop="descriprion"
        label="权限描述"
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
    <div class="block">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-count="totalPages"
        :current-page="page"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalList"
        style="width: 100%; margin-top: 20px">
      </el-pagination>
    </div>

    <!-- 修改权限 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="权限ID" :label-width="formLabelWidth" v-if="form.child_id || dialogType=='modify'">
          <el-input v-model="form.child_id" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限名称" :label-width="formLabelWidth">
          <el-input v-model="form.model_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限路径" :label-width="formLabelWidth">
          <el-input v-model="form.model_url" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="模块名称" :label-width="formLabelWidth">
          <el-select v-model="form.model_parent" placeholder="请选择模块">
            <el-option :label="permission.name" :value="permission.id" v-for="permission in permissions" :key="permission.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="form.descriprion" auto-complete="off"></el-input>
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
import { findAllChildModel, updateChildModelInfo, addPermission, findAllParentModel } from '@/api/sys_user'
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
      permissions: [],
      dialogFormVisible: false,
      form: {
        child_id: '',
        descriprion: '',
        model_name: '',
        model_parent: '',
        model_url: ''
      },
      formLabelWidth: '120px',
      page: 1,
      pageSize: 20,
      totalPages: 0,
      totalList: 0
    }
  },
  created() {
    this.getAllChildModel('', 1, 10)
  },
  directives: {
    waves
  },
  methods: {
    // 查询所有子模块
    getAllChildModel(id, page, pageSize) {
      findAllChildModel(id, page, pageSize).then(res => {
        if (res.data.error_code === 200) {
          this.tableData = res.data.data.list
          this.page = res.data.data.pageNum
          this.pageSize = res.data.data.pageSize
          this.totalPages = res.data.data.pages
          this.totalList = res.data.data.total
        }
      }).catch(error => {
        Message.error(error)
      })
    },
    showDailag(data, type) {
      if (type === 'modify') {
        this.dialogTitle = '修改权限信息'
        this.dialogType = 'modify'
        this.form.descriprion = data.descriprion
        this.form.child_id = data.id
        this.form.model_name = data.model_name
        this.form.model_parent = data.model_parent
        this.form.model_url = data.model_url
        this.form.parent_name = data.parent_name
        this.dialogType = type
      } else {
        this.dialogTitle = '添加权限'
        this.dialogType = 'add'
        this.form = {}
      }
      this.getFindAllParentModel()
      this.dialogFormVisible = true
      // console.log(data)
    },
    submitInfos() {
      console.log(this.form)
      if (this.dialogType === 'modify') {
        this.form.desciption = this.form.descriprion
        updateChildModelInfo(this.form).then(res => {
          if (res.data.error_code === 200) {
            Message.success('修改权限成功')
          } else {
            Message.error(res.data.message)
          }
        })
      } else {
        const obj = {
          desc: this.form.descriprion,
          modeParentId: this.form.model_parent,
          modelName: this.form.model_name,
          modelUrl: this.form.model_url
        }
        addPermission(obj).then(res => {
          if (res.data.error_code === 200) {
            Message.success('添加权限成功')
          } else {
            Message.error(res.data.message)
          }
        }).catch(error => {
          Message.error(error)
        })
      }
      const _this = this
      setTimeout(() => {
        _this.getAllChildModel('', this.page, this.pageSize)
      }, 800)
      this.dialogFormVisible = false
    },
    getFindAllParentModel(id) {
      if (!id) {
        id = ''
      }
      let obj = {}
      if (id) {
        obj.id = id
      } else {
        obj = ''
      }
      console.log(obj)
      findAllParentModel(obj).then(res => {
        if (res.data.error_code === 200) {
          this.permissions = res.data.data
        }
      }).catch(error => {
        Message.error(error)
      })
    },
    // 每页条数
    handleSizeChange(num) {
      this.getAllChildModel('', this.page, num)
    },
    // 当前页数据
    handleCurrentChange(num) {
      this.getAllChildModel('', num, this.pageSize)
    }
  }
}
</script>

<style scoped>

</style>