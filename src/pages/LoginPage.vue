<template>
  <div class="login">
    <el-card class="login-container">
      <img class="login-logo" src="../assets/logo.png" alt="" />
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item prop="mobile">
          <el-input size="large" placeholder="请输入手机号" v-model="ruleForm.mobile" />
        </el-form-item>
        <el-form-item prop="code">
          <el-input size="large" placeholder="请输入验证码" v-model="ruleForm.code" />
        </el-form-item>
        <el-form-item>
          <el-checkbox class="login-checkbox-label" v-model="ruleForm.isChecked">
            我已阅读并同意「用户协议」和「隐私条款」
          </el-checkbox>
        </el-form-item>
        <el-form-item class="button">
          <!-- 渲染Button组件为submit按钮 -->
          <el-button type="primary" @click="submitForm(ruleForm)">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
       
       
<script>
//引入vue2使用pinia的方法
import { mapActions } from 'pinia'
//引入登录仓库
import loginStore from '../store/loginStore'

export default {
  name: 'LoginPage',
  data () {
    return {
      ruleForm: {
        mobile: '13811111111',
        code: '246810',
        isChecked: true
      },
      rules: {
        mobile: [
          { parttern: /^1[3-9]\d{9}$/, message: '手机号码格式不正确!', trigger: 'blur' },
          { required: true, message: '请输入手机号!', trigger: 'blur' }
        ],
        code: [
          { min: 6, max: 6, message: '验证码为6位数字!', trigger: 'blur' },
          { required: true, message: '请输入验证码!', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    //提交表单的方法
    ...mapActions(loginStore, ['login']),
    //提交表单的方法
    async submitForm (ruleForm) {
      try {
        //使用仓库中的login方法
        await this.login(ruleForm)
        this.$router.push({ path: '/' })
      } catch (error) {
        this.$message.error(error.response?.data?.message || '登录失败！')
      }
    }
  }
}
</script>
       
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;

  .login-logo {
    width: 200px;
    height: 60px;
    display: block;
    margin: 0 auto 20px;
  }

  .login-container {
    width: 440px;
    height: 360px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 50px rgb(0 0 0 / 10%);

    .button {
      display: flex;
      justify-content: center;
    }
  }

  .login-checkbox-label {
    color: #1890ff;
  }
}
</style>