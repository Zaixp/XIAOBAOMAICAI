import {ADD_GOODS,
    INIT_CART,
    REDUCE_CART,
    IS_SELECT_GOODS,
    SELECTED_All_GOODS,
    CLEAR_CART,
    USER_INFO,
    INIT_USER_INFO,
    RESET_USER_INFO
} from  './mutations-type'
import {getStore,setStore} from '.././config/global'
import Vue from 'vue'
import {removeStore} from ".././config/global"
export default {

[ADD_GOODS](state,{goodsId,goodsName,goodsPrice,smallImage}){
 let shopCart=state.shopCart;


   //判断这个商品是否存在
    if(shopCart[goodsId]){
        //让商品数量加1
        shopCart[goodsId]['num']++;



    }else {
        //不存在创建商品
       shopCart[goodsId]={
           "num":1,
           "id":goodsId,
           "name":goodsName,
           "price":goodsPrice,
           "smallImage":smallImage,
           'checked':true
       }
       state.shopCart={...shopCart};
       //保存到本地
        setStore('shopCart',state.shopCart);


    }
//返回新的对象

},
    //初始化购物车
    [INIT_CART](state){
        let initCart = getStore('shopCart');
        if(initCart){
            state.shopCart = JSON.parse(initCart);
        }


    }
,
    [REDUCE_CART](state,{goodsId})
    {
        let shopCart=state.shopCart;
        let goods=shopCart[goodsId];
        if(goods)//找到
        {
            if(goods['num']>0)
            {
                goods['num']--;
                if(goods['num']===0)
                {
                    delete shopCart[goodsId];
                }

            }
            else {
                goods=null;
            }
            // 3.2 同时数据
            state.shopCart = {...shopCart};
            setStore('shopCart', state.shopCart);
        }

    }
,
    [IS_SELECT_GOODS](state,{goodsId}){
       let shopCart=state.shopCart;
       let goods=shopCart[goodsId];

       if(goods)
       {
           if(goods.checked)
           {
               goods.checked = !goods.checked;
           }else {
                   //vue中设置对象属性
               Vue.set(goods, 'checked', true);
           }
           // 3.2 同时数据
           state.shopCart = {...shopCart};


       }

    }
    ,
    [SELECTED_All_GOODS](state,{isSelected}){


                    let shopCart = state.shopCart;
                    Object.values(shopCart).forEach((goods, index)=>{
                        if(goods.checked){ // 存在该属性
                            goods.checked = !isSelected;
                        } else {
                            Vue.set(goods, 'checked', !isSelected);
                        }
                    });
                    state.shopCart = {...shopCart};


    },
    [CLEAR_CART](state)
    {
        // console.log('clear');
        state.shopCart=null;
      state.shopCart={...state.shopCart}
      setStore('shopCart', state.shopCart);


    },
    //保存用户信息
    [USER_INFO](state,{userInfo})
    {
        state.userInfo = userInfo;
        setStore('userInfo', state.userInfo);
    },
    //初始化
    [INIT_USER_INFO](state)
    {
        let userInfo = getStore('userInfo');
         if(userInfo)
         {
             state.userInfo=JSON.parse(userInfo);
         }
    },
   //退出登录
    [RESET_USER_INFO](state)
    {
        state.userInfo = {};
        removeStore('userInfo');

    }
}