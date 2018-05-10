<template>
  <div class="header-wrap-x">
    <div class="header-left-wrap">
      <div class="logo"></div>
      <div class="fifa">FIFA后台管理系统</div>
    </div>
    <div class="header-right-wrap">
      <div class="username">dee1142[管理员]</div>
      <el-popover
        placement="bottom"
        width="200"
        trigger="hover">
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item>修改密码</el-dropdown-item>
        <el-dropdown-item>退出账号</el-dropdown-item>
        <div class="header-image" slot="reference"></div>
      </el-popover>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    }
  }
</script>

<style lang="less">
  @import "../assets/style/index.less";

  @headerHeight: 64px;
  .header-wrap-x {
    width: 100%;
    height: @headerHeight;
    background-color: @mainColor;
    display: flex;
    .header-right-wrap, .header-left-wrap {
      flex: 1;
      height: @headerHeight;
    }
    .header-left-wrap {
      width: 40%;
      .logo {
        background: url("/static/images/fifa64.png") 0 0 no-repeat;
        width: @headerHeight;
        height: @headerHeight;
        display: block;
        background-size: cover;
        margin-left: 15px;
        float: left;
      }
      .fifa {
        font-size: 18px;
        color: #fff;
        float: left;
        height: @headerHeight;
        line-height: @headerHeight;
        padding-left: 30px;
      }
    }
    .header-right-wrap {
      width: 60%;
      position: relative;
      .username {
        position: absolute;
        right: 67px;
        height: @headerHeight;
        line-height: @headerHeight;
        font-size: 15px;
        color: #fff;
        &:hover {
          color: @mainFontColor;
        }
      }
      .header-image {
        background: url("/static/images/boy64.png") 0 0 no-repeat;
        background-size: cover;
        width: 40px;
        height: 40px;
        position: absolute;
        right: 15px;
        top: 0;
        bottom: 0;
        margin: auto;
      }
    }
  }
</style>
