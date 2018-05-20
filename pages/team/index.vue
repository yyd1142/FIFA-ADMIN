<template>
  <root-page>
    <div class="team-wrap" slot="page">
      <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
        <el-tab-pane label="站队" name="one">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column label="活动类型" width="180">
              <template slot-scope="scope">
                <span>{{scope.row.type === 1 ? '线上' : '线下'}}活动</span>
              </template>
            </el-table-column>
            <el-table-column prop="open_id" label="微信openId" width="280"></el-table-column>
            <el-table-column label="参与时间" width="180">
              <template slot-scope="scope">
                <span>{{scope.row.gmt_create | formatDate}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="nation_name" label="支持球队" width="180"></el-table-column>
            <el-table-column label="是否猜中" width="180">
              <template slot-scope="scope">
                <span>{{scope.row.winner ? (scope.row.winner === scope.row.nation_name ? '是' : '否') : '待定'}}</span>
              </template>
            </el-table-column>
            <el-table-column label="是否中奖">
              <template slot-scope="scope">
                <span>{{scope.row.lotteryId ? '是' : '否'}}</span>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination class="pagination-wrap" :current-page="currentPage" background layout="prev, pager, next"
                         :total="totalPage"
                         @current-change="handleCurrentChange"></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="刷脸" name="two">
          <el-table :data="slTableData" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
            <el-table-column label="活动类型" width="180">
              <template slot-scope="scope">
                <span>{{scope.row.type === 1 ? '线上' : '线下'}}活动</span>
              </template>
            </el-table-column>
            <el-table-column prop="open_id" label="微信openId" width="280"></el-table-column>
            <el-table-column label="参与时间" width="180">
              <template slot-scope="scope">
                <span>{{scope.row.gmt_create | formatDate}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="nation_name" label="支持球队" width="180"></el-table-column>
            <el-table-column label="是否中奖">
              <template slot-scope="scope">
                <span>{{scope.row.lotteryId ? '是' : '否'}}</span>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination class="pagination-wrap" :current-page="slCurrentPage" background layout="prev, pager, next"
                         :total="slTotalPage"
                         @current-change="handleCurrentChange"></el-pagination>
        </el-tab-pane>
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
      let slCurrentPage = 1;
      let activeName = ctx.query.name || 'one';
      if (ctx.query.page && ctx.query.name === 'one') currentPage = parseInt(ctx.query.page);
      if (ctx.query.page && ctx.query.name === 'two') slCurrentPage = parseInt(ctx.query.page);
      let result = await api.getTeamList({
        page: currentPage
      });
      let slResult = await api.getSLTeamList({
        page: slCurrentPage
      })
      return {
        prizeDatas: result,
        currentPage: currentPage,
        slCurrentPage: slCurrentPage,
        activeName: activeName,
        tableData: result.response.datas,
        totalPage: result.response.pageCount * 10,
        slTableData: slResult.response.datas,
        slTotalPage: slResult.response.pageCount * 10,
      }
    },
    methods: {
      handleClick(tab, event) {
        let page = null;
        if (tab.name === 'one') {
          page = this.currentPage;
        } else {
          page = this.slCurrentPage;
        }
        this.$router.push({
          path: '/team',
          query: {
            page: page,
            name: tab.name
          }
        })
      },
      handleCurrentChange(e) {
        window.location.href = `/team?page=${e}&name=${this.activeName}`;
      }
    },
    components: {
      RootPage
    }
  }
</script>

<style lang="less">
  .team-wrap {
    width: 100%;
    min-height: 600px;
    padding: 15px;
    box-sizing: border-box;
  }
</style>
