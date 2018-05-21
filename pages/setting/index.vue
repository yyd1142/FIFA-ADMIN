<template>
  <root-page>
    <div class="setting-wrap" slot="page">
      <el-button class="add-btn" type="primary" icon="el-icon-plus" @click="addUser"
                 v-if="activeName === 'two'"></el-button>
      <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
        <el-tab-pane label="修改密码" name="one">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"
                   class="demo-ruleForm update-password-wrap">
            <el-form-item label="旧密码" prop="password">
              <el-input v-model="ruleForm.password" type="password"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword">
              <el-input v-model="ruleForm.newPassword" type="password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="confrimPassword">
              <el-input v-model="ruleForm.confrimPassword" type="password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button>取 消</el-button>
              <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="账号管理" name="two">

        </el-tab-pane>
      </el-tabs>
    </div>
  </root-page>
</template>

<script>
  import RootPage from '../index.vue';
  import api from '~/plugins/api';
  import md5 from 'blueimp-md5';

  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.confrimPassword !== '') {
            this.$refs.ruleForm.validateField('confrimPassword');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.newPassword) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        activeName: 'one',
        ruleForm: {
          password: '',
          newPassword: '',
          confrimPassword: ''
        },
        rules: {
          password: [
            {message: '请填写旧密码', trigger: 'blur'}
          ],
          newPassword: [
            {validator: validatePass, trigger: 'blur'}
          ],
          confrimPassword: [
            {validator: validatePass2, trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      addUser() {

      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.updatePassord(this.ruleForm);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      updatePassord(postBody) {
        postBody['id'] = this.$store.getters.loggedUser.id;
        postBody['password'] = md5(postBody.password);
        postBody['newPassword'] = md5(postBody.newPassword);
        postBody['confrimPassword'] = md5(postBody.confrimPassword);
        api.updatePassord({}, postBody).then(result => {
          if (result && result.code == 0) {
            this.$message({
              message: '修改成功，请重新登录',
              type: 'success'
            });
            setTimeout(() => {
              window.location.replace(`/login?redirect=team`);
            }, 1500);
          } else {
            this.$message.error('修改失败，请重试');
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
  .setting-wrap {
    width: 100%;
    min-height: 600px;
    padding: 15px;
    box-sizing: border-box;
    .update-password-wrap {
      margin-top: 15px;
    }
  }
</style>
