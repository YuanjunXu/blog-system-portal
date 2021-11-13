<template>
  <div class="blog-box">
    <div id="blog-header" class="blog-header clear-fix default-border-radius">
      <div class="logo-box float-left">
        <div class="logo">
          <a href="/" target="_blank">猿村</a>
        </div>

      </div>

      <div id="login-tips-text-box" style="display: none" class="login-tips-text-box float-right">
        <span>
          <a :href="'/login'+redirectPath" target=""> <i
            class="sob_blog sobfingermap"></i> 登录 &nbsp;&nbsp;</a>
        </span>
        <span>
          <a href="/register" target=""> <i class="sob_blog sobmembers-add"></i> 注册</a>
        </span>
      </div>

      <div id="user-info-box" style="display: none" class="user-info-box float-right clear-fix">
        <div class="header-user-avatar float-left">
          <img v-if="userInfo!==null" :src="userInfo.avatar" style="object-fit: cover">
        </div>
        <div class="header-user-name float-left" v-if="userInfo!==null">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              {{ userInfo.userName }} <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="userInfo">个人中心</el-dropdown-item>
              <el-dropdown-item command="admin" v-if="userInfo.roles==='role_admin'">管理中心</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>

      <div class="navigation-box float-right">
        <nuxt-link to="/">
          <span> <i class="sob_blog sobhome"></i> 首页</span>
        </nuxt-link>
        <nuxt-link to="/about">
          <span> <i class="sob_blog sobabout_line"></i> 关于</span>
        </nuxt-link>
        <nuxt-link to="link">
          <span> <i class="sob_blog soblink"></i> 友链</span>
        </nuxt-link>

      </div>
    </div>

    <Nuxt/>

    <div class="blog-footer">
      <div class="copyright-box">
        <p> Copyright ©
          <a href="/" target="_blank">猿村</a> (2021)本站由宣君用爱发电，记录程序猿成长.
        </p>
      </div>

      <div class="bottom-link">
        <span><a href="/" target="_blank">关于作者</a></span> |
        <span><a href="/" target="_blank">联系作者</a></span> |
        <span><a href="/" target="_blank">友情链接</a></span>
      </div>
    </div>
  </div>
</template>

<style>
* {
  padding: 0;
  margin: 0;
}

body {
  background: #F4EFEFCC;
}

a {
  text-decoration: none;
}

a:hover {
  color: #c9adf3;
}

.blog-header {
  margin-top: 10px;
  background: #Fff;
  padding: 10px;
  line-height: 30px;
  position: relative;
}

.blog-footer {
  text-align: center;
  font-size: 14px;
  margin-bottom: 10px;
}

.logo-box .logo {
  margin-left: 10px;
  color: #737F90;
  font-size: 20px;
  font-weight: 500;
}

.logo-box .logo:hover {
  cursor: pointer;
  color: #c9adf3;
}

.navigation-box {
  position: absolute;
  right: 200px;
}

.navigation-box span {
  margin-right: 20px;
  font-size: 16px;
  font-weight: 500;
  color: #737F90;
}

.navigation-box span:hover {
  color: #c9adf3;
}

.login-tips-text-box a {
  color: #737F90;
}

.login-tips-text-box a:hover {
  color: #c9adf3;
}

.login-tips-text-box {
  margin-right: 10px;
  color: #737F90;
}

.login-tips-text-box span {
  font-size: 14px;
  font-weight: 500;
}


.copyright-box {
  margin-top: 10px;
}

.blog-box {
  width: 1140px;
  margin: 0 auto;
}

.float-left {
  float: left;
}

.float-right {
  float: right;
}

.clear-fix {
  overflow: hidden;
  zoom: 1;
}

.default-border-radius {
  border-radius: 8px;
}

.header-user-name span {
  color: #737F90;
  font-weight: 500;
  cursor: pointer;
}

.header-user-avatar img {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  vertical-align: middle;
  margin-right: 10px;
}

</style>

<script>
import * as api from "../api/api";

export default {
  mounted() {

    if (this.redirectPath !== '?redirect=' + location.href
      && this.$route.path !== '/'
      && this.$route.path !== '/login'
      && this.$route.path !== '/register'
      && this.$route.path !== '/forget'
    ) {

      this.redirectPath = '?redirect=' + location.href;
    }


    this.checkToken();
  },
  methods: {
    handleCommand(command) {
      if (command === 'logout') {
        api.logout().then(res => {
          if (res.code === api.successCode) {
            // 跳转到登录界面
            location.href = '/login';
          }
        })
      } else if (command === 'admin') {
        // 跳转到管理中心
        console.log("======跳转到管理中心=====")
        // location.href='/login';
      } else if (command === 'userInfo') {
        location.href = '/userInfo';
      }
    },
    checkToken() {
      api.checkToken().then(res => {
        let loginTipsBox = document.getElementById('login-tips-text-box');
        let userInfoBox = document.getElementById('user-info-box');
        if (res.code == api.successCode) {
          this.userInfo = res.data;

          // 控制顶部用户信息和登录注册显示
          if (userInfoBox) {
            userInfoBox.style.display = 'block';
          } else {
            if (loginTipsBox) {
              loginTipsBox.style.display = 'block';
            }
          }
        } else if (loginTipsBox) {
          loginTipsBox.style.display = 'block';
        }
        ;
      })
    },
  },
  data() {
    return {
      redirectPath: '',
      userInfo: null
    }
  }

}
</script>
