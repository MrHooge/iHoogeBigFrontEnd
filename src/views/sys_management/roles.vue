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
            :data="curAllPer"
            node-key="id"
            :props="props"
            show-checkbox
            @node-click="handleNodeClick"
            @check-change="handleCheckChange">
          </el-tree>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="viewFormVisible=false">取 消</el-button>
        <el-button type="primary" @click="submitInfos">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { findAllRole, addRole, findRoleAndPermission, findAllChildModel } from '@/api/sys_user'
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
      curAllPer: [], // 当前所有的权限
      props: {
        label: 'modelNme',
        children: 'childList'
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
    // 查询所有角色
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
      // this.getFindRoleAndPermission(data.NAME)
      this.getFindAllChildModel('', 1, 50)
    },
    // 查询当前用户的权限
    getFindRoleAndPermission(account) {
      findRoleAndPermission(account).then(res => {
        if (res.data.error_code === 200) {
          const data = res.data.data
          data.forEach(element => {
            element.childList.forEach(item => {
              item.modelNme = item.model_name
            })
          })
          this.curAccPer = data
          this.viewFormVisible = true
        } else {
          Message.error(res.data.message)
        }
      }).catch(error => {
        Message.error(error)
      })
    },
    // 查询所有的权限
    getFindAllChildModel(id, page, pageSize) {
      findAllChildModel(id, page, pageSize).then(res => {
        if (res.data.error_code === 200) {
          const data = res.data.data.list
          const tempArray = []
          data.forEach(item => {
            const tempObj = {
              model_parent: item.model_parent,
              parent_name: item.parent_name,
              childList: []
            }
            const childObj = {
              id: item.id,
              model_name: item.model_name,
              model_url: item.model_url
            }
            if (tempArray.length > 0) {
              tempArray.forEach(arr => {
                if (arr.model_parent === item.model_parent) {
                  arr.childList.push(childObj)
                }
              })
            } else {
              tempObj.childList.push(childObj)
              tempArray.push(tempObj)
            }
          })
          console.log('tempArray:', tempArray)
          this.curAllPer = data
          console.log(data)
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
    }
  }
}
</script>

<style scoped>

</style>