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
        <el-menu-item :index="`${index}`" @click="linkPath(item.path)" v-for="(item, index) in tabItems" :key="item.id">
          <i :class="item.icon"></i>
          <span slot="title">{{item.routeName}}</span>
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
        activeIndex: null,
        tabItems: [{
          id: 0, routeName: '奖品管理', path: 'prize', icon: 'el-icon-star-off'
        }, {
          id: 1, routeName: '赛事管理', path: 'team', icon: 'el-icon-goods'
        }, {
          id: 2, routeName: '用户管理', path: 'user', icon: 'el-icon-tickets'
        }, {
          id: 3, routeName: '数据统计', path: 'statistics', icon: 'el-icon-news'
        }, {
          id: 4, routeName: '设置', path: 'setting', icon: 'el-icon-setting'
        }]
      }
    },
    mounted() {
      for(let [index, i] of this.tabItems.entries()) {
          if(i.path === this.$route.name) {
            this.activeIndex = index.toString()
          }
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      linkPath(path) {
        this.$router.push(`/${path}`);
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
