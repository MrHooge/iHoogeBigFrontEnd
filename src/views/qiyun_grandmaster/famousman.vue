<template>
    <div class="AddGreatGod">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="认证名人" name="first">
                <Mingren></Mingren>
            </el-tab-pane>
            <el-tab-pane label="实战大神" name="second">
                <Dashen></Dashen>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import Mingren from './Mingren'
import Dashen from './DaShen'
export default {
  components: {
      Mingren,Dashen
  },
  data() {
    return {
      activeName: "first"
    };
  },
  methods:{
      handleClick(){
          
      }
  }
};
</script>

<style scoped>
.AddGreatGod{
    padding: 10px 20px
}
</style>