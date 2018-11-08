<template>
    <div class="backend app-container">
        <div class="layerbody">
            <div class="main" style="width:80%;margin: 0 auto;">
                <el-form :label-position="labelPosition" label-width="280px" :model="formLabelAlign">
                    <el-form-item label="购买方案平台抽成">
                        <el-input v-model="formLabelAlign.buyOrder" style="width:20%;margin-right:20px;"></el-input>
                        <el-button type="primary">修改</el-button>
                    </el-form-item>
                    <!-- <el-form-item label="id">
                        <el-input v-model="formLabelAlign.id" style="width:20%;margin-right:20px;"></el-input>
                        <el-button type="primary">修改</el-button>
                    </el-form-item> -->
                    <el-form-item label="围观云豆数量">
                        <el-input v-model="formLabelAlign.onlook" style="width:45%;margin-right:20px;"></el-input>
                        <el-button type="primary">修改</el-button>
                    </el-form-item>
                    <el-form-item label="围观收益比例">
                        <!-- <el-input v-model="formLabelAlign.onlookers" style="width:20%;margin-right:20px;"></el-input> -->
                        平台:<el-input v-model="formLabelAlign.onlookers" style="width:10%;"></el-input>
                        回答者:<el-input v-model="formLabelAlign.onlookers" style="width:10%;"></el-input>
                        提问者:<el-input v-model="formLabelAlign.onlookers" style="width:10%;"></el-input>
                        <el-button type="primary" style="margin-left:20px;">修改</el-button>
                    </el-form-item>
                    <el-form-item label="提问抽成">
                        <el-input v-model="formLabelAlign.quiz" style="width:20%;margin-right:20px;"></el-input>
                        <el-button type="primary">修改</el-button>
                    </el-form-item>
                    <el-form-item label="充值比例">
                        <el-input v-model="formLabelAlign.recharge" style="width:20%;margin-right:20px;"></el-input>
                        <el-button type="primary">修改</el-button>
                    </el-form-item>
                    <el-form-item label="充值每100元增加的赠送比例">
                        <el-input v-model="formLabelAlign.rechargeGift" style="width:20%;margin-right:20px;"></el-input>
                        <el-button type="primary">修改</el-button>
                    </el-form-item>
                    <el-form-item label="100-200赠送比例">
                        <el-input v-model="formLabelAlign.rechargeGiftStart" style="width:20%;margin-right:20px;"></el-input>
                        <el-button type="primary">修改</el-button>
                    </el-form-item>
                    <el-form-item label="提现抽成">
                        <el-input v-model="formLabelAlign.withdraw" style="width:20%;margin-right:20px;"></el-input>
                        <el-button type="primary">修改</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <!-- <div class="page"
             style="padding:30px 0">
            <el-pagination background
                           @size-change="handleSizeChange"
                           @current-change="handleCurrentChange"
                           :current-page="page"
                           :page-sizes="[10, 20, 30, 40, 50]"
                           :page-size="pageSize"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="totalList"
                           v-if="totalList != ''">
            </el-pagination>
        </div> -->
        <!-- 弹窗事件 -->
        <!-- <el-dialog title="确认驳回"
		           :visible.sync="dialogVisible"
		           width="40%"
                   >
			<span slot="footer"
			      class="dialog-footer">
                  <el-button @click="dialogVisible = false" type="primary">取消</el-button>
				<el-button @click="Reject()" type="success">确定</el-button>
			</span>
		</el-dialog> -->
    </div>
</template>

<script>
import { getProportion, bhComment } from "@/api/personal_review.js";
import { Message } from "element-ui";
export default {
  data() {
    return {
      labelPosition: "right",
      formLabelAlign: {
        buyOrder: "",
        id: "",
        onlook: "",
        onlookers: "",
        quiz: "",
        recharge: "",
        rechargeGift: "",
        rechargeGiftStart: "",
        withdraw: ""
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    //获取评论列表
    getData() {
      getProportion().then(res => {
        if (res.data.error_code === 200) {
          console.log(res);
          this.formLabelAlign = res.data.data;
        } else {
          this.$message.error(res.data.message);
        }
      });
    }
  }
};
</script>

<style scoped>
.main {
  padding-top: 30px;
}
.backend >>> .el-dialog__header {
  text-align: center;
}
.backend >>> .el-dialog__footer {
  text-align: center;
}
.backend >>> .el-button--default {
  background: #e25550;
  color: #fff;
}
.backend >>> .el-tag {
  background: #31b0d5;
  color: #fff;
}
</style>
