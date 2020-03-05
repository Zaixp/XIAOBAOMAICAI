<template>
<div class="goodsWrapper">
<div class="goods">  
<van-nav-bar  left-arrow @click-left="onClickLeft">
  <van-icon name="search" slot="right" />
  <div slot="title">
  <van-tabs v-model="active">
  <van-tab title="商品"></van-tab>  
  <van-tab title="评价"></van-tab>
  <van-tab title="详情"></van-tab>
  <van-tab title="推荐"></van-tab>
</van-tabs>
  </div>
</van-nav-bar>
   
<van-swipe @change="onChange"
indicator-color="red"
>
  <van-swipe-item><img :src="product.small_image" class="goodsImg"></van-swipe-item>
  <van-swipe-item><img src="./images/detail1.jpg" class="goodsImg"></van-swipe-item>
  <van-swipe-item><img src="./images/detail1.jpg" class="goodsImg"></van-swipe-item>
  <div class="custom-indicator" slot="indicator">
    <span class="indicator">{{ current + 1 }}/3</span> 
  </div>
</van-swipe>
<van-cell-group>
 
  <van-cell :title="product.name"   />
   <van-cell :title="product.price|moneyFormat" class="price" />
</van-cell-group>
 <van-cell :title="time" />
 <van-cell :title="product.spec" size="large"/>


 <van-cell-group style="margin-top:1rem">
  <van-cell title="评论"  size="large" title-style="font-weight:1000;" />
  <van-cell title="xx1299"  label="非常好吃" />
  <van-cell title="xx1299"  label="非常好吃非常好吃非常好吃" />
   <van-cell title="xx1299"  label="非常好吃非常好吃非常好吃" />
</van-cell-group>
</div>
<van-goods-action>
  <van-goods-action-icon icon="cart-o" text="购物车" :info="cartGoodsNum?cartGoodsNum:''" />

  <van-goods-action-button type="warning" text="加入购物车" @click="addCart()" />

</van-goods-action>

<Sku :skuShow="skuShow" @changeSkuShow="changeSkuShow()" :product='product' />
</div>
</template>

<script>
import Sku from './components/Sku.vue'
import moment from 'moment'
import {mapState} from 'vuex'
export default {
 data() {
    return {
      current: 0,
        active: 0,
          show: false,
        skuShow:false
    }
  },
  watch:{

  },
  computed:{
    ...mapState(['shopCart','userInfo']),
product()
{
  return this.$route.params.product;
},
time()
{ 
  
  let time=  moment().add(3,'hour').calendar();

return '最快送达时间:'+time;
}
,
cartGoodsNum()
{  let num =0;
let shopCart = this.shopCart;
Object.keys(shopCart).forEach((v,index)=>{
    num++;
});
return num;
}
  },
  mounted()
  {

  console.log(this.$route.params.product)
  },
  methods: {
    onClickLeft()
    {
      this.$router.go(-1);
    },
changeSkuShow(value)
{
this.skuShow=value;
}
,
    onChange(index) {
      this.current = index;
    }
     ,
  
   addCart(){
      this.skuShow=false;
      this.skuShow=true;
  }
  ,
 
  },
  components:{
     Sku
  }
}
</script>
<style lang="less" scoped>
.goodsWrapper{
  width: 100%;
height: 100%;  
}
.goods{
width: 100%;
height: 100%;
margin-bottom:8rem; 
   .price{
       color: rgb(240, 73, 73);
   }
}
.goodsImg{
   
    width: 100%;
     height: 15rem;
}
.indicator{
    text-align: center;
    position: absolute;
    bottom: 0.5rem;
    right: 0.5rem;
   height: 1.5rem;
   width: 3rem;
   line-height: 1.5rem;
   color: rgb(50, 214, 124);
   background-color:rgba(0, 0, 0, 0.1);
   border-radius: 0.9rem;

}
</style> 

