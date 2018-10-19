<template>
    <div class="effectiveagent">
        <div class="clear">
          <el-button type="primary" size="small" @click="startMatch">匹配赛事</el-button>
          <el-button type="primary" size="small" @click="MatchTeam">匹配球队</el-button>
        </div>
        <!-- 500万的数据 -->
        <div class="left" 
        v-loading="loading1"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 1)">
            <div class="match">
              500万篮球赛事
            </div>
             <el-date-picker
              v-model="data_timeleft"
              type="datetimerange"
              @change="getdate()"
              size="small"
              class="datebox"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
              align="right">
            </el-date-picker>
             <el-input
              size="small"
              class="input_width"
              placeholder="请输入球队名"
              v-model="teamname">
            </el-input>
             <ul class="listbox">
               <Li v-for="item in leftlist" :key="item.id">
                  <el-radio v-model="fiveball" :label="item.id">
                      <el-tooltip placement="top">
                        <div slot="content">
                          <p>比赛时间: {{item.matchtime | time}}</p>
                          <p>主队: {{item.homeShortName}}</p>
                          <p>客队: {{item.guestShortName}}</p>
                          <p>彩期: {{item.inttime}}</p>
                          <p>状态: {{item.status | status}}</p>
                          <p>场次: {{item.lineid}}</p>
                        </div>
                        <el-button type="text" size="small">详情</el-button>
                      </el-tooltip>
                      <span class="box">{{item.homeShortName}}</span>
                      -
                      <span class="box">{{item.guestShortName}}</span>
                      <span class="box">{{item.matchtime | time}}</span>
                  </el-radio>
              </Li>
             </ul>
            
        </div>
        <!-- 飞鲸的数据 -->
        <div class="left" v-loading="loading2"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 1)">
            <div class="match">
              飞鲸篮球赛事
            </div>
             <el-date-picker
              v-model="data_timeright"
              type="datetimerange"
              @change="getdate2()"
              size="small"
              class="datebox"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
              align="right">
            </el-date-picker>
           <div>  
              <el-input
                size="small"
                class="input_width1"
                placeholder="请输入主客或者次客球队"
                v-model="val">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
            <el-button size="small" type="primary" @click="getTeamlist">搜索</el-button>
           </div>
             <ul class="listbox">
                <li v-if="sid==0" v-for="item in getmatchlist" :key="item.id">
                    <el-radio v-model="feijing" :label="item.id">
                        <el-tooltip placement="top">
                          <div slot="content">
                            <p>联赛类型: {{item.league_type}}</p>
                            <p>联赛名: {{item.league}}</p>
                            <p>开赛时间: {{item.time | time}}</p>
                            <p>主队: {{item.home}}</p>
                            <p>客队: {{item.away}}</p>
                            <p>是否有中立场: {{item.zl | zl}}</p>
                            <p>赛季: {{item.season}}</p>
                            <p>赛季类型: {{item.type}}</p>
                            <p>比赛场所: {{item.place}}</p>
                            <p>比赛分类: {{item.game_type}}</p>
                            <p>比赛子分类: {{item.game_sub_type}}</p>
                          </div>
                          <el-button type="text" size="small">详情</el-button>
                        </el-tooltip>
                        <span class="box">{{item.home}}</span>
                        -
                        <span class="box">{{item.away}}</span>
                        <span class="box">{{item.time | time}}</span>
                    </el-radio>
                </li>
                <li v-if="sid==1" v-for="item in rightteamlist" :key="item.id">
                    <el-radio v-model="feijing" :label="item.id">
                        <img :src="item.logo" alt="logo" class="logo">
                        <span class="box">{{item.ashort}}</span>
                        <span class="box">{{item.big5}}</span>
                        <span class="box">{{item.city}}</span>
                        <span class="box">{{item.en}}</span>
                    </el-radio>
                </li>
             </ul>
        </div>
 
   </div>
</template>

<script>
import { seachFiveBaketball, seachFjBaketball, FuzzySeach, matchBasketballTeam, matchBasketballGame } from "@/api/personal_review.js";
export default {
  data() {
    return {
      data_timeleft: "", // 左边的时间
      data_timeright: "", // 右边的时间
      feijing: "", // 单选肺经的数据，
      fiveball: "", // 单选de500万的数据
      val: "", // 右边的模糊搜索值
      fjlist: [], // 列表数据
      leftlist: [], // 左边的数据
      loading2:false,
      loading1:false,
      teamname:'' , // 500完的球队名
      rightteamlist:'', // 球队肺经的来搜索的
      sid:0, // 默认标志是比赛的球队
    };
  },
  filters: {
    time(a) {
        if (a != null) {
            let date = new Date(a);
            let y = date.getFullYear();
            let MM = date.getMonth() + 1;
            MM = MM < 10 ? "0" + MM : MM;
            let d = date.getDate();
            d = d < 10 ? "0" + d : d;
            let h = date.getHours();
            h = h < 10 ? "0" + h : h;
            let m = date.getMinutes();
            m = m < 10 ? "0" + m : m;
            let s = date.getSeconds();
            s = s < 10 ? "0" + s : s;
            return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
        }
    },
    status(j) {
        if (j == 0) {
            return "进行中";
        } else if (j == 1) {
            return "已结束";
        } else {
            return "取消";
        }
    },
    zl(s) {
        return s ? "否" : "是";
    }
  },
  // 模糊搜索字段是主队名字
  computed: {
    getmatchlist() {
        if (this.fjlist) {
            return this.fjlist.filter(k => {
            return k.home.match(this.val) || k.away.match(this.val);
            });
        }
    }
  },
  methods: {
    // 获取飞京的所有球队
    getTeamlist(){
        this.sid = 1;
        this.data_timeright = '';
        let obj = {
            name:this.val
        }
        FuzzySeach(obj).then(res=>{
            if(res.data.data.length>0){
            this.rightteamlist = res.data.data
            }else{
            this.$message("没有匹配的球队信息")
            }
        })
    },
    // 匹配球队
    MatchTeam(){
        let obj = {
            author:this.$store.state.user.name,
            fiveTeamId:this.teamname,    //500万球队名称
            fjTeamId:this.feijing      //飞鲸球队id
        }
        matchBasketballTeam(obj).then(res=>{
            if(res.data.error_code === 200){
                this.$message.success(res.data.message)
            }else{
                this.$message.error(res.data.message)
            }
        })
    },
    //匹配赛事
    startMatch() {
        if (this.fiveball && this.feijing) {
            let obj = {
                author: this.$store.state.user.name,
                fiveMatchId: this.fiveball,
                fjMatchId: this.feijing
            };
            matchBasketballGame(obj).then(res => {
                if(res.data.error_code === 200){
                    this.$message.success(res.data.message)
                }else{
                    this.$message.error(res.data.message)
                }
            });
        } else {
            this.$message("请先各选择一场赛事进行匹配")
        }
    },
    getdate() {
      this.loading1 = true
      let obj = {
        startDate: this.data_timeleft[0],
        endDate: this.data_timeleft[1]
      };
      seachFiveBaketball(obj).then(res => {
        if (res.data.error_code == 200) {
          let result = res.data.data;
          if (result && result.length > 0) {
            this.leftlist = result;
             this.loading1 = false
          }
        }
      });
    },
    getdate2() {
      this.val = '';
      this.sid = 0;
      this.loading2 = true
      let obj = {
        startDate: this.data_timeright[0],
        endDate: this.data_timeright[1]
      };
      seachFjBaketball(obj).then(res => {
        if (res.data.error_code == 200) {
          let result = res.data.data;
          if (result && result.length > 0) {
            this.fjlist = result;
            this.loading2 = false
          }
        }
      });
    }
  }
};
</script>

<style scoped>
.effectiveagent {
  padding: 10px 25px;
}
.logo{
  width:20px;
  height:20px;
  border-radius:20px;
  border: 1px solid #ccc;
  padding: 10;
}
.clear {
  clear: both;
  margin-left: 30px;
  margin-bottom: 20px;
}
.box {
  font-weight: 300;
  font-size: 14;
  color: #333 !important;
}
.input_width {
  width: 400px;
  margin: 5px 0 10px 10px;
}
.input_width1 {
  width: 300px;
  margin: 5px 0 10px 10px;
}
.datebox {
  margin: 10px 20px 0 10px;
}
.left {
  width: 450px;
  border: 1px solid #ccc;
  height: 500px;
  float: left;
  border-radius: 5px;
  margin-left: 20px;
}
.match {
  font-weight: 300;
  font-size: 14;
  color: #333;
  border-bottom: 1px solid #ccc;
  line-height: 40px;
  padding-left: 10px;
}
li {
  list-style: none;
  padding: 10px;
  margin-left: -30px;
  font-weight: 300;
}
.listbox {
  height: 350px;
  overflow-y: scroll;
  overflow-x: scroll;
}
</style>