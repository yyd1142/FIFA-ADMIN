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
          id: 0, routeName: '参与人员', path: 'team', icon: 'el-icon-goods'
        }, {
          id: 1, routeName: '奖品管理', path: 'prize', icon: 'el-icon-star-off'
        }, {
          id: 2, routeName: '设置', path: 'setting', icon: 'el-icon-setting'
        }]
      }
    },
    mounted() {
      for (let [index, i] of this.tabItems.entries()) {
        if (this.$route.path.indexOf(i.path) != -1) {
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
        if (path === 'team') path = `${path}?name=one`;
        if (path === 'prize') path = `${path}?name=one`;
        this.$router.push(`/${path}`);
      }
    }
  }
</script>

<style lang="less">
  .menu-bar-wrap {
    width: 8.33333%;
    position: fixed;
    height: 100%;
    background-color: #626971;
    left: 0;
    top: 64px;
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
