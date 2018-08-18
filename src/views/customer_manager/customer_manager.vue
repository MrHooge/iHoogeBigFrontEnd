<template>
    <div class="manager">
        <div class="search">
            账号：<el-input v-model="account" placeholder="请输入账号" style="width: 150px;margin-right:70px;margin-bottom:20px;margin-top:40px"></el-input>
            姓名：<el-input v-model="name" placeholder="请输入姓名" style="width: 150px;margin-right:70px;margin-bottom:20px;margin-top:40px"></el-input>
            身份证：<el-input v-model="idcard" placeholder="请输入身份证号" style="width: 150px;margin-right:70px;margin-bottom:20px;margin-top:40px"></el-input>
            邮箱：<el-input v-model="email" placeholder="请输入邮箱" style="width: 150px;margin-right:70px;margin-bottom:20px;margin-top:20px"></el-input>
            电话：<el-input v-model="telphone" placeholder="请输入电话" style="width: 150px;margin-right:70px;margin-bottom:20px;margin-top:20px"></el-input>
            合作商：<el-input v-model="partner" placeholder="" style="width: 150px;margin-right:70px;margin-bottom:20px;margin-top:20px"></el-input><br />
            开始时间：<el-date-picker
            v-model="stime"
            type="date"
            style="margin-bottom:40px;margin-right:20px;width:200px"
            placeholder="请选择开始日期"
            value-format="yyyy-MM-dd">
            </el-date-picker>
            
            结束时间：<el-date-picker
            v-model="etime"
            align="right"
            value-format="yyyy-MM-dd"
            type="date"
            style="margin-left:10px;
            width:200px
            margin-bottom:40px;"
            placeholder="请选择结束日期"
            >
            </el-date-picker>
            <el-button type="primary" @click="inquire" @keyup.13="getone" style="margin-left:100px;margin-bottom:40px;margin-top:40px">查询</el-button>

        </div>
        <!-- 绑定银行卡信息 -->
        <template>
             <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
                               <el-form :model="form">
                                   <el-form-item label="账号" prop="account" :label-width="formLabelWidth">
                                        <el-input v-model="account" auto-complete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="银行" prop="bank" :label-width="formLabelWidth">
                                        <el-input v-model="form.bank" auto-complete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="卡号" prop="bankCard" :label-width="formLabelWidth">
                                        <el-input v-model="form.bankCard" auto-complete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="支行" prop="bankPart" :label-width="formLabelWidth">
                                        <el-input v-model="form.bankPart" auto-complete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="身份证号" prop="certNo" :label-width="formLabelWidth">
                                        <el-input v-model="form.certNo" auto-complete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="开户城市" prop="city" :label-width="formLabelWidth">
                                        <el-input v-model="form.city" auto-complete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="开户省份" prop="province" :label-width="formLabelWidth">
                                        <el-input v-model="form.province" auto-complete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="真实姓名" prop="name" :label-width="formLabelWidth">
                                        <el-input v-model="name" auto-complete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="支付宝账号" prop="zfbAccount" :label-width="formLabelWidth">
                                        <el-input v-model="form.zfbAccount" auto-complete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="提款方式" prop="bank_type" :label-width="formLabelWidth">
                                        <el-radio-group v-model="bank_type">
                                        <el-radio label="银行提款"></el-radio>
                                        <el-radio label="支付宝"></el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                    </el-form>
                                    <div slot="footer" class="dialog-footer">
                                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                                        <el-button type="primary" @click="bankbinding">确 定</el-button>
                                    </div>
                                    </el-dialog>
        </template>
        <div class="show_data">
            <el-table
               :data="tableData"
               border
               style="width: 100%;">
               <el-table-column
               type="index"
               align="center"
               label="编号">
               </el-table-column>
               <el-table-column
                     label="id"
                     prop="id"
                     align="center">
               </el-table-column>  
               <el-table-column
                     label="账号"
                     prop="account"
                     align="center">
                     
               </el-table-column>
                <el-table-column
                     label="昵称"
                     prop="username"
                     align="center">
               </el-table-column> 
                  <el-table-column
                     label="真实姓名"
                     prop="name"
                     align="center">
               </el-table-column>
                <el-table-column
                     label="注册时间"
                     prop="registerDateTime"
                     align="center">
                     <template slot-scope="scope">
                    {{scope.row.registerDateTime | time}}
                     </template>
               </el-table-column>    
                 <el-table-column
                     label="最后登陆时间"
                     align="center">
                     <template slot-scope="scope">
                    {{scope.row.lastLoginDateTime | time}}
                </template>
               </el-table-column>
               <el-table-column
                     label="名片"
                     prop="card"
                     align="center">
               </el-table-column>
               <!-- <el-table-column
                     label="证件号"
                     prop="certNo"
                     align="center"> 
               </el-table-column> -->
               <el-table-column
                     label="证件类型"
                     align="center">
                     <template slot-scope="scope">
                    {{scope.row.certType | type}}
                </template>
               </el-table-column>
               <el-table-column
                     label="邮箱"
                     prop="email"
                     align="center">
               </el-table-column>
               <el-table-column
                     label="是否充值"
                     prop="isCharge"
                     align="center">
               </el-table-column>
               <el-table-column
                     label="是否白名单"
                     align="center">
                     <template slot-scope="scope">
                         {{scope.row.isWhitelist | white}}
                         </template>
               </el-table-column>
               <!-- <el-table-column
                     label="手机"
                     prop="mobile"
                     align="center">
               </el-table-column> -->
               <el-table-column
                     label="头像·"
                     prop="picture"
                     align="center">
                     <template slot-scope="scope">
                         <img :src="scope.row.picture" >
                     </template>
               </el-table-column>
               <el-table-column
                     label="状态"
                     align="center">
                     <template slot-scope="scope">
                         {{scope.row.status |use }}
                         </template>
               </el-table-column>          
               <el-table-column
                     label="类型"
                     align="center">
                     <template slot-scope="scope">
                         {{scope.row.type |status }}
                         </template>
               </el-table-column>  
               <el-table-column
                     label="操作"
                     align="center">

                   <template slot-scope="scope">
                       <el-dropdown>
                           <el-button type="primary" style="width:70px">操作<i class="el-icon-arrow-down el-icon--right"></i>
                           </el-button>
                           <el-dropdown-menu slot="dropdown">
                               <el-popover
                               placement="right"
                               width="400"
                               trigger="click">
                               <el-table :data="gridData">
                                   </el-table>
                                   <el-button slot="reference">修改</el-button>
                                   </el-popover>
                                   <el-popover
                               placement="right"
                               width="1300"
                               trigger="click">
                               <el-table :data="walletData">
                                   <el-table-column width="150" property="ableBalance" label="可用金额"></el-table-column>
                                   <el-table-column width="150" property="account" label="用户名"></el-table-column>  
                                   <el-table-column width="150" property="freezeBalance" label="冻结金额"></el-table-column>  
                                   <el-table-column width="150" property="heapBalance" label="历史消费金额"></el-table-column>                                    
                                   <el-table-column width="150" property="heapPrize" label="历史中奖金额"></el-table-column>  
                                   <el-table-column width="150" property="memberId" label="	会员id"></el-table-column>
                                   <el-table-column width="150" property="prizeBalance" label="	奖金账户"></el-table-column>
                                   <el-table-column width="150" property="takeCashQuota" label="提现配额"></el-table-column>
                                   <el-table-column width="150" property="walletType" label="钱包类型"></el-table-column>  
                                   </el-table>
                                   <el-button slot="reference" @click="wallet(scope.row,'modify')">钱包</el-button>
                                   </el-popover>
                               <el-button type="warning" @click="runningwater">流水</el-button>
                                    <el-button type="warning" @click="showdiage">绑定银行</el-button>
                                </el-dropdown-menu>
                                </el-dropdown> 
                   </template>
               </el-table-column> 
            </el-table>
            <div class="page">
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
            >
            </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { findAllMember,memberToWrite,getMemberWalletByMemberId,getMemberWallet,bind } from '@/api/customer'
import { Message, MessageBox } from 'element-ui'
import { getCookies } from '@/utils/cookies'
export default {
    data(){
        return {

            tableData:[],
            walletData:[],
            dialogFormVisible: false,
            account:'',
            name:'',
            idcard:'',
            email:'',
            telphone:'',
            partner:'',
            page:1,
            pageSize:10,
            visible2: false,
            form:{
            bank:'',
            bankCard:'',
            bankPart:'',
            certNo:'',
            city:'',
            province:'',
            zfbAccount:'',
            },
            stime:'',
            etime:'',
            bank_type:''
            
        }
    },
    props: {
    routes: {
      type: Array
    }
  },
   computed: {
    ...mapGetters([
      'roles'
    ]),
    routes() {
        //console.log(this.$router.options.routes)
        //console.log(123456)
      return this.$router.options.routes
    },
  },
    filters:{
        type(cert){
            return cert == 1?"身份证":""
        },
        white(whitest){
            return whitest ==1?"否":"是"
        },
        use(a){
            return a == 0 ? "可用"  : ""
        },
        status(studio){
            if(studio==0){
                return "普通会员"
            }else if(studio==1){
                return "彩妍人员"
            }else{
                return "机器人"
            }
        },
               time(a){
            let date = new Date(a);
            let y = date.getFullYear();
            let MM = date.getMonth() + 1;
            MM = MM < 10 ? ('0' + MM) : MM;
            let d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            let h = date.getHours();
            h = h < 10 ? ('0' + h) : h;
            let m = date.getMinutes();
            m = m < 10 ? ('0' + m) : m;
            let s = date.getSeconds();
            s = s < 10 ? ('0' + s) : s;
            return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;

        }
    },
    created(){
        this.gettablelist();
        
        // console.log(this.routes)
        // console.log(123456)
        //console.log(getCookies('token'))

    },
    methods:{
        inquire(){
            if(this.account ||this.name ||this.idcard ||this.telphone ||this.stime){
                this.gettablelist()
            }else {
                this.$message('请输入相关信息')
            }
        },
        //获取表格数据
        gettablelist(){
            let obj={
                account:this.account,
                endTime:this.etime,
                mobile:this.telphone,
                page:this.page,
                pageSize:this.pageSize,
                startTime:this.stime,
                username:''
            }
            findAllMember(obj).then(res => {
                console.log(res.data.data)
                this.tableData = res.data.data.list
            }).catch(error => {
                Message.error(error)
            })
        },
        //翻页
        handleCurrentChange(num){
            this.page = num;
            this.gettablelist()
        },
        //改变页面大小
        handleSizeChange(num){
            this.pageSize = num;
            this.gettablelist()
        },
        //钱包
        wallet(data){
            let memberId = data.id;
            getMemberWalletByMemberId(memberId).then(res => {
                 if (res.data.error_code === 200) {
                     Message.success('已显示')
                     } else {
                         Message.error(res.data.message)
                         }
            });
            this.getWallet()
            
        },
        //获取钱包信息
        getWallet(){
            let token = getCookies('token');
            getMemberWallet(token).then(res => {
                console.log(123);
                console.log(res.data);
                this.walletData = res.data.data
            }).catch(error => {
                Message.error(error)
            })
        },
        showdiage(){
            this.dialogFormVisible = true
        },
        //绑定银行确认
        bankbinding(){
            let bankfrom = {
                account:this.account,
                realName:this.name,
                is_back:0,
                token:getCookies('token'),
                bank:this.form.bank,
                bankCard:this.form.bankCard,
                bankPart:this.form.bankPart,
                certNo:this.form.certNo,
                city:this.form.city,
                province:this.form.province,
                zfbAccount:this.form.zfbAccount,
                bank_type:1||2
            }
            bind(bankfrom).then(res => {
                console.log(res.data.msg)
                     this.$message(res.data.msg)
                     this.dialogFormVisible = false
            })
        },
        //点击按钮跳到流水查询页面
        runningwater(){
           
           this.$router.push('/detailsSearch/walletFlowquery')
        }
       
    }
}
</script>

<style scoped>
.manager{
    padding: 10px 20px
}
.walletshow{
    width: 80%;
    height: 80%;
    margin: 10% auto;
    border: 1px solid black;
    background: white;
    position: absolute;
    top:20%;
    left: 15%;
}
.page{
    margin-top: 30px
}
.el-dropdown {
    vertical-align: top;
  }
  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
