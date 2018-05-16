<template>
  <root-page>
    <div class="team-wrap" slot="page">
      <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
        <el-tab-pane label="站队" name="one">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column label="活动类型" width="180">
              <template slot-scope="scope">
                <span>线上活动</span>
              </template>
            </el-table-column>
            <el-table-column prop="open_id" label="微信openId" width="280"></el-table-column>
            <el-table-column label="参与时间" width="180">
              <template slot-scope="scope">
                <span>{{scope.row.gmt_create | formatDate}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="nation_name" label="支持球队" width="180"> </el-table-column>
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
        </el-tab-pane>
        <el-tab-pane label="刷脸" name="two">
          <el-table :data="tableData" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
            <el-table-column
              prop="date"
              label="日期"
              sortable
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              sortable
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址"
              :formatter="formatter">
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
      let result = await api.getTeamList({
        page: currentPage
      });
      return {
        prizeDatas: result,
        currentPage: currentPage,
        activeName: 'one',
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
          path: '/team',
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
  .team-wrap {
    width: 100%;
    min-height: 600px;
    padding: 15px;
    box-sizing: border-box;
  }
</style>
