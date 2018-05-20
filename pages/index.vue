<template>
  <div class="main-wrap">
    <el-row>
      <el-col class="header-fixed" :span="24">
        <mko-header></mko-header>
      </el-col>
    </el-row>
    <el-row>
      <el-col class="menu" :span="2">
        <menu-bar></menu-bar>
      </el-col>
      <el-col :span="24">
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
    .header-fixed {
      position: fixed;
      top: 0;
      z-index: 100;
      border-bottom: 1px solid rgba(97, 105, 112, 0.83);
    }
    .page-wrap {
      width: 100%;
      min-height: 600px;
      background-color: #ffffff;
      padding-left: 8.33333%;
      padding-top: 64px;
    }
    .menu {
      position: relative;
    }
  }
</style>
