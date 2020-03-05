import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from  '@/views/dashboard/Dashboard.vue';

//懒加载
const Home=()=>import('@/views/home/Home.vue');
const Cart=()=>import('@/views/cart/Cart.vue');
const Category=()=>import('@/views/category/Category.vue');
const Mine=()=>import('@/views/mine/Mine.vue');
const Order=()=>import('@/views/order/Order.vue');
const MyAddress=()=>import('@/views/order/children/MyAddress.vue');
const AddAddress=()=>import('.././views/order/children/children/AddAddress.vue');
const EditAddress=()=>import('.././views/order/children/children/EditAddress.vue');
const Login = ()=> import('./../views/login/Login.vue');
const UserCenter=()=>import('@/views/mine/children/UserCenter.vue');
const SelectLogin=()=>import('@/views/login/SelectLogin.vue');
const Goods=()=>import('../views/goods/Goods');
const Search=()=>import('../views/search/Search')

Vue.use(Router);

export default new Router({

    routes:[
        {
            path:'/', redirect:'/dashboard'
        },
        {
          path:'/dashboard',name:'dashboard',component:Dashboard,
            children:[
                {path:'/dashboard',redirect: '/dashboard/home'},
                {path:'category',name:'category',component:Category},
                {path:'mine',name:'mine',component:Mine,
                    children:[
                        {path:'userCenter',name:'userCenter',component:UserCenter}
                    ]
                },
                {path:'home',name:'home',component:Home,meta:{keepAlive:true}},
                {path:'cart',name:'cart',component:Cart}
            ]
        }
     ,{
        path:'/order',name:'order',component:Order
        ,
            children:[
                {path:'myAddress',name:'myAddress',component:MyAddress,
                    children:[
                        {path:'addAddress',name:'addAddress',component:AddAddress},
                        {path:'editAddress',name:'editAddress',component:EditAddress}

                    ]
                }
            ]
        },
        {path:'/login',name:'login',component:Login},
        {path:'/search',name:'search',component:Search},
        {path:'/selectLogin',name:'select',component:SelectLogin},
        {path:'/goods',name:'goods',component:Goods,
         children:[

         ]
    }
    ]
});