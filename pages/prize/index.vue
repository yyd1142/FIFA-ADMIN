<template>
  <root-page>
    <div class="prize-wrap" slot="page">
      <el-button class="add-btn" type="primary" icon="el-icon-plus"></el-button>
      <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
        <el-tab-pane label="奖品列表" name="first">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="prize_name" label="奖品名称" width="240"></el-table-column>
            <el-table-column prop="prize_prob" label="中奖概率" width="180"></el-table-column>
            <el-table-column prop="prize_count" label="奖品库存"></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button class="warning-font" type="text" size="small">删除</el-button>
                <el-button type="text" size="small">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-pagination class="pagination-wrap" :current-page="currentPage" background layout="prev, pager, next"
                       :total="totalPage"
                       @current-change="handleCurrentChange"></el-pagination>
      </el-tabs>
    </div>
  </root-page>
</template>

<script>
  import api from '~/plugins/api';
  import RootPage from '../index.vue';

  export default {
    async asyncData(ctx){
      let currentPage = 1;
      if (ctx.query.page) currentPage = parseInt(ctx.query.page);
      let result = await api.getPrizeList({
        page: currentPage
      });
      return {
        prizeDatas: result,
        currentPage: currentPage,
        activeName: 'first',
        tableData: result.response.datas,
        totalPage: result.response.pageCount * 10
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleCurrentChange(e) {
        this.$router.push({
          path: '/prize',
          query: {
            page: e
          }
        })
      }
    },
    components: {
      RootPage
    }
  }
</script>

<style lang="less">
  @import "../../assets/style/index.less";

  .prize-wrap {
    width: 100%;
    min-height: 600px;
    padding: 15px;
    box-sizing: border-box;
    .add-btn {
      position: absolute;
      z-index: 10;
      right: 16px;
    }
    .warning-font {
      color: #f56c6c;
    }
  }
</style>
