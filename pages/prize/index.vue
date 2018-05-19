<template>
  <root-page>
    <div class="prize-wrap" slot="page">
      <el-button class="add-btn" type="primary" icon="el-icon-plus" @click="addPrize"
                 v-if="activeName === 'one'"></el-button>
      <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
        <el-tab-pane label="奖品列表" name="one">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="prize_name" label="奖品名称" width="340"></el-table-column>
            <el-table-column prop="prize_prob" label="中奖概率" width="180"></el-table-column>
            <el-table-column prop="prize_count" label="奖品库存" width="180"></el-table-column>
            <el-table-column label="是否线上" width="180">
              <template slot-scope="scope">
                <span>{{scope.row.type === 2 ? '线下' : '线上'}}</span>
              </template>
            </el-table-column>
            <el-table-column label="创建时间">
              <template slot-scope="scope">
                <span>{{scope.row.gmt_create | formatDate}}</span>
              </template>
            </el-table-column>
            <el-table-column label="场次">
              <template slot-scope="scope">
                <span>{{scope.row.rank | rankFilter}}</span>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <!--<el-button class="warning-font" type="text" size="small">删除</el-button>-->
                <el-button type="text" size="small" @click="editPrize(scope.row.id)">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination class="pagination-wrap" :current-page="currentPage" background layout="prev, pager, next"
                         :total="totalPage"
                         @current-change="handleCurrentChange"></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="中奖名单" name="two">
          <el-table :data="lotteryData" style="width: 100%">
            <el-table-column prop="open_id" label="微信openId"></el-table-column>
            <el-table-column label="中奖时间">
              <template slot-scope="scope">
                <span>{{scope.row.gmt_create | formatDate}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="prize_name" label="奖品内容"></el-table-column>
            <el-table-column fixed="right" label="寄送地址">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="viewAddress(scope.row, false)">查看</el-button>
                <el-button type="text" size="small" @click="viewAddress(scope.row, true)">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination class="pagination-wrap" :current-page="lotteryPage" background layout="prev, pager, next"
                         :total="lotteryTotalPage"
                         @current-change="handleCurrentChange"></el-pagination>
        </el-tab-pane>
      </el-tabs>
      <el-dialog title="寄送地址" :visible.sync="dialogVisible" width="30%">
        <div class="dialog-wrap">
          <el-form :model="formData" ref="formData" label-width="80px" :rules="rules">
            <el-form-item label="联系人" prop="name">
              <el-input v-model="formData.name" :disabled="!isEdit"></el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop="phone">
              <el-input v-model="formData.phone" :disabled="!isEdit"></el-input>
            </el-form-item>
            <el-form-item label="寄送地区" prop="area">
              <el-input v-model="formData.area" :disabled="!isEdit"></el-input>
            </el-form-item>
            <el-form-item label="详细地址" prop="address">
              <el-input v-model="formData.address" :disabled="!isEdit"></el-input>
            </el-form-item>
            <el-form-item label="邮政编码" prop="zip_code">
              <el-input v-model="formData.zip_code" :disabled="!isEdit"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel" v-if="isEdit">取 消</el-button>
          <el-button type="primary" @click="confrim('formData')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </root-page>
</template>

<script>
  import api from '~/plugins/api';
  import RootPage from '../index.vue';

  export default {
    async asyncData(ctx){
      let currentPage = 1;
      let lotteryPage = 1;
      let activeName = 'one';
      if (ctx.query.page && ctx.query.name === 'one') {
        currentPage = parseInt(ctx.query.page);
        activeName = ctx.query.name
      }
      if (ctx.query.page && ctx.query.name === 'two') {
        lotteryPage = parseInt(ctx.query.page);
        activeName = ctx.query.name
      }
      let result = await api.getPrizeList({
        page: currentPage
      });
      let lotteryResult = await api.getLottery({
        page: lotteryPage
      })
      return {
        prizeDatas: result,
        lotteryDatas: lotteryResult,
        currentPage: currentPage,
        lotteryPage: lotteryPage,
        activeName: activeName,
        tableData: result.response.datas,
        lotteryData: lotteryResult.response.datas,
        totalPage: result.response.pageCount * 10,
        lotteryTotalPage: lotteryResult.response.pageCount * 10,
        dialogVisible: false,
        lotterItem: {},
        isEdit: false,
        formData: {
          openId: null,
          address: '',
          area: '',
          name: '',
          phone: '',
          zip_code: ''
        },
        rules: {
          address: [
            {required: true, message: '请填写详细地址', trigger: 'blur'}
          ],
          area: [
            {required: true, message: '请填写寄送地区', trigger: 'blur'}
          ],
          name: [
            {required: true, message: '请填写联系人', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '请填写手机号码', trigger: 'blur'}
          ],
          zip_code: [
            {required: true, message: '请填写邮政编码', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      handleClick(tab, event) {
        let page = tab.name === 'one' ? this.currentPage : this.lotteryPage;
        this.$router.push({
          path: '/prize',
          query: {
            page: page,
            name: tab.name
          }
        })
      },
      handleCurrentChange(e) {
        this.$router.push({
          path: '/prize',
          query: {
            page: e,
            name: this.activeName
          }
        })
      },
      addPrize() {
        this.$router.push({
          path: '/prize/add'
        })
      },
      editPrize(id) {
        this.$router.push({
          path: '/prize/edit',
          query: {
            prizeId: id
          }
        })
      },
      viewAddress(item, isEdit) {
        this.isEdit = isEdit;
        this.formData = {
          openId: item.open_id,
          address: item.address,
          area: item.area,
          name: item.name,
          phone: item.phone,
          zip_code: item.zip_code
        };
        this.dialogVisible = true;
      },
      cancel() {
        this.dialogVisible = false;
      },
      confrim(formName) {
        if (this.isEdit) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.editAddress(this.formData);
            } else {
              console.log('error submit!!');
              return false;
            }
          })
        } else {
            this.dialogVisible = false;
        }
      },
      editAddress(postBody) {
        api.editAddress({}, postBody).then(result => {
          if (result && result.code == 0) {
            this.dialogVisible = false;
            this.$message({
              message: '修改成功',
              type: 'success'
            });
            window.location.href = `/prize?page=1&name=two`;
          } else {
            this.$message.error('编辑失败，请重试');
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
    .warning-font {
      color: #f56c6c;
    }
    .dialog-wrap {

    }
  }
</style>
