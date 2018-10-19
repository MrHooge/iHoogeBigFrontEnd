<template>
  <div class="dashboard-container">
    <p class="warn-content">欢迎 {{name}} 使用麒云运营管理系统 </p>
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
