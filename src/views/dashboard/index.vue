<template>
  <div class="dashboard-container">
    
    <p class="warn-content">欢迎使用 麒云运营管理系统 </p>
    <!-- <div class="dashboard-text">name:{{name}}</div>
    <div class="dashboard-text">roles:
      <span v-for='(role, index) in roles' :key='index'><br>{{role.modelNme}}<br>
          <span v-for='(list, index) in role.childList' :key='index'>&nbsp;&nbsp;&nbsp;&nbsp;{{list.model_name}}
            <br> 
          </span>
        <br> 
      </span>
    </div>
    <div class="dashboard-text">menus:<span v-for='(role, index) in menus' :key='index'>{{role.name}} <br> </span></div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles',
      'menus'
    ])
  },
  created() {
    this.getMenu()
  },
  methods: {
    getMenu() {
      this.$store.dispatch('GetRolePermission', this.name).then(() => {
        console.log('get Role Permission Success !')
      }).catch(() => {
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
