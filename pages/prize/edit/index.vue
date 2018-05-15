<template>
  <root-page>
    <div class="edit-prize-wrap" slot="page">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/prize' }">奖品列表</el-breadcrumb-item>
        <el-breadcrumb-item>编辑奖品</el-breadcrumb-item>
      </el-breadcrumb>
      <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card" class="tabs-wrap">
        <el-tab-pane label="编辑奖品" name="first">
          <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="奖品名称" prop="prize_name">
              <el-input v-model="form.prize_name"></el-input>
            </el-form-item>
            <el-form-item label="奖品库存" prop="prize_count">
              <el-input v-model="form.prize_count" type="number"></el-input>
            </el-form-item>
            <el-form-item label="中奖概率" prop="prize_prob">
              <el-input v-model="form.prize_prob" type="number"></el-input>
            </el-form-item>
            <el-form-item label="线上奖品" prop="type">
              <el-radio-group v-model="form.type">
                <el-radio label="是"></el-radio>
                <el-radio label="否"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit('form')">立即提交</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </root-page>
</template>

<script>
  import api from '~/plugins/api';
  import RootPage from '../../index.vue';

  export default {
    async asyncData(ctx){
        let info = {
          prize_name: '',
          prize_count: '',
          prize_prob: '',
          type: ''
        }
        let result = await api.prizeDetail({ prizeId: ctx.query.prizeId });
        info = result.response;
      info.type = info.type === 1 ? '是' : '否';
      return {
        activeName: 'first',
        rules: {
          prize_name: [
            {required: true, message: '请输入奖品名称', trigger: 'blur'}
          ],
          prize_count: [
            {required: true, message: '请输入奖品库存', trigger: 'blur'}
          ],
          prize_prob: [
            {required: true, message: '请输入中奖概率', trigger: 'blur'}
          ],
          type: [
            {required: true, message: '请选择是否线上奖品', trigger: 'blur'}
          ],
        },
        form: info
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('确定提交本次修改吗？').then(_ => {
              this.editPrize();
            }).catch(_ => {

            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      editPrize() {
        api.editPrize({}, {
          prizeId: this.form.id,
          prize_name: this.form.prize_name,
          prize_count: this.form.prize_count,
          prize_prob: this.form.prize_prob,
          type: this.form.type === '是' ? 1 : 2
        }).then(result => {
          if (result && result.code == 0) {
            this.$router.go(-1);
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
  @import "../../../assets/style/index.less";

  .edit-prize-wrap {
    width: 100%;
    min-height: 600px;
    padding: 15px;
    box-sizing: border-box;
    .tabs-wrap {
      margin-top: 15px;
    }
  }
</style>
