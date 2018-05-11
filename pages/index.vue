<template>
  <div class="main-wrap">
    <el-row>
      <el-col :span="24">
        <mko-header></mko-header>
      </el-col>
    </el-row>
    <el-row>
      <el-col class="menu" :span="2">
        <menu-bar></menu-bar>
      </el-col>
      <el-col :span="22">
        <div class="page-wrap">
          <slot name="page"></slot>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {MenuBar, MkoHeader } from '~/components'

  export default {
    async asyncData(ctx){
      ctx.redirect('/login');
      return;
    },
    components: {
      MenuBar,
      MkoHeader
    }
  }
</script>

<style lang="less">
  .main-wrap {
    .page-wrap {
      width: 100%;
      min-height: 600px;
      background-color: #ffffff;
    }
    .menu {
      position: relative;
    }
  }
</style>
