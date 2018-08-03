<template>
    <div>这事{{provider}}</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data(){
        return{

        }
    },
    computed: {
    ...mapGetters([
      'provider'
    ])
  },
  methods:{
      created(){
          console.log(this.provider)
      }
  }
}
</script>

<style>

</style>
