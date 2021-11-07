<template>
  <div class="blog-box">
    <div class="blog-header clear-fix default-border-radius">
      <div class="logo-box float-left">
        <div class="logo">
          <a href="/" target="_blank">猿村</a>
        </div>

      </div>

      <div class="login-tips-text-box float-right">
        <span class="sob_blog sobfingermap"> 登录</span> |
        <span class="sob_blog sobmembers-add"> 注册</span>
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

      <div class="user-info-box float-left" style="display: none">用户信息</div>
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
  background: rgba(244, 239, 239, 0.8);
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
  margin-right: 60px;
}

.navigation-box span {
  margin-right: 20px;
  font-size: 16px;
  font-weight: 500;
  color: #737F90;
}

.navigation-box span:hover {
  cursor: pointer;
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

.login-tips-text-box span:hover {
  cursor: pointer;
  color: #c9adf3;
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

</style>
