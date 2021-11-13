<template>
  <div class="forget-box">
    <div class="forget-container">
      <div class="forget-title">找回密码</div>
      <div class="forget-form-container">
        <div class="form-container">
          <div class="verify-code-container" v-if="showType==='verifyCode'">
            <el-form label-width="100px">
              <el-form-item label="验证码" required>
                <el-input v-model="captchaCode" placeholder="请输入验证码"></el-input>
                <img :src="captchaPath" @click="updateVerifyCode" class="captcha-code">
              </el-form-item>
              <el-form-item label="邮箱地址" required>
                <el-input v-model="user.email" placeholder="请输入邮箱地址"></el-input>
                <el-button v-if="!isCountDowning" type="primary" @click="sendEmail" class="get-verify-code">获取验证码
                </el-button>
                <el-button v-else class="get-verify-code" @click.prevent="sendEmail" type="primary" disabled>
                  {{ countDownText }}
                </el-button>
              </el-form-item>
              <el-form-item label="邮箱验证码" required>
                <el-input v-model="emailCode" placeholder="请输入邮箱验证码"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="resetPassword()">找回密码</el-button>
              </el-form-item>
            </el-form>
          </div>

          <div v-if="showType==='resetPassword'" class="forget-reset-password-container">
            <el-form label-width="100px">
              <el-form-item label="新密码" required>
                <el-input v-model="originalPassword" type="password" placeholder="请输入验密码"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="setPassword()">设置密码</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>

.forget-container .el-icon-error {
  color: #F56C6C;
}

.forget-container .el-icon-success {
  color: #67C23A;
}

.form-container {
  margin-left: 80px;
}

.forget-title {
  position: absolute;
  margin-left: 20px;
  font-size: 20px;
  font-weight: 600;
  color: #999;
}

.forget-form-container {
  position: relative;
}

.captcha-code {
  cursor: pointer;
  vertical-align: middle;
  margin-left: 10px;
  border: solid 1px #E6E6E6;
  width: 116px;
  padding-left: 10px;
  padding-right: 10px;
  height: 36px;
  border-radius: 8px;
}

.get-verify-code {
  margin-left: 10px;
}

.forget-form-container .el-input__inner {
  width: 250px;
}

.forget-form-container .el-input {
  width: auto;
}

.forget-box {
  background: #FFffff;
  border-radius: 8px;
  margin-top: 10px;
  padding: 20px;
  margin-bottom: 20px;
}


</style>

<script>
import * as api from "@/api/api";
import {hex_md5} from "@/utils/md5";
import {updatePassword} from "@/api/api";

export default {

  methods: {
    updateVerifyCode() {
      this.captchaPath = '/user/utils/captcha?random=' + Date.parse(new Date());
    },

    resetPassword() {
      if (this.captchaCode === '') {
        this.$message.error("验证码为空");
        return;
      }
      if (this.emailCode === '') {
        this.$message.error("邮箱验证码为空");
        return;
      }
      if (this.user.email === '') {
        this.$message.error("邮箱地址为空");
        return;
      }
      /*
      * 检查邮箱验证码是否正确，正确则显示输入密码框
      * */
      api.checkEmailCode(this.captchaCode, this.user.email, this.emailCode).then(res => {
        if (res.code === api.successCode) {
          this.$message.success("邮箱验证通过");
          this.showType = "resetPassword";
        } else {
          this.$message.error(res.message);
          this.updateVerifyCode();
        }
      }).catch(err => {
        this.$message.error(err.message);
        this.updateVerifyCode();
      })
    },

    setPassword() {
      if (this.originalPassword === '') {
        this.$message.error("密码为空");
        return;
      }
      this.user.password = hex_md5(this.originalPassword);
      api.updatePassword(this.emailCode, this.user).then(res => {
        if (res.code === api.successCode) {
           this.$message.success(res.message);
           location.href="/login";
        }else {
          this.$message.error(res.message);
          this.showType="verifyCode";
          this.updateVerifyCode();
        }
      }).catch(err => {
        this.$message.error(err.message);
        this.showType="verifyCode";
        this.updateVerifyCode();
      })
    },
    // 开启倒计时
    startCountDown() {
      let time = 60;
      this.isCountDowning = true;
      let that = this;
      let interval = setInterval(() => {
        time--;
        if (time <= 0) {
          that.isCountDowning = false;
          clearInterval(interval);
        }
        this.countDownText = "重新发送(" + time + " s)";
      }, 1000);
    },

    sendEmail() {
      /*
      * 1. 检查验证码是否为空
      * 2. 校验邮箱格式
      * 3. 发送验证码
      * 4. 禁止按钮 并倒计时
      * */
      if (this.captchaCode === '') {
        this.$message.error("验证码为空");
        return;
      }
      if (this.user.email === '') {
        this.$message.error("邮箱地址为空");
        return;
      }
      // 检查邮箱格式
      let reg = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
      if (!reg.test(this.user.email)) {
        this.$message.error('邮箱地址格式错误');
        return;
      }
      // 发送邮件
      api.sendEmail(this.captchaCode, this.user.email, "forget").then(res => {
        console.log('=======>', res);
        if (res.code == api.successCode) {
          //发送成功，开启倒计时
          this.startCountDown();
          this.$message.success(res.message);
        } else {
          this.$message.error(res.message);
          this.updateVerifyCode();
        }
      }).catch(err => {
        this.$message.error(err.message);
        this.updateVerifyCode();
      })
    },
  },

  data() {
    return {
      showType: 'verifyCode',
      countDownText: '重新发送(60s)',
      isCountDowning: 0,
      originalPassword: '',
      emailCode: '',
      captchaCode: '',
      captchaPath: '/user/utils/captcha',
      user: {
        email: '',
        password: ''
      }
    }

  }

}
</script>
