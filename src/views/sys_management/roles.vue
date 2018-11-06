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
          <el-input v-model="form.role_name" auto-complete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="添加描述" :label-width="formLabelWidth">
          <el-input v-model="form.role_desc" auto-complete="off" clearable></el-input>
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
          <el-input v-model="form.role_name" auto-complete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="角色描述" :label-width="formLabelWidth">
          <el-input v-model="form.role_desc" auto-complete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="权限设置" :label-width="formLabelWidth">
          <el-tree
            :data="curAllPer"
            node-key="id"
            :props="props"
            show-checkbox
            ref="tree"
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
import {
  findAllRole,
  addRole,
  findRoleAndPermission,
  findAllChildModel,
  addRoleBondPermission
} from "@/api/sys_user";
import waves from "@/directive/waves/index.js"; // 水波纹指令
import { Message } from "element-ui";
import treeTable from "@/components/TreeTable";
import api from "../../../config/dev.env";
import axios from "axios";
export default {
  components: { treeTable },
  data() {
    return {
      tableData: [],
      permissions: [],
      dialogFormVisible: false,
      viewFormVisible: false,
      viewFormType: "view",
      form: {
        role_desc: "",
        role_name: ""
      },
      formLabelWidth: "120px",
      curAccPer: [], // 当前用户的权限
      curAllPer: [], // 当前所有的权限
      curSelectPer: [], // 当前选中的权限
      curPermissions: [], // 当前选中的权限(存储)
      props: {
        label: "model_name",
        children: "childList"
      },
      count: 1
    };
  },
  created() {
    this.getFindAllRole();
  },
  directives: {
    waves
  },
  methods: {
    // 查询所有角色
    getFindAllRole() {
      findAllRole()
        .then(res => {
          if (res.data.error_code === 200) {
            this.tableData = res.data.data;
          }
        })
        .catch(error => {
          Message.error(error);
        });
    },
    showDailag() {
      this.dialogFormVisible = true;
      // console.log(data)
    },
    showView(data, type) {
      // console.log(data)
      this.viewFormType = type;
      this.form = {
        role_id: data.id,
        role_desc: data.memo,
        role_name: data.NAME
      };
      // this.getFindRoleAndPermission(data.NAME)
      this.getFindAllChildModel("", 1, 1000);
    },
    // 查询当前用户的权限
    getFindRoleAndPermission(account) {
      findRoleAndPermission(account)
        .then(res => {
          if (res.data.error_code === 200) {
            const data = res.data.data;
            data.forEach(element => {
              element.childList.forEach(item => {
                item.modelNme = item.model_name;
              });
            });
            this.curAccPer = data;
            this.viewFormVisible = true;
          } else {
            Message.error(res.data.message);
          }
        })
        .catch(error => {
          Message.error(error);
        });
    },
    // 查询所有的权限
    getFindAllChildModel(id, page, pageSize) {
      findAllChildModel(id, page, pageSize)
        .then(res => {
          if (res.data.error_code === 200) {
            const data = res.data.data.list;
            const tempArray = [];
            // console.log('data', data)
            data.forEach(item => {
              const tempObj = {
                model_parent: item.model_parent,
                model_name: item.parent_name,
                childList: []
              };
              const childObj = {
                id: item.id,
                model_name: item.model_name,
                model_url: item.model_url
              };
              if (tempArray.length > 0) {
                let index = tempArray.findIndex(value => {
                  return value.model_parent === item.model_parent;
                });
                if (index > -1) {
                  tempArray[index].childList.push(childObj);
                } else {
                  tempObj.childList.push(childObj);
                  tempArray.push(tempObj);
                }
              }
              if (tempArray.length === 0) {
                tempObj.childList.push(childObj);
                tempArray.push(tempObj);
              }
            });
            this.curAllPer = tempArray;
            // console.log('this.curAllPer', this.curAllPer)
            this.viewFormVisible = true;
          } else {
            Message.error(res.data.message);
          }
        })
        .catch(error => {
          Message.error(error);
        });
    },
    submitAddRole() {
      addRole(this.form)
        .then(res => {
          if (res.data.error_code === 200) {
            Message.success("添加角色成功");
          } else {
            Message.error(res.data.message);
          }
        })
        .catch(error => {
          Message.error(error);
        });
      const _this = this;
      setTimeout(() => {
        _this.getFindAllRole();
      }, 800);
      this.dialogFormVisible = false;
    },
    submitInfos() {
      if (this.viewFormType === "view") {
        this.viewFormVisible = false;
      } else {
        this.postAddRoleBondPermission();
      }
      // console.log(this.form)
    },
    // 设置权限
    postAddRoleBondPermission() {
      let permissions = "";
      const child_premission = [];
      this.curSelectPer.forEach(item => {
        permissions += item.model_parent;
        item.childList.forEach(value => {
          const permChildObj = {};
          permissions += "#" + value;
          permChildObj.child_model_id = value;
          permChildObj.child_permission = "修改,查询,添加";
          child_premission.push(permChildObj);
        });
        permissions += "@";
      });
      let obj = {
        role_name: this.form.role_name,
        role_desc: this.form.role_desc,
        role_id: this.form.role_id,
        permissions: permissions.substring(0, permissions.length - 1),
        child_premission: child_premission
      };
      // var params =new URLSearchParams();
      // params.append('value',JSON.stringify(obj));
      // axios.post('https://member.api.qiyun88.cn/user/addRoleBondPermission', JSON.stringify(obj),{
      //   headers: {
      //       'Content-Type': 'application/json;charset=UTF-8'
      //   }
      // }).then(res=>{
      //   console.log(res)
      //   console.log(123456)
      // }).catch(function (error) {
      //   console.log(error);
      //   });
      addRoleBondPermission(obj)
        .then(res => {
          if (res.data.error_code === 200) {
            Message.success("权限配置成功！");
          } else {
            Message.error(res.data.message);
          }
          this.viewFormVisible = false;
        })
        .catch(error => {
          Message.error(error);
        });
    },
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate);
      const id = data.id || data.model_parent;
      let paerntId = null;
      const tempObj = {
        model_parent: 0,
        childList: []
      };
      // console.log(this.$refs.tree.getNode(id))
      if (this.$refs.tree.getNode(id)) {
        // 点选二级菜单
        let treeNode = this.$refs.tree.getNode(id);
        paerntId = treeNode.parent.data.model_parent;
        if (treeNode.checked) {
          tempObj.model_parent = paerntId;
          tempObj.childList.push(id);
          const index = this.curSelectPer.findIndex(value => {
            return value.model_parent === paerntId;
          });
          if (index > -1) {
            const _index = this.curSelectPer[index].childList.findIndex(
              value => {
                return value === id;
              }
            );
            if (_index < 0) {
              this.curSelectPer[index].childList.push(id);
            }
          } else {
            this.curSelectPer.push(tempObj);
          }
        } else {
          let removeId = treeNode.data.id;
          this.curSelectPer.forEach(item => {
            if (item.model_parent === paerntId) {
              item.childList.splice(
                item.childList.findIndex(value => value === removeId),
                1
              );
            }
            if (item.childList.length === 0) {
              this.curSelectPer.splice(
                this.curSelectPer.findIndex(
                  _item => _item.model_parent === paerntId
                ),
                1
              );
            }
          });
        }
      } else {
        if (checked) {
          tempObj.model_parent = id;
          data.childList.forEach(ids => {
            if (tempObj.childList.findIndex(value => value === ids.id) < 0) {
              tempObj.childList.push(ids.id);
            }
          });
          if (
            this.curSelectPer.findIndex(item => item.model_parent === id) < 0
          ) {
            this.curSelectPer.push(tempObj);
          }
        }
      }
      console.log("this.curSelectPer", this.curSelectPer);
    },
    handleNodeClick(data) {
      // console.log(data)
    }
  }
};
</script>

<style scoped>
</style>