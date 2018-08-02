<template>
    <div>{{type}}</div>
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
      'type'
    ])
  },
}
</script>

<style>

</style>
