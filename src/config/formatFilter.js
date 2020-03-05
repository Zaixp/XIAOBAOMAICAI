import  Vue from 'vue'

//全局金钱过滤器

Vue.filter('moneyFormat',(value)=>{

    return "￥"+Number(value).toFixed(2);
});

