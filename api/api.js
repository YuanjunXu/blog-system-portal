import http from './http';

export const successCode = 200;

const baseUrl = 'http://localhost:2021/';

//获取管理员信息
export const getAdmin = () => {
  return http.requestGetHandle(baseUrl+'user/user_info/20173013961932800');
}

// 获取分类
export const getCategories = () => {
  return http.requestGetHandle(baseUrl+'portal/article/categories');
}
// 获取轮播图
export const getLoopImages = () => {
  return http.requestGetHandle(baseUrl+'portal/web_size_info/loop');
}
// 获取置顶文章列表
export const getTopArticles = () => {
  return http.requestGetHandle(baseUrl+'portal/article/top');
}
