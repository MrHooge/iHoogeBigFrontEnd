<template>
  <div class="menu-wrapper">
        <el-menu class="sidebar-el-menu" :default-openeds="onRoutes" :collapse="collapse" background-color="#324157"
                text-color="#bfcbd9" active-text-color="#fff">
    <template v-for="item in routes">
      <el-submenu :index="item.modelNme" :key="item.modelNme">
        <template slot="title">
          <span v-if="item.modelNme" slot="title">{{item.modelNme}}</span>
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
export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  created() {
    // console.log(123456)
    // console.log(this.routes)
    // console.log(123456)
  },
  methods: {
    hasOneShowingChildren(children) {
      const showingChildren = children.filter(item => {
        return !item.hidden
      })
      if (showingChildren.length === 1) {
        return true
      }
      return false
    }
  }
}
</script>
