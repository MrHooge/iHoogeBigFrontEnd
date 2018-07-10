<!--  -->
<template>
  <div class="app-container">
    <el-button v-waves type="primary" @click="showDailag">添加角色</el-button>
    <el-table
      :data="tableData"
      border
      style="width: 100%; margin-top: 20px">
      <el-table-column
        prop="id"
        label="角色ID"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="NAME"
        label="角色名称"
        align="center">
      </el-table-column>
      <el-table-column
        prop="memo"
        label="角色描述"
        align="center">
      </el-table-column>
      <el-table-column
        label="操作"
        align="center">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" @click="showView(scope.row, 'view')" icon="el-icon-view"></el-button>
            <el-button type="primary" @click="showView(scope.row, 'modify')" icon="el-icon-edit"></el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加角色 -->
    <el-dialog title="添加角色" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="添加名称" :label-width="formLabelWidth">
          <el-input v-model="form.role_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="添加描述" :label-width="formLabelWidth">
          <el-input v-model="form.role_desc" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAddRole">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改角色信息 -->
    <el-dialog title="修改角色信息" :visible.sync="viewFormVisible">
      <el-form :model="form">
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="form.role_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" :label-width="formLabelWidth">
          <el-input v-model="form.role_desc" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限设置" :label-width="formLabelWidth">
          <el-tree
            :props="props"
            :load="loadNode"
            lazy
            show-checkbox
            @check-change="handleCheckChange">
          </el-tree>
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
import { findAllRole, addRole, findRoleAndPermission } from '@/api/sys_user'
import waves from '@/directive/waves/index.js' // 水波纹指令
import { Message } from 'element-ui'
import treeTable from '@/components/TreeTable'
export default {
  components: { treeTable },
  data() {
    return {
      tableData: [],
      permissions: [],
      dialogFormVisible: false,
      viewFormVisible: false,
      form: {
        role_desc: '',
        role_name: ''
      },
      formLabelWidth: '120px',
      curAccPer: [], // 当前用户的权限
      props: {
        label: 'name',
        children: 'zones'
      },
      count: 1
    }
  },
  created() {
    this.getFindAllRole()
  },
  directives: {
    waves
  },
  methods: {
    // 查询所有子模块
    getFindAllRole() {
      findAllRole().then(res => {
        if (res.data.error_code === 200) {
          this.tableData = res.data.data
        }
      }).catch(error => {
        Message.error(error)
      })
    },
    showDailag() {
      this.dialogFormVisible = true
      // console.log(data)
    },
    showView(data) {
      console.log(data)
      this.form = {
        role_desc: data.memo,
        role_name: data.NAME
      }
      this.getFindRoleAndPermission(data.NAME)
      this.viewFormVisible = true
    },
    getFindRoleAndPermission(account) {
      findRoleAndPermission(account).then(res => {
        if (res.data.error_code === 200) {
          this.curAccPer = res.data.data.childList
        } else {
          Message.error(res.data.message)
        }
      }).catch(error => {
        Message.error(error)
      })
    },
    submitAddRole() {
      addRole(this.form).then(res => {
        if (res.data.error_code === 200) {
          Message.success('添加角色成功')
        } else {
          Message.error(res.data.message)
        }
      }).catch(error => {
        Message.error(error)
      })
      const _this = this
      setTimeout(() => {
        _this.getFindAllRole()
      }, 800)
      this.dialogFormVisible = false
    },
    submitInfos() {
      console.log(this.form)
    },
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate)
    },
    handleNodeClick(data) {
      console.log(data)
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve([{ name: 'region1' }, { name: 'region2' }])
      }
      if (node.level > 3) return resolve([])
      var hasChild
      if (node.data.name === 'region1') {
        hasChild = true
      } else if (node.data.name === 'region2') {
        hasChild = false
      } else {
        hasChild = Math.random() > 0.5
      }
      setTimeout(() => {
        var data
        if (hasChild) {
          data = [{
            name: 'zone' + this.count++
          }, {
            name: 'zone' + this.count++
          }]
        } else {
          data = []
        }
        resolve(data)
      }, 500)
    }
  }
}
</script>

<style scoped>

</style>