import http from './http';

export const successCode = 200;

const baseUrl = 'http://localhost:2021/';

//获取管理员信息
export const getAdmin = () => {
  if (process.client) {
    return http.requestGetHandle('user/user_info/20173013961932800');
  } else {
    return http.requestGetHandle(baseUrl + 'user/user_info/20173013961932800');
  }
}

// 获取分类
export const getCategories = () => {
  if (process.client) {
    return http.requestGetHandle('portal/article/categories');
  }
  return http.requestGetHandle(baseUrl + 'portal/article/categories');
}
// 获取轮播图
export const getLoopImages = () => {
  if (process.client) {
    return http.requestGetHandle('portal/web_size_info/loop');
  }
  return http.requestGetHandle(baseUrl + 'portal/web_size_info/loop');
}
// 获取置顶文章列表
export const getTopArticles = () => {
  if (process.client) {
    return http.requestGetHandle('portal/article/top');
  }
  return http.requestGetHandle(baseUrl + 'portal/article/top');
}


// 获取最新文章列表
export const getLatestArticlesByCategoryId = (categoryId, page, size) => {
  if (categoryId !== '') {
    return http.requestGetHandle('portal/article/list/' + categoryId + '/' + page + '/' + size);
  }
  if (process.client) {
    // 客户端配置跨域代理
    return http.requestGetHandle('portal/article/list/' + page + '/' + size);
  } else {
    // 服务端直接请求
    return http.requestGetHandle(baseUrl + 'portal/article/list/' + page + '/' + size);
  }
}


// 获取热门标签
export const getHotLabels = (size) => {
  if (process.client) {
    return http.requestGetHandle("portal/article/label/" + size);
  } else {
    return http.requestGetHandle(baseUrl + "portal/article/label/" + size);
  }
}

// 获取友链
export const getLinkList = () => {
  if (process.client) {
    return http.requestGetHandle("portal/web_size_info/friend_link");
  }
  return http.requestGetHandle(baseUrl + "portal/web_size_info/friend_link");
}

// 搜索内容
export const doSearch = (categoryId, keyword, page, size, sort) => {
  return http.requestGetHandle(baseUrl + "portal/search?keyword=" + encodeURIComponent(keyword) + "&page=" + page + "&size="
    + size + "&categoryId=" + categoryId + "&sort=" + sort);
}

// 获取二维码
export const getLoginQrCode = () => {
  return http.requestGetHandle("/user/utils/pc_login_qr_code");
};

// 登录
export const doLogin = (verifyCode, sobUser) => {
  return http.requestPostHandle('/user/account/login/' + verifyCode + '/?from=_p', sobUser);
};

// 检查扫描登录状态
export const checkScanLoginState = (loginId) => {
  return http.requestGetHandle('/user/account/qr_code_state/' + loginId);
};

// 获取用户登录状态
export const checkToken = () => {
  return http.requestGetHandle("/user/utils/check_token");
}

export const logout = () => {
  return http.requestGetHandle("user/account/logout");
}

export const sendEmail = (captchaCode, email, type) => {
  return http.requestGetHandle("/user/utils/verify_code?captchaCode=" + captchaCode + "&email=" + email + "&type=" + type);
}

// 检查用户名是否存在
export const checkUserName = (userName) => {
  return http.requestGetHandle("user/utils/user_name?userName=" + userName);
}

// 注册
export const doRegister = (captcha_code, email_code, sobUser) => {
  return http.requestPostHandle("/user/join_in?captcha_code=" + captcha_code + "&email_code=" + email_code, sobUser);
}

//验证邮箱验证码
export const checkEmailCode = (captchaCode, email, emailCode) => {
  return http.requestGetHandle("user/utils/check_email_code?captchaCode=" + captchaCode + "&email=" + email + "&emailCode=" + emailCode);
}

//更新密码
export const updatePassword = (verifyCode, user) => {
  return http.requestPutHandle("user/password/" + verifyCode, user);
}
