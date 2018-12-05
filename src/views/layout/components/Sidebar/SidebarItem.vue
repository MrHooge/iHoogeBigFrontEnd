<template>
  <div class="menu-wrapper">
    <!-- <el-menu class="sidebar-el-menu" :collapse="collapse" background-color="#324157" -->
    <el-menu
      class="sidebar-el-menu"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#fff"
    >
      <template v-for="item in routes">
        <el-submenu :index="item.modelNme" :key="item.modelNme">
          <template slot="title">
            <span class="nav" v-if="item.modelNme" slot="title">
              <i class="iconfont" style="color:#fff" :class="item.icon"></i>
              {{item.modelNme}}
            </span>
          </template>

          <template v-for="child in item.childList">
            <router-link :to="child.model_url" :key="child.model_name">
              <el-menu-item :index="child.model_name" style="background-color:red;">
                <span v-if="child.model_name" slot="title">{{child.model_name}}</span>
              </el-menu-item>
            </router-link>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import "./ifont/iconfont.css";
export default {
  name: "SidebarItem",
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      iconArr: [
        "icon-shouye",
        "icon-kefu",
        "icon-browser",
        "icon-wxbgongju",
        "icon-eraser",
        "icon-shenfenzheng",
        "icon-dingdan",
        "icon-gonglve",
        "icon-hongbao",
        "icon-iconfontxingxing",
        "icon-liwu",
        "icon-ziyouanpai",
        "icon-xinxi",
        "icon-set",
        "icon-jinnang",
        "icon-xinyongqia",
        "icon-xiangbao"
      ]
    };
  },
  created() {
    this.routes.forEach((e, index) => {
      e.icon = this.iconArr[index];
    });
  },
  methods: {
    hasOneShowingChildren(children) {
      const showingChildren = children.filter(item => {
        return !item.hidden;
      });
      if (showingChildren.length === 1) {
        return true;
      }
      return false;
    }
  }
};
</script>
<style scoped>
.el-submenu__title {
  vertical-align: text-top;
}
</style>

