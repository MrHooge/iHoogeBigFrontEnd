<!--  -->
<template>
  <div class="app-container">
    <el-button v-waves type="primary" @click="showDailag">添加用户</el-button>

    <el-table
    :data="tableData"
    border
    style="width: 100%; margin-top: 20px">
      <!-- <el-table-column
        prop="ID"
        label="ID"
        width="80"
        align="center">
      </el-table-column> -->
      <el-table-column
        prop="ACCOUNT"
        label="用户名"
        width="180"
        align="center">
      </el-table-column>
      <el-table-column
        prop="NAME"
        label="姓名"
        align="center">
      </el-table-column>
      <el-table-column
        prop="role_name"
        label="角色"
        align="center">
      </el-table-column>
      <el-table-column
        label="状态"
        align="center">
        <template slot-scope="scope">
          <span>{{scope.row.STATUS | status}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" @click="showDailag(scope.row, 'modify')" icon="el-icon-edit"></el-button>
            <el-button type="danger" @click="deleteUser(scope.row.ID)" icon="el-icon-delete"></el-button>
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
        v-if="totalList != ''"
        >
      </el-pagination>
    </div>

    <!-- 添加用户 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="账号" :label-width="formLabelWidth">
          <el-input v-model="form.account" auto-complete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="名字" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" auto-complete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-select v-model="form.role_id" placeholder="请选择角色">
            <el-option :label="role.NAME" :value="role.id" v-for="role in allRoles" :key="role.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否可用" :label-width="formLabelWidth">
          <el-switch v-model="form.status"></el-switch>
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
import waves from "@/directive/waves/index.js"; // 水波纹指令
import { Message, MessageBox } from "element-ui";
import {
  findAllRole,
  findAllUserAndRole,
  updateUserInfo,
  addUser,
  delUser
} from "@/api/sys_user";
export default {
  data() {
    return {
      dialogTitle: "添加用户",
      dialogType: "add",
      tableData: [],
      dialogFormVisible: false,
      form: {
        account: "",
        name: "",
        password: "",
        role_id: "",
        status: ""
      },
      formLabelWidth: "120px",
      page: 1,
      pageSize: 20,
      totalPages: 0,
      totalList: 0,
      allRoles: []
    };
  },
  directives: {
    waves
  },
  filters: {
    status(a) {
      return a === 1 ? "可用" : "不可用";
    }
  },
  created() {
    this.getUserList("", this.page, this.pageSize);
    this.getFindAllRole();
  },
  components: {},
  methods: {
    // 获取用户列表
    getUserList(account, page, pageSize) {
      findAllUserAndRole(account, page, pageSize)
        .then(res => {
          this.tableData = res.data.data.list;
          this.page = res.data.data.pageNum;
          this.pageSize = res.data.data.pageSize;
          this.totalPages = res.data.data.pages;
          this.totalList = res.data.data.total;
        })
        .catch(error => {
          Message.error(error);
        });
    },
    // 每页条数
    handleSizeChange(num) {
      this.getUserList("", this.page, num);
    },
    // 当前页数据
    handleCurrentChange(num) {
      this.getUserList("", num, this.pageSize);
    },
    // 显示弹窗
    showDailag(data, type) {
      if (type === "modify") {
        this.dialogTitle = "修改用户信息";
        this.dialogType = "modify";
        this.form.account = data.ACCOUNT;
        this.form.name = data.NAME;
        if (data.STATUS === 1) {
          this.form.status = true;
        } else {
          this.form.status = false;
        }
        this.dialogType = type;
      } else {
        this.dialogTitle = "添加用户";
        this.dialogType = "add";
        this.form = {};
      }
      this.dialogFormVisible = true;
    },
    // 删除用户信息
    deleteUser(data) {
      const _this = this;
      MessageBox.confirm("您确认永久删除该用户?", "删除用户", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        delUser(data).then(res => {
          if (res.data.error_code === 200) {
            Message.success("删除用户信息成功");
          } else {
            Message.error(res.data.message);
          }
          setTimeout(() => {
            _this.getUserList("", this.page, this.pageSize);
          }, 800);
        });
      });
      console.log(data);
    },
    // 提交数据
    submitInfos() {
      if (this.form.status) {
        this.form.status = 1;
      } else {
        this.form.status = 0;
      }
      if (this.dialogType === "modify") {
        let obj = {
          operator: this.$store.state.user.name, //操作人
          account: this.form.account,
          name: this.form.name,
          password: this.form.password,
          role_id: this.form.role_id,
          status: this.form.status
        };
        updateUserInfo(obj).then(res => {
          if (res.data.error_code === 200) {
            Message.success("修改信息成功");
          } else {
            Message.error(res.data.message);
          }
        });
      } else {
        addUser(this.form).then(res => {
          if (res.data.error_code === 200) {
            Message.success("添加信息成功");
          } else {
            Message.error(res.data.message);
          }
        });
      }
      const _this = this;
      setTimeout(() => {
        _this.getUserList("", this.page, this.pageSize);
      }, 800);
      this.dialogFormVisible = false;
    },
    // 获取所有角色
    getFindAllRole() {
      findAllRole()
        .then(res => {
          this.allRoles = res.data.data;
        })
        .catch(error => {
          Message.error(error);
        });
    }
  }
};
</script>

<style scoped>
</style>
