<template>
  <div class="forget-box">
    <div class="forget-container">
      <div class="forget-title">
        找回密码
      </div>
      <div class="forget-form-container">
        <div class="verify-code-container" v-if="showType==='verifyCode'">
          <el-form label-width="100px">
            <el-form-item label="图灵验证码" required>
              <el-input v-model="captchaCode" placeholder="请输入右侧验证码"
                        @keyup.enter.native="doLogin"></el-input>
              <img
                :src="captchaPath"
                @click="updateVerifyCode" class="captcha-code">
            </el-form-item>
            <el-form-item
              label="邮箱地址" required>
              <el-input v-model="sobUser.email" placeholder="请输入邮箱地址"></el-input>
              <el-button v-if="!isCountDowning" type="primary" @click="getVerifyCode"
                         class="email-get-verify-code-btn">获取验证码
              </el-button>
              <el-button v-else class="get-verify-code-btn" @click.prevent="getVerifyCode" type="primary">
                {{countDownText}}
              </el-button>
            </el-form-item>
            <el-form-item
              label="验证码" required>
              <el-input v-model="emailCode" placeholder="请输入邮箱验证码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="resetPassword">找回密码</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div v-if="showType==='resetPassword'" class="forget-reset-password-container">
          <el-form label-width="100px">
            <el-form-item
              label="密码" required>
              <el-input type="password" v-model="originalPassword" placeholder="请输入新密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="setPassword">设置密码</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import * as api from '../../api/api'
  import {hex_md5} from "../../utils/md5";

  export default {
    head() {
      return {
        title: '猿村-找回密码',
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: '找回密码'
          },
          {
            hid: 'keywords',
            name: 'keywords',
            content: '猿村,java,C#,开发,系统,程序员,宣君'
          }
        ]
      }
    },
    methods: {
      mounted() {
        this.$store.commit("setCurrentActivityTab", "forget");
      },
      setPassword() {
        //真的是找回密码
        //只检查密码
        //其他数据也要携带上
        if (this.originalPassword === '') {
          this.$message.error('请输入密码');
          return;
        }
        this.sobUser.password = hex_md5(this.originalPassword);
        //提交数据
        api.updatePassword(this.emailCode, this.sobUser).then(result => {
          if (result.code === api.success_code) {
            //成功，提示，并且跳转到登录页面
            this.$message.success(result.message);
            location.href = "/login"
          } else {
            this.$message.error(result.message);
            //给出提示，显示回验证页面，然后重新加图灵验证码
            this.showType = 'verifyCode';
            this.updateVerifyCode();
          }
        });
      },
      getVerifyCode() {
        /*
        * 检查图灵验证码是否为空
        * 检查邮箱地址是否为空
        * 校验邮箱格式
        * 请求发送验证码
        * 禁止按钮点击并且倒计时
        * */
        if (this.captchaCode === '') {
          this.$message.error("请输入图灵验证码");
          return;
        }

        if (this.sobUser.email === '') {
          this.$message.error("请输入邮箱地址");
          return;
        }

        // 检查邮箱格式，判空
        let reg = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
        if (!reg.test(this.sobUser.email)) {
          this.$message.error("邮箱地址格式不正确");
          return
        }

        api.sendEmailCode(this.captchaCode, this.sobUser.email, 'forget').then(result => {
          if (result.code === api.success_code) {
            //如果发送成功，开始倒计时
            this.startCountDown();
            this.$message.success(result.message);
          } else {
            //否则给出提示
            this.$message.error(result.message);
            this.updateVerifyCode();
          }
        })
      },
      startCountDown() {
        let time = 60;
        this.isCountDowning = true;
        let that = this;
        let interval = setInterval(function () {
          //执行倒计时内容
          time--;
          if (time <= 0) {
            that.isCountDowning = false;
            clearInterval(interval);
          }
          that.countDownText = '重新发送(' + time + ')';
          // console.log('倒计时 == >  ' + time + '  ' + that.countDownText);
        }, 1000);
      },
      resetPassword() {
        if (this.captchaCode === '') {
          this.$message.error('请证明你是图灵');
          return;
        }
        if (this.sobUser.email === '') {
          this.$message.error('邮箱地址不可以为空');
          return;
        }
        if (this.emailCode === '') {
          this.$message.error('请输入邮箱验证码');
          return;
        }
        /*
        * 判空
        * 检查当前验证是否正确，如果正确，就显示修改密码的部分
        * */
        api.checkVerifyCode(this.captchaCode, this.sobUser.email, this.emailCode).then(result => {
          if (result.code === api.success_code) {
            //显示设置密码的UI
            this.showType = 'resetPassword'
          } else {
            //给出提示，重新加载验证码
            this.$message.error(result.message);
            this.updateVerifyCode();
          }
        });
      },
      updateVerifyCode() {
        this.captchaPath = '/user/utils/captcha' + "?random=" + Date.parse(new Date());
        //console.log(this.captchaPath);
      },
      doLogin() {

      }
    },
    data() {
      return {
        showType: 'verifyCode',
        originalPassword: '',
        emailCode: '',
        countDownText: '重新发送(60)',
        isCountDowning: false,
        captchaCode: '',
        captchaPath: '/user/utils/captcha',
        sobUser: {
          email: '',
          password: ''
        }
      }
    }
  }
</script>
<style>
  .forget-form-container {
    margin-left: 30px;
    padding-top: 40px;
  }

  .forget-title {
    color: #999;
    position: absolute;
    margin-right: 20px;
    font-size: 20px;
    font-weight: 600;
  }

  .email-get-verify-code-btn {
    margin-left: 10px;
  }

  .captcha-code {
    cursor: pointer;
    vertical-align: middle;
    margin-left: 10px;
    border: solid 1px #E6E6E6;
    width: 118px;
    padding-left: 10px;
    padding-right: 10px;
    height: 36px;
  }

  .forget-container .el-input {
    width: auto;
  }

  .forget-container .el-input__inner {
    width: 250px;
  }

  .forget-container {
    background: #fff;
    position: relative;
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 20px;
  }
</style>
