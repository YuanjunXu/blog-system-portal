import http from './http';

// 服务器
//const baseUrl =  'http://42.192.76.36:8010';
// 测试
const baseUrl =  'http://localhost:2021';

export const success_code = 20000;

export const getAdminInfo = () => {
  if (process.client) {
    // 生产账号  909839612229189632
    // return http.requestGet('/user/user_info/909839612229189632');

    // 测试账号  909839901371924480
    return http.requestGet('/user/user_info/909839901371924480');
  } else {
    // 生产账号
    // return http.requestGet(baseUrl + '/user/user_info/909839612229189632');

    // 测试账号
    return http.requestGet(baseUrl + '/user/user_info/909839901371924480');
  }
};

export const getCategories = () => {
  if (process.client) {
    return http.requestGet('/portal/article/categories');
  } else {
    return http.requestGet(baseUrl + '/portal/article/categories');
  }
};
export const getLoop = () => {
  if (process.client) {
    return http.requestGet('/portal/web_size_info/loop');
  } else {
    return http.requestGet(baseUrl + '/portal/web_size_info/loop');
  }
};
export const getTopArticle = () => {
  if (process.client) {
    return http.requestGet('/portal/article/top');
  } else {
    return http.requestGet(baseUrl + '/portal/article/top');
  }
};
export const getLabels = (count) => {
  return http.requestGet('/portal/article/label/' + count);
};
export const getArticles = (categoryId, page, size) => {
  if (categoryId !== '') {
    return http.requestGet('/portal/article/list/' + categoryId + '/' + page + '/' + size);
  }
  if (process.client) {
    //客户端
    return http.requestGet('/portal/article/list/' + page + '/' + size);
  } else {
    //服务端
    return http.requestGet(baseUrl + '/portal/article/list/' + page + '/' + size);
  }
};

export const getTaobaoRecommend = (size) => {
  return http.requestGet("/shop/recommend/random/" + size);
};
export const getSearchContent = (categoryId, keyword,
                                 page,
                                 size,
                                 sort) => {
  return http.requestGet(baseUrl + "/portal/search?keyword=" + encodeURIComponent(keyword)
    + "&page=" + page + "&size="
    + size + "&categoryId=" + categoryId
    + "&sort=" + sort);
};

export const getLinkList = () => {
  if (process.client) {
    return http.requestGet("/portal/web_size_info/friend_link");
  } else {
    return http.requestGet(baseUrl + "/portal/web_size_info/friend_link");
  }
};

export const getLoginQrCode = () => {
  return http.requestGet("/user/utils/pc_login_qr_code");
};


export const doLogin = (verifyCode, sobUser) => {
  return http.requestPost('/user/account/login/' + verifyCode + '/?from=_p', sobUser);
};

export const checkToken = () => {
  return http.requestGet('/user/utils/check_token');
};

export const doLogout = () => {
  return http.requestGet('/user/account/logout');
};


export const checkScanLoginState = (loginId) => {
  return http.requestGet('/user/account/qr_code_state/' + loginId);
};

export const checkUserName = (userName) => {
  return http.requestGet('/user/utils/user_name?userName=' + userName);
};

export const updateUserInfo = (sobUser, userId) => {
  return http.requestPut('/user/user_info/' + userId, sobUser);
};


export const sendEmailCode = (captchaCode, email, type) => {
  return http.requestGet('/user/utils/verify_code?captchaCode=' + captchaCode
    + '&email=' + email
    + '&type=' + type);
};

export const registerUser = (captcha_code, email_code, sobUser) => {
  return http.requestPost('/user/join_in/?captcha_code=' + captcha_code
    + '&email_code=' + email_code, sobUser);
};

export const checkVerifyCode = (captchaCode, email, emailCode) => {
  return http.requestGet('/user/utils/check_email_code?captchaCode=' + captchaCode
    + '&email=' +
    email
    + '&emailCode='
    + emailCode);
};
export const updatePassword = (verifyCode, sobUser) => {
  return http.requestPut('/user/password/' + verifyCode, sobUser);
};
export const getArticleDetailById = (articleId) => {
  return http.requestGet(baseUrl + '/portal/article/' + articleId);
};
export const getRecommendArticle = (articleId, size) => {
  return http.requestGet(baseUrl + '/portal/article/recommend/' + articleId + '/' + size);
};

export const postComment = (articleComment) => {
  return http.requestPost('/portal/comment', articleComment);
};
export const getFile = (url, params) => {
  return http.requestGet(url, params);
};

export const getCommentsByArticleId = (articleId, page, size) => {
  if (process.client) {
    return http.requestGet("/portal/comment/list/" + articleId + "/" + page + "/" + size);
  } else {
    return http.requestGet(baseUrl + "/portal/comment/list/" + articleId + "/" + page + "/" + size);
  }
};

export const getUserInfo = (userId) => {
  if (process.client) {
    return http.requestGet("/user/user_info/" + userId);
  } else {
    return http.requestGet(baseUrl + "/user/user_info/" + userId);
  }
};



