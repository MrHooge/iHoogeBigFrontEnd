<template>
	<!-- 代理分组 -->
	<div class="backend app-container">
        <el-button type="primary" class="addbtn" @click="changeStatus">切换{{changeinfo}}</el-button>

		<div class="addpayinfo" v-if="changeinfo == '查询支付信息'">
            <div class="payinfodiv">
                <div>卡号/支付宝账号</div>
                <el-input v-model="cardNum"
                            placeholder="请输入卡号或支付宝账号"
                            style="width:200px;" clearable></el-input>
            </div>
            
            <div class="payinfodiv">
                <div>限额</div>
                <el-input v-model="limitMoney"
                            placeholder="请输入限额"
                            style="width:200px;" clearable></el-input>
            </div>
            
            <div class="payinfodiv">
                <div>电话号码</div>               
                <el-input v-model="mobile"
                            placeholder="请输入电话号码"
                            style="width:200px;" clearable></el-input>
            </div>
            
            <div class="payinfodiv">
                <div>真实姓名</div>               
                <el-input v-model="name"
                            placeholder="请输入真实姓名"
                            style="width:200px;" clearable></el-input>
            </div>

            <div class="payinfodiv">
                <div>备注</div>                
                <el-input v-model="note"
                        placeholder="请输入备注"
                        style="width:200px;" clearable></el-input>
            </div>

            <div class="payinfodiv">
                <div>是否可用</div>               
                <el-radio v-model="status" label="1">可用</el-radio>
                <el-radio v-model="status" label="0">不可用</el-radio>   
            </div>

            <div class="payinfodiv">
                <div>类型</div>                
                 <el-select v-model="type" :change="changeType(type,'type')" placeholder="请选择">
                    <el-option label="请选择" value=""></el-option>
                    <el-option label="支付宝" value="2"></el-option>
                    <el-option label="微信" value="1"></el-option>
                    <el-option label="银行卡" value="3"></el-option>
                </el-select>   
            </div>
            <div class="payinfodiv" v-if="typeShow">
                <div>上传二维码</div> 
                <el-upload
                    ref="upload"
                    :data='folder'
                    class="avatar-uploader"
                    :auto-upload="false"
                    :file-list="fileList"
                    action="https://infos.api.qyun88.com/information/uploadImage"
                    :on-remove="handleRemove"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload(1)">上传到服务器</el-button>
                </el-upload>
            </div>
            <div class="payinfodiv paybtn">
                <el-button class="addbtn" type="primary" @click="addinfo" >添加支付信息</el-button>
            </div>
        </div>
        <!-- 查询支付信息 -->
        <div class="getpayinfo" v-else>
            <div class="getinfodiv">
                <div>卡号/支付宝账号</div>
                <el-input v-model="searchcardNum"
                            placeholder="请输入卡号或支付宝账号"
                            style="width:200px;" clearable></el-input>
            </div>
            
            <div class="getinfodiv">
                <div>限额</div>
                <el-input v-model="searchlimitMoney"
                            placeholder="请输入限额"
                            style="width:200px;" clearable></el-input>
            </div>
            
            <div class="getinfodiv">
                <div>电话号码</div>               
                <el-input v-model="searchmobile"
                            placeholder="请输入电话号码"
                            style="width:200px;" clearable></el-input>
            </div>
            
            <div class="getinfodiv">
                <div>真实姓名</div>               
                <el-input v-model="searchname"
                            placeholder="请输入真实姓名"
                            style="width:200px;" clearable></el-input>
            </div>

            <div class="getinfodiv">
                <div>备注</div>                
                <el-input v-model="searchnote"
                        placeholder="请输入备注"
                        style="width:200px;" clearable></el-input>
            </div>

            <div class="getinfodiv">
                <div>是否可用</div>               
                <el-radio v-model="searchstatus" label="1">可用</el-radio>
                <el-radio v-model="searchstatus" label="0">不可用</el-radio>   
            </div>

            <div class="getinfodiv">
                <div>类型</div>                
                <el-select v-model="searchtype" placeholder="请选择">
                    <el-option label="请选择" value=""></el-option>
                    <el-option label="支付宝" value="2"></el-option>
                    <el-option label="微信" value="1"></el-option>
                    <el-option label="银行卡" value="3"></el-option>
                </el-select>   
            </div>

            <div class="getinfodiv">
                开始时间
                <el-date-picker
                        v-model="startTime"
                        type="datetime"
                        style="margin-right:20px"
                        placeholder="请选择开始日期"
                        value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>     
            </div>   

            <div class="getinfodiv">
                结束时间
                <el-date-picker
                        v-model="endTime"
                        type="datetime"
                        style="margin-right:20px"
                        placeholder="请选择开始日期"
                        value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>     
            </div> 
            <div class="getinfodiv paybtn">
                <el-button type="primary" class="addbtn" @click="SearchInfoClick">查询支付信息</el-button>
            </div>
        </div>

        <div class="main">
            <el-table :data="tableData"
                        border
                        tooltip-effect="dark"
                        style="width: 100%">
                        <!-- @selection-change="handleSelectionChange"> -->
                <!-- <el-table-column type="selection"
                                    align="center">
                </el-table-column> -->

                <el-table-column label="卡号/支付宝账号"
                                    prop="cardNum"
                                    align="center">
                </el-table-column>
                <!-- <el-table-column label="ID"
                                    prop="id"
                                    align="center">
                </el-table-column> -->
                <el-table-column label="限额"
                                    prop="limitMoney"
                                    align="center">
                </el-table-column>
                <el-table-column label="电话号码"
                                    prop="mobile"
                                    align="center">
                </el-table-column>
                <el-table-column label="姓名"
                                    prop="name"
                                    align="center">
                </el-table-column>
                <el-table-column label="支付类别"
                                    prop="type"
                                    align="center">
                    <template slot-scope="scope">{{ scope.row.type | type}}</template>                  
                </el-table-column>
                <el-table-column label="状态"
                                    align="center">
                    <template slot-scope="scope">{{ scope.row.status | status}}</template>                 
                </el-table-column>
                <el-table-column label="备注"
                                    prop="note"
                                    align="center">
                </el-table-column>
                <el-table-column 
                label="设置"
                align="center">
                    <template slot-scope="scope">
                        <div>
                            <el-button type="primary" @click="showDailag(scope.row)">修改</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
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
        </div>

        <!-- 弹窗 -->
        <el-dialog title="修改支付信息"
		           :visible.sync="dialogVisible"
		           width="40%">

            <el-form :inline="true">
				<el-form-item class="rate" label="卡号/支付宝账号" :label-width="formLabelWidth">
					<el-input v-model="dialogcardNum"></el-input>
				</el-form-item>
                <el-form-item class="rate" label="创建时间" :label-width="formLabelWidth">
                    <!-- <span><el-input v-model="dialogcreateTime" :disabled="true"></el-input></span>
					<span><el-input v-model="dialogendTime" :disabled="true"></el-input></span> -->
					<span>{{dialogcreateTime}}</span>
					<span>{{dialogendTime}}</span>
				</el-form-item>
				<el-form-item class="rate" label="限额" :label-width="formLabelWidth">
					<el-input v-model="dialoglimitMoney" ></el-input>
				</el-form-item>
                <el-form-item class="rate" label="电话号码" :label-width="formLabelWidth">
					<el-input v-model="dialogmobile" ></el-input>
				</el-form-item>
                <el-form-item class="rate" label="姓名" :label-width="formLabelWidth">
					<el-input v-model="dialogname" ></el-input>
				</el-form-item>
                <el-form-item class="rate" v-if="dialogTypeShow" label="上传二维码" :label-width="formLabelWidth">
                    <el-upload
                        ref="upload2"
                        :data='folder'
                        class="avatar-uploader"
                        :auto-upload="false"
                        :file-list="fileList2"
                        action="https://infos.api.qyun88.com/information/uploadImage"
                        :on-remove="handleRemove2"
                        :on-success="handleAvatarSuccess2"
                        :before-upload="beforeAvatarUpload">
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload(2)">上传到服务器</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item class="rate" label="备注" :label-width="formLabelWidth">
					<el-input v-model="dialognote" ></el-input>
				</el-form-item>

                <el-form-item class="rate" label="使用金额" :label-width="formLabelWidth">
					<el-input v-model="dialoguseMoney" ></el-input>
				</el-form-item>
                <el-form-item class="rate" label="支付类别" :label-width="formLabelWidth">
					<el-select v-model="dialogtype" :change="changeType(dialogtype,'dialogtype')" placeholder="请选择">
                        <el-option label="请选择" value=""></el-option>
                        <el-option label="支付宝" value="2"></el-option>
                        <el-option label="微信" value="1"></el-option>
                        <el-option label="银行卡" value="3"></el-option>
                    </el-select>
				</el-form-item>
                 
				<el-form-item label="状态" :label-width="formLabelWidth">
					<el-radio v-model="dialogstatus" label="1">可用</el-radio>
					<el-radio v-model="dialogstatus" label="0">不可用</el-radio>
				</el-form-item>
			</el-form>

			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取消修改</el-button>
				<el-button type="primary" @click="makersure">确定修改</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import { getpayinfo, searchpayinfo, setpayinfo } from '@/api/sys_user'
import { uploadImage } from '@/api/news'
import { Message } from 'element-ui'
export default {
	data() {
		return {
            typeShow:false,
            dialogTypeShow:false,
            //二维码信息
            folder: {
				folder: 'pay'
            },
            fileList:[],//添加图片名信息
            fileList2:[],//修改图片名信息
            picture:"",
            imageUrl: '',

            changeinfo:'添加支付信息',
            cardNum:'',
            limitMoney:'',
            mobile:'',
            name:'',
            status:'',
            note:'',
            type:'' ,
            tableData: [], //表格数据
            //查询
            startTime:'',
            endTime:'',
            page:1,
            pageSize:10,
            searchcardNum:'',
            searchlimitMoney:'',
            searchmobile:'',
            searchname:'',
            searchstatus:'',
            searchnote:'',
            searchtype:'' ,

            totalList: 0,//分页器
            dialogVisible: false, //确认弹框
            formLabelWidth: "120px",
            //弹框数据
            dialogendTime:'',
            dialogcreateTime:'',
            dialogcardNum:'',
            dialoglimitMoney:'',
            dialogmobile:'',
            dialogname:'',
            dialognote:'',
            dialoguseMoney:'',
            dialogtype:'',
            dialogstatus:'',
            dialogid:''
		}
	},
	filters: {
		status(a){
            return a == "0" ? "不可用" : "可用";
        },
        type(a){
            if(a==1){
                return '微信'
            }else if(a==2){
                return '支付宝'
            }else if(a==3){
                return '银行卡'
            }

        }
	},
	created() {
        this.SearchInfoClick()
	},
    watch:{
        note(a,b){
            console.log(a,b)
        },
        // endTime(a,b){
        //     console.log(a,b)
        // }
    },
	methods: {
        changeType(type,cal){           
            if(cal == 'type'){
                if(type == 1){
                    this.typeShow = true
                }else{
                    this.typeShow = false
                }
                
            }
            if(cal == 'dialogtype'){
                if(type == 1){
                    this.dialogTypeShow = true
                }else{
                    this.dialogTypeShow = false
                }
            }
            
        },
        submitUpload(a) {
            if(a==1){
                this.$refs.upload.submit();
            }else{
                this.$refs.upload2.submit();
            }
            
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handleAvatarSuccess(res, file) {
            this.note = res
            console.log(res, file)
        },
        //修改弹框的数据
        handleRemove2(file, fileList) {
            console.log(file, fileList);
        },
        handleAvatarSuccess2(res, file) {
            this.dialognote = res
            console.log(res, file)
        },
        beforeAvatarUpload(file) {
            var isJPG = false;
            switch (file.type) {
                case "image/png":
                    isJPG = true;
                    break;
                case "image/jpeg":
                    isJPG = true;
                    break;
                default:
                    isJPG = false;
                    break;
            }
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        //切换添加支付 查询
        changeStatus(){           
            this.changeinfo == '添加支付信息' ? this.changeinfo = '查询支付信息' : this.changeinfo = '添加支付信息'
        },
        //设置按钮
        showDailag(val){
            console.log(val)
            this.dialogVisible = true
            this.dialogcardNum = val.cardNum
            this.dialoglimitMoney = val.limitMoney
            this.dialogmobile = val.mobile
            this.dialogname = val.name
            this.dialognote = val.note
            this.dialoguseMoney = val.useMoney
            this.dialogtype = val.type
            this.dialogstatus = val.status
            this.dialogid = val.id
            this.dialogcreateTime = this.formatDate(val.createTime)
        },
        //改变页面数据大小
        handleSizeChange(num){
            this.pageSize = num;
            this.SearchInfoClick()
        },
        //翻页
        handleCurrentChange(num){
            this.page = num;
            this.SearchInfoClick()
        },
        formatDate(value){
            const date = new Date(value);
            let Y=date.getFullYear()
            let m=date.getMonth()+1
            let d=date.getDate()
            let H=date.getHours()
            let i=date.getMinutes()
            let s=date.getSeconds()
            if(m<10){m='0'+m;}
            if(d<10){d='0'+d;}
            if(H<10){H='0'+H;}
            if(i<10){i='0'+i;}
            if(s<10){s='0'+s;}
            let t=Y+'-'+ m +'-'+d+' '+H+':'+i+':'+s;
            return t
        },
        //弹窗设置确认按钮
        makersure(){
            this.dialogVisible = false
            let obj = {
                id:this.dialogid,
                cardNum: this.dialogcardNum,
                limitMoney:this.dialoglimitMoney,
                mobile:this.dialogmobile,
                name:this.dialogname,
                note:this.dialognote,
                useMoney:this.dialoguseMoney,
                type:this.dialogtype,
                status:this.dialogstatus,
            }
            setpayinfo(obj).then(res=>{
                if (res.data.error_code == 200) {
                    Message.success(res.data.message)
                    this.SearchInfoClick()
				}else{
					Message.error(res.data.message)
				}
            })
        },
        
        //添加支付信息
		addinfo(){
            let obj = {
                cardNum:this.cardNum,
                limitMoney:this.limitMoney,
                mobile:this.mobile,
                name:this.name,
                status:this.status,
                type:this.type,
                note:this.note,
                canUseMoney:0,
            }
            
            getpayinfo(obj).then(res=>{                
                if (res.data.error_code == 200) {
                    Message.success(res.data.message)
                    this.SearchInfoClick()
				}else{
					Message.error(res.data.message)
				}
			})
        },
        // handleSelectionChange(val){
        //     console.log(val);
        // },
        //查询支付信息
		SearchInfoClick(){
            let obj = {
                // endTime:this.endTime,
                startTime:this.startTime,
                cardNum:this.searchcardNum,
                limitMoney:this.searchlimitMoney,
                mobile:this.searchmobile,
                name:this.searchname,
                status:this.searchstatus,
                type:this.searchtype,
                note:this.searchnote,
                page:this.page,
                pageSize:this.pageSize,
                useMoney:""
            }
            searchpayinfo(obj).then(res=>{
                if (res.data.error_code == 200) {
					Message.success(res.data.message)
                    this.tableData = res.data.data.list
                    this.totalList = res.data.data.total
				}else{
					Message.error(res.data.message)
				}
            })

        }
	}
}
</script>

<style scoped>

.main {
  padding-top: 30px;
}
.addpayinfo{
    width: 1200px;
    display: flex;
    justify-content: flex-start;   
    flex-wrap: wrap;
}
.payinfodiv{
    margin:10px;
    width: 200px;
    text-align: center;
}
.paybtn{
    display: flex;
    justify-content: center;
    align-items: flex-end;
}
.getpayinfo{
    width: 1200px;
    display: flex;
    justify-content: flex-start;   
    flex-wrap: wrap;
}
.getinfodiv{
    margin:10px;
    width: 200px;
    text-align: center;
}
</style>
