<template>
  <div class="index-page-wrap">
    <div class="login-wrap">
      <!--<card :bordered="true" class="login-card">-->
        <!--<p slot="title" style="text-align: center; font-size: 18px;">FIFI后台管理系统</p>-->
        <!--<i-input v-model="formData.username" placeholder="请输入账号" clearable style="width: 100%"></i-input>-->
        <!--<i-input v-model="formData.password" type="password" placeholder="请输入密码" clearable-->
                 <!--style="width: 100%; margin-top: 15px;"></i-input>-->
        <!--<checkbox v-model="checked" style="margin-top: 15px;">-->
          <!--<span>一周内记住密码</span>-->
        <!--</checkbox>-->
        <!--<Button type="primary" style="margin-top: 15px;" @click="login" long>登&nbsp;&nbsp;录</Button>-->
      <!--</card>-->
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
      .login-card {
        width: 300px;
        height: 248px;
      }
    }
  }
</style>
