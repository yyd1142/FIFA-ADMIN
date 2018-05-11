<template>
  <div class="index-page-wrap">
    <div class="login-wrap">
      <el-card class="box-card">
        <div class=""></div>
        <el-input class="login-cell" v-model="formData.username" placeholder="请输入账号"></el-input>
        <el-input class="login-cell" v-model="formData.password" placeholder="请输入密码"></el-input>
        <el-checkbox class="login-cell" v-model="checked">一周内记住密码</el-checkbox>
        <el-button class="login-cell login-btn" type="primary" @click="login">登&nbsp;&nbsp;录</el-button>
      </el-card>
    </div>
  </div>
</template>

<script>
  import api from '~/plugins/api'

  export default {
    async asyncData(ctx) {
      return {
        formData: {
          username: '',
          password: ''
        },
        checked: false
      }
    },
    methods: {
      login() {

      }
    },
    components: {}
  }
</script>

<style lang="less">
  .index-page-wrap {
    width: 100%;
    .login-wrap {
      width: 300px;
      height: 248px;
      position: fixed;
      top: 0;
      bottom: 0;
      margin: auto;
      left: 0;
      right: 0;
      .box-card {
        width: 300px;
        .login-cell {
          margin-top: 15px;
        }
        .login-btn {
          width: 100%;
        }
      }
    }
  }
</style>
