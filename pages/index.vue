<template>
  <div class="main-wrap">
      <menu-bar></menu-bar>
  </div>
</template>

<script>
  import api from '~/plugins/api'
  import { MenuBar } from '~/components'

  export default {
    async asyncData(ctx) {
      return {

      }
    },
    methods: {

    },
    components: {
      MenuBar
    }
  }
</script>

<style lang="less">
  .main-wrap {

  }
</style>
