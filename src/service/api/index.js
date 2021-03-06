import ajax from './ajax'
//路径
const BASE_URL='http://demo.itlike.com/web/xlmc'
//获取主页的内容
export const getHomeData=()=>ajax(BASE_URL+'/api/homeApi');
//获取分类数据
export const getCategories = () => ajax(BASE_URL + '/api/homeApi/categories');
export const getCategoriesDetail = (preParams) => ajax(BASE_URL + '/api/homeApi/categoriesdetail' + preParams);
// 2. 用户中心接口
//  http://localhost:3000/web/xlmc/api/send_code
const LOCAL_BASE_URL = 'http://demo.itlike.com/web/xlmc';
// const LOCAL_BASE_URL = '/api';

// 2.1 获取短信验证码(GET)
export const getPhoneCode = (phone) => ajax(LOCAL_BASE_URL + '/api/send_code', {phone});
// 2.2 手机验证码登录(POST)
export const phoneCodeLogin = (phone, code) => ajax(LOCAL_BASE_URL + '/api/login_code', {phone, code}, 'POST');
// 2.3 用户名和密码登录(POST)
export const pwdLogin = (user_name, user_pwd, captcha) => ajax('http://localhost:3000/login', {user_name, user_pwd, captcha}, 'POST');
// 2.4 自动登录
export const  getUserInfo = ()=> ajax(LOCAL_BASE_URL + '/api/userinfo');
// 2.5 退出登录
export const getLogOut = ()=> ajax(LOCAL_BASE_URL + '/api/logout');
