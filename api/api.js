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


