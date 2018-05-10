<template>
  <div class="menu-bar-wrap">
    <div class="menu-item">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#626971"
        text-color="#fff"
        active-text-color="#ffd238">
        <el-menu-item index="1" @click="linkPath('/team', 1)">
          <i class="el-icon-star-off"></i>
          <span slot="title">赛事管理</span>
        </el-menu-item>
        <el-menu-item index="2" @click="linkPath('/user', 2)">
          <i class="el-icon-tickets"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>
        <el-menu-item index="3" @click="linkPath('/statistics', 3)">
          <i class="el-icon-news"></i>
          <span slot="title">数据统计</span>
        </el-menu-item>
        <el-menu-item index="4" @click="linkPath('/setting', 4)">
          <i class="el-icon-setting"></i>
          <span slot="title">设置</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="version">v1.0.0</div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        activeIndex: '1'
      }
    },
    mounted() {
      console.log(this.$route.name)
      if (this.$route.name === 'team') {
        this.activeIndex = '1'
      } else if (this.$route.name === 'user') {
        this.activeIndex = '2'
      } else if (this.$route.name === 'statistics') {
        this.activeIndex = '3'
      } else if (this.$route.name === 'setting') {
        this.activeIndex = '4'
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      linkPath(path, index) {
        this.activeIndex = index.toString()
        this.$router.push(path);
      }
    }
  }
</script>

<style lang="less">
  .menu-bar-wrap {
    width: 100%;
    position: relative;
    height: 100vh;
    background-color: #626971;
    .menu-item {
      .el-menu {
        border-style: none;
      }
    }
    .version {
      position: absolute;
      bottom: 15px;
      width: 100%;
      text-align: center;
      color: #fff;
      font-size: 14px;
      line-height: 15px;
      height: 15px;
    }
  }
</style>
