import {USER_INFO} from './mutations-type'
import {getStore} from  './../config/global'
import {getUserInfo} from './../service/api/index'
export default {

    syncUserInfo ({commit},userInfo)
    {
        commit(USER_INFO, {userInfo});
    },
    //1 自动登录数据
  async  reqUserInfo ({commit})
 {  //1.0从本地获取
     let userInfo=JSON.parse(getStore('userInfo'));
     //1.1.1判断是否有数据
     if(userInfo)
     {
         commit(USER_INFO,{userInfo});

     }//1.2从服务器上获取
     else {
         let result=await getUserInfo();
         if(200===result.success_code)
         {
             commit(USER_INFO, {userInfo: result.data});
         }

     }
 }


}