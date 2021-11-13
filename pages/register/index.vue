<template>
  <div class="register-box">
    <div class="register-form-container">
      <div class="register-title">注 册</div>
      <div class="form-container">
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
          <el-form-item label="用户名" required>
            <el-input v-model="user.userName" placeholder="请输入用户名" @blur="checkUserName"></el-input>
            <span class="el-icon-error" v-if="isUserNameAvailable===2"> 用户名已存在</span>
            <span class="el-icon-success" v-if="isUserNameAvailable===1">用户名可用</span>
          </el-form-item>
          <el-form-item label="密码" required>
            <el-input v-model="originalPassword" type="password" placeholder="请输入验密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="doRegister()">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style>
.form-container .el-icon-error {
  color: #F56C6C;
}

.form-container .el-icon-success {
  color: #67C23A;
}

.form-container {
  margin-left: 80px;
}

.register-title {
  position: absolute;
  margin-left: 20px;
  font-size: 20px;
  font-weight: 600;
  color: #999;
}

.register-form-container {
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

.register-form-container .el-input__inner {
  width: 250px;
}

.register-form-container .el-input {
  width: auto;
}

.register-box {
  background: #FFffff;
  border-radius: 8px;
  margin-top: 10px;
  padding: 20px;
  margin-bottom: 20px;
}

</style>

<script>
/*
注册逻辑：
1. 鼠标离开用户名输入框，校验用户名是否注册
2. 点击获取邮箱验证码，检查油箱格式且校验邮箱是否注册，发送邮箱验证码
3. 注册成功跳转登录界面
* */
import * as api from '../../api/api';
import {checkUserName, sendEmail} from "../../api/api";
import {hex_md5} from "@/utils/md5";

export default {
  methods: {

    checkUserName() {
      if (this.user.userName === '') {
        this.isUserNameAvailable = 0;
        return;
      }
      api.checkUserName(this.user.userName).then(res => {
        // 1 表示用户名不可用 2 表示可用 默认0
        this.isUserNameAvailable = res.code === api.successCode ? 1 : 2;
      })
    },

    doRegister() {
      console.log(this.user.userName);
      //检查内容
      if (this.captchaCode === '') {
        this.$message.error("验证码为空");
        return;
      }
      if (this.user.email === '') {
        this.$message.error("邮箱地址为空");
        return;
      }
      if (this.emailCode === '') {
        this.$message.error("邮箱验证码为空");
        return;
      }
      if (this.user.userName === '') {
        this.$message.error("用户名为空");
        return;
      }
      if (this.originalPassword === '') {
        this.$message.error("密码为空");
        return;
      }
      // 加密密码
      this.user.password = hex_md5(this.originalPassword);
      // 提交数据
      api.doRegister(this.captchaCode,this.emailCode,this.user).then(res => {
        if (res.code == api.successCode) {
          //注册成功
          this.$message.success(res.message);
          //跳转登录界面
          location.href="/login";
        }else {
          this.$message.error(res.message);
          this.updateVerifyCode();
        }
      }).catch(err => {
        this.$message.error(err.message);
        this.updateVerifyCode();
      })
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
      api.sendEmail(this.captchaCode, this.user.email, "register").then(res => {
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

    updateVerifyCode() {
      this.captchaPath = '/user/utils/captcha?random=' + Date.parse(new Date());
    },
  },

  data() {
    return {
      isUserNameAvailable: 0,
      isCountDowning: false,
      countDownText: '重新发送(60s)',
      emailCode: '',
      captchaPath: '/user/utils/captcha',
      captchaCode: '',
      originalPassword: '',
      user: {
        userName: '',
        password: '',
        email: '',

      }
    }
  }
}
</script>
