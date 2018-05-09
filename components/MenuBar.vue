<template>
  <div class="menu-bar-wrap">
    <at-menu mode="vertical" active-name="1">
      <at-menu-item name="1"><i class="icon icon-home"></i>导航菜单一</at-menu-item>
      <at-menu-item name="2" disabled><i class="icon icon-layers"></i>导航菜单二</at-menu-item>
      <at-menu-item name="4"><i class="icon icon-settings"></i>导航菜单四</at-menu-item>
    </at-menu>
  </div>
</template>
<script>
  export default {
    data () {
      return {

      }
    }
  }
</script>

<style lang="less">
  .menu-bar-wrap {

  }
</style>
