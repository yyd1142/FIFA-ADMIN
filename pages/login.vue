<template>
  <div class="index-page-wrap">
    <div class="login-wrap">
      <div class="fifa-logo"></div>
      <el-card class="box-card">
        <el-input class="login-cell" v-model="formData.username" placeholder="请输入账号"></el-input>
        <el-input type="password" class="login-cell" v-model="formData.password" placeholder="请输入密码"></el-input>
        <el-checkbox class="login-cell" v-model="checked">一周内记住密码</el-checkbox>
        <el-button class="login-cell login-btn" type="primary" @click="login">登&nbsp;&nbsp;录</el-button>
      </el-card>
    </div>
  </div>
</template>

<script>
  import api from '~/plugins/api'
  import md5 from 'blueimp-md5'
  import { setUser } from '~/utils/auth'

  export default {
    async asyncData(ctx) {
      return {
        formData: {
          username: '',
          password: ''
        },
        checked: false,
      }
    },
    methods: {
      login() {
        let isEmpty = false;
        for (let key in this.formData) {
          if (this.formData[key] == '') {
            isEmpty = true;
          }
        }
        if (!isEmpty) {
          api.login({
            username: this.formData.username,
            password: md5(this.formData.password)
          }).then(result => {
            if (result.code === 0) {
              this.$router.replace('/team');
              setUser(result.data);
              this.$store.commit('SET_USER', result.data);
            } else {
              this.$message.error('用户名或密码错误，请重试');
            }
          }).catch(e => {

          })
        } else {
          this.$message({
            message: '请输入用户名和密码',
            type: 'warning'
          });
        }
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
      .fifa-logo {
        background: url("/static/images/fifa128.png") 0 0 no-repeat;
        background-size: cover;
        width: 128px;
        height: 128px;
        position: absolute;
        top: -106px;
        left: 0;
        right: 0;
        margin: auto;
      }
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
