<template>
  <div class="menu-wrapper">
    <template v-for="item in routes">
      <el-submenu :index="item.modelNme" :key="item.modelNme">
        <template slot="title">
          <span v-if="item.modelNme" slot="title">{{item.modelNme}}</span>
        </template>
        <template v-for="child in item.childList">
          <router-link :to="child.model_url" :key="child.model_name">
            <el-menu-item :index="child.model_name">
              <span v-if="child.model_name" slot="title">{{child.model_name}}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>
      <!-- <router-link v-if="hasOneShowingChildren(item.children) && !item.children[0].children&&!item.alwaysShow" :to="item.path+'/'+item.children[0].path"
        :key="item.children[0].name">
        <el-menu-item :index="item.path+'/'+item.children[0].path" :class="{'submenu-title-noDropdown':!isNest}">
          <svg-icon v-if="item.children[0].meta&&item.children[0].meta.icon" :icon-class="item.children[0].meta.icon"></svg-icon>
          <span v-if="item.children[0].meta&&item.children[0].meta.title" slot="title">{{item.children[0].meta.title}}</span>
        </el-menu-item>
      </router-link> -->

      <!-- <el-submenu :index="item.modelNme" :key="item.modelNme">
        <template slot="title">
          <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
          <span v-if="item.modelNme" slot="title">{{item.modelNme}}</span>
        </template>

        <template v-for="child in item.childList">
          <sidebar-item :is-nest="true" class="nest-menu" v-if="child.childList&&child.childList.length>0" :routes="[child]" :key="child.model_url"></sidebar-item>

          <router-link :to="child.model_url" :key="child.model_name">
            <el-menu-item :index="child.id">
              <svg-icon v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon"></svg-icon>
              <span v-if="child.model_name" slot="title">{{child.model_name}}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu> -->
    </template>
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
