<template>
  <div id="blog-box">
    <div id="blog-header" class="blog-header clear-fix default-border-radius">
      <div class="logo-box float-left">
        <div class="logo">
          <a href="/">
            <h1>猿村</h1>
          </a>
        </div>
      </div>
      <div id="login-tips-text-box" style="display: none;" class="login-tips-text-box float-right">
        <span>
          <a :href="'/login'+redirectPath"><i class="sob_blog sobfingermap"></i>登录</a>
        </span>
        <span>
         <a href="/register"><i class="sob_blog sobmembers-add"></i>注册</a>
        </span>
      </div>
      <div id="user-info-box" style="display: none;" class="user-info-box float-right clear-fix">
        <div class="header-user-avatar float-left">
          <img v-if="userInfo!==null" style="object-fit: cover"
               :src="userInfo.avatar">
        </div>
        <div class="header-user-username float-left" v-if="userInfo!==null">
          <el-dropdown @command="handlerCommand">
                      <span class="el-dropdown-link">
                        {{ userInfo.userName }} <i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="userInfo">个人中心</el-dropdown-item>
              <el-dropdown-item command="adminCenter" v-if="userInfo.roles==='role_admin'">后台管理</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="navigation-box float-right">
        <NuxtLink to="/">
          <span :class="$store.state.currentActivityTab==='index'?'header-title-activity':''"><i
            class="sob_blog sobhome"></i> 首页</span>
        </NuxtLink>
        <NuxtLink to="/link">
          <span :class="$store.state.currentActivityTab==='link'?'header-title-activity':''"><i
            class="sob_blog soblink"></i> 友链</span>
        </NuxtLink>
        <a href="/about" target="_blank">
          <span><i class="el-icon-goods"></i> 关于</span>
        </a>
        <span @click="checkPublish"><i class="el-icon-document"></i> 发布内容</span>
      </div>
    </div>
    <Nuxt/>
    <div class="blog-footer">
      <div class="copy-right-box">
        <p>
          Copyright ©
          <a href="http://www.xuyuanjun.cn" target="_blank">
            猿村
          </a>
          (2021） 本网站由宣君创立，记录程序猿的历程
        </p>
      </div>
      <div class="bottom-link">
        <span>
          <a href="/about" target="_blank">关于我们</a>
        </span>
        |
        <span>
          <a href="/about#contacts" target="_blank">联系我们</a>
        </span>
        |
        <span>
         <a href="/link" target="_blank">友情链接</a>
        </span>
      </div>
      <div class="beian-box">
        <a href="https://beian.miit.gov.cn/" target="_blank"><span>鄂ICP备2020020513号-1</span></a>
      </div>
    </div>
    <div id="g-to-top" style="display: none;" @click="toTop">
      <div class="el-icon-caret-top">
      </div>
      <div>
        回到
        <br>
        顶部
      </div>
    </div>
  </div>
</template>
<script>
import * as api from '../api/api';

export default {
  methods: {
    checkPublish() {
      api.checkToken().then(res => {
        if (res.code === api.success_code) {
          location.href = '/editor';
        } else {
          this.$message.warning("请先登录哦");
          return;
        }
      }).catch(err => {
        console.log(err)
      })
    },

    toTop() {
      document.documentElement.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
    onWindowScroll() {
      let offTop = document.documentElement.scrollTop;
      let toTopBox = document.getElementById('g-to-top');
      if (offTop > 500) {
        toTopBox.style.display = 'block';
      } else {
        toTopBox.style.display = 'none';
      }
    },
    handlerCommand(command) {
      if (command === 'logout') {
        api.doLogout().then(result => {
          if (result.code === api.success_code) {
            //跳转到登录页面
            location.href = "/login"
          }
        })
      } else if (command === 'adminCenter') {
        location.href = 'http://mp.xuyuanjun.cn/#/index';
        //  location.href = 'http://localhost:8080/#/index';
      } else if (command === 'userInfo') {
        location.href = "/userInfo/" + this.userInfo.id;
      }
    },
    checkToken() {
      api.checkToken().then(result => {
        let loginTips = document.getElementById('login-tips-text-box');
        let userInfoBox = document.getElementById('user-info-box');
        if (result.code === api.success_code) {
          //获取成功
          this.userInfo = result.data;
          //拿到id以后，通过状态树共享，跟其他组件共享
          this.$store.commit("setCurrentUserId", this.userInfo.id);
          if (userInfoBox) {
            userInfoBox.style.display = 'block';
          }
        } else {
          if (loginTips) {
            //控制顶部登录提示的显示
            loginTips.style.display = 'block';
          }
        }
      })
    }
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onWindowScroll);
  },
  mounted() {
    window.addEventListener("scroll", this.onWindowScroll);
    if (this.redirectPath !== '?redirect=' + location.href &&
      this.$route.path !== '/'
      && this.$route.path !== '/login'
      && this.$route.path !== '/register'
      && this.$route.path !== '/forget'
    ) {
      //排除一些特殊的，比如说登录
      //比如说首页
      this.redirectPath = '?redirect=' + location.href;
    }
    this.checkToken()
  },
  data() {
    return {
      redirectPath: '',
      userInfo: null
    }
  }
};
</script>
<style>

#g-to-top .el-icon-caret-top {
  font-size: 30px;
}

#g-to-top:hover {
  border: 1px solid #409EFF;
  color: #409EFF !important;
}

#g-to-top {
  border: 1px solid #7f828b;
  padding: 0 10px 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  position: fixed;
  right: 20px;
  text-align: center;
  bottom: 200px;
}

.beian-box {
  margin-top: 10px;
}

.beian-box span:hover {
  color: #409EFF;
}

.beian-box span {
  color: #737F90;
}

.bottom-link a:hover {
  color: #409EFF;
}

.header-title-activity {
  color: #409EFF !important;
}

.header-user-username span {
  font-weight: 600;
  cursor: pointer;
  color: #737F90;
}

.header-user-avatar {
  margin-right: 10px;
}

.header-user-avatar img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  vertical-align: middle;
}

.el-message {
  min-width: 0 !important;
}

.el-carousel__button {
  height: 10px;
  width: 10px;
  border-radius: 50%;
}


h1 {
  color: #737F90;
  font-size: 24px;
  font-weight: 600;
}

.default-border-radius {
  border-radius: 8px;
}

.navigation-box span:hover, .login-tips-text-box span:hover {
  color: #409EFF;
}

.navigation-box span {
  margin-right: 40px;
  color: #737F90;
  font-size: 16px;
  cursor: pointer;
}

.navigation-box i {
  font-size: 20px;
  font-weight: 600;
}

.navigation-box {
  position: absolute;
  right: 200px;
}

.login-tips-text-box a:hover {
  color: #409EFFFF;
}

.login-tips-text-box a {
  margin-right: 10px;
  color: #737F90;
}

.login-tips-text-box {
  font-size: 16px;
}

.logo-box {
  margin-left: 10px;
}

.logo-box .logo {
  color: #737F90;
  font-size: 24px;
  font-weight: 600;
}


a {
  text-decoration: none;
}

.copy-right-box {
  margin-bottom: 10px;
}

.copy-right-box a:hover {
  color: #409EFF;
}

.blog-footer {
  color: #737F90;
  text-align: center;
  font-size: 16px;
}

.blog-footer a {
  color: #9ab6e3;
}

* {
  padding: 0;
  margin: 0;
}

.blog-header {
  margin-top: 10px;
  line-height: 30px;
  position: relative;
  background: #Fff;
  padding: 10px;
}

body {
  /*background: #e4e4f9;*/
  background-image: linear-gradient(to left, #b8edeb 0%, #fce6ee 100%);
}

#blog-box {
  width: 1140px;
  margin: 0 auto;
  height: 100%;
  background: rgba(255, 255, 255, 0);
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
</style>
