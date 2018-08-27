<!-- 新闻管理 -->
<template>
    <div class="manager">
        <div class="search">
            标签：<el-input v-model="label" placeholder="请输入标签" style="width: 150px;margin-right:70px;margin-bottom:20px;margin-top:40px"></el-input>
            标题：<el-input v-model="title" placeholder="请输入标题" style="width: 150px;margin-right:70px;margin-bottom:20px;margin-top:40px"></el-input>
            类型：<el-input v-model="type" placeholder="请输入类型" style="width: 150px;margin-right:70px;margin-bottom:20px;margin-top:40px"></el-input><br />
            开始时间：<el-date-picker
            v-model="startTime"
            type="date"
            style="margin-bottom:40px;margin-right:20px;width:200px"
            placeholder="请选择开始日期"
            value-format="yyyy-MM-dd">
            </el-date-picker>
            
            结束时间：<el-date-picker
            v-model="endTime"
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
        <!-- 获取新闻资讯 -->
        <div class="show_data">
            <el-table
               :data="tableData"
               border
               style="width: 100%;">
                  <el-table-column
                     label="id"
                     prop="id"
                     align="center">
               </el-table-column>            
               <el-table-column
                     label="类型"
                     prop="contentType"
                     align="center">
               </el-table-column>
               <el-table-column
                     label="创建时间"
                     prop="createDateTime"
                     align="center"> 
               </el-table-column>
               <el-table-column
                     label="编者"
                     prop="editor"
                     align="center">
                    
               </el-table-column>
               <el-table-column
                     label="图片地址"
                     prop="picture"
                     align="center">
               </el-table-column>
               <el-table-column
                     label="标签"
                     prop="label"
                     align="center">
               </el-table-column>
               <el-table-column
                     label="摘要"
                     prop="summary"
                     align="center">
               </el-table-column>
               <el-table-column
                     label="关键字"
                     prop="keyword"
                     align="center">
               </el-table-column>
               <el-table-column
                     label="新闻来源"
                     prop="newsSource"
                     align="center">
                     
               </el-table-column>
               <el-table-column
                     label="短标题"
                     prop="shortTitle"
                     align="center">
               </el-table-column>    
               <el-table-column
                     label="标题"
                     prop="title"
                     align="center">
                     
               </el-table-column>          
               <el-table-column
                     label="类型"
                     prop="type"
                     align="center">
                     
               </el-table-column>  
               <el-table-column
                     label="排序权重"
                     prop="sort"
                     align="center">
               </el-table-column> 
                <el-table-column
                     label="点击数"
                     prop="click"
                     align="center">
               </el-table-column>  
              <el-table-column
                     label="操作"
                     align="center">
                <template slot-scope="scope">
                   <el-button type="success" @click="update(scope.row,'modify')" style="width:70px;height:30px;line-height:10px;margin-bottom:5px">修改</el-button><br />
                   <el-button type="primary" @click="type(scope.row,'modify')" style="width:70px;height:30px;line-height:10px;padding-left:10px">状态</el-button>
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
import { getNewsList } from '@/api/news'
import { Message, MessageBox } from 'element-ui'
import { getCookies } from '@/utils/cookies'
export default {
    data(){
        return {

            tableData:[],
            page:1,
            pageSize:20,
            dialogFormVisible: false,
            startTime:''||null,
            endTime:''||null,
            label:''||null,
            title:''||null,
            type:''||null,
            click:'',
            content:'',
            //label:'',
            keyword:'',
            shortTitle:'',
            sort:'',
            summary:'',
        }
    },
    filters:{
        
    },
    created(){
        this.gettablelist();

    },
    methods:{
        //修改
        update(date){
            this.$router.push({ path: '/newsBulletin/addNews', query: { id: date.id } })
        },
        inquire(){
                this.gettablelist()  
        },
        //获取表格数据
        gettablelist(){
           let obj = {
             type:this.type,
             title:this.title,
             label:this.label,
             endTime:this.endTime,
             startTime:this.startTime,
             offset:this.page,
             pageSize:this.pageSize
           }
           getNewsList(obj)
           .then(res => {
             this.tableData = res.data.data.list
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

