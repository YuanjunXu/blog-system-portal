import http from './http';

export const successCode = 200;

const baseUrl = 'http://localhost:2021/';

//获取管理员信息
export const getAdmin = () => {
  return http.requestGetHandle(baseUrl+'user/user_info/20173013961932800');
}
