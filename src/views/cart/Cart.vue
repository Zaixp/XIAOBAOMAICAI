<template>
       <select-login v-if="!userInfo.token"></select-login>
    <div v-else id="cart">
        <!--头部区域-->
        <header class="titleWrapper">
            <h4><strong>购物车</strong></h4>
            <span class="clearCart" style="color: #c62f2f" @click="clearCart">清空购物车</span>
        </header>
        <div class="contentWrapper">
            <!--中间内容-->
            <main class="contentWrapperList">
                <section >
                    <div class="shopCartListCon" v-for="(goods) in shopCart" :key="goods.id">
                        <div class="left">
                            <a href="javascript:;" class="cartCheckBox" :checked="goods.checked"
                             @click.stop="isSelectGoods(goods.id)"
                            ></a>
                        </div>
                        <div class="center">
                            <img :src="goods.smallImage" alt="">
                        </div>
                        <div class="right">
                            <a href="#">{{goods.name}}</a>
                            <div class="bottomContent">
                                <p class="shopPrice">{{goods.price|moneyFormat}}</p>
                                <div class="shopDeal">
                                    <span @click="reduceGoods(goods.id,goods.num)">-</span>
                                    <input disabled type="number" :value="goods.num">
                                    <span @click="addGoods(goods.id,goods.name,goods.price,goods.small_image)">+</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>

            </main>
            <!--底部通栏-->
            <div class="tabBar">
                <div class="tabBarLeft">
                    <a href="javascript:;" class="cartCheckBox"
                       @click.stop="selectAll(isAllSelected)"
                     :checked="isAllSelected"
                    ></a>
                    <span style="font-size: 16px;">全选</span>
                    <div class="selectAll">
                        合计：<span class="totalPrice">{{totalPrice|moneyFormat  }}</span>
                    </div>
                </div>
                <div class="tabBarRight">
                    <a href="#" class="pay" @click="toPay()">去结算({{goodsCount}})</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    //得到和是否删去商品,/引入轻提示
    import { Dialog ,Toast} from 'vant';

  import SelectLogin from "../login/SelectLogin";
    import {mapState,mapMutations} from 'vuex'
    export default {
        name: "Cart",
        computed:{

            ...mapState(['shopCart','userInfo']),
            //是否全选
            isAllSelected()
            {
                let goodCount= Object.values(this.shopCart).length;
                let tag=goodCount>0;

                //遍历是否全部选中
                Object.values(this.shopCart).forEach(
                    (value, index)=>{
                        if(!value.checked)
                        {

                           tag=false;
                        }

                    }


                );
                return tag;
            },
            //结算
            goodsCount()
            {
                let count=0;

                Object.values(this.shopCart).forEach(
                    (value)=>{
                        if(value.checked)
                        {
                            count+=value.num;
                             
                            }

                    }


                );



                return count;
            },
   //总价
            totalPrice()
            {
                let totalPrice=0;
                Object.values(this.shopCart).forEach(
                    (value)=>{
                       if(value.checked)
                     totalPrice+=value.num*value.price;
                    }
                );



                return totalPrice;
            }

        },
     data(){

            return{


            }
     }
    ,
        components:{
            SelectLogin
        }
        ,
        methods:
            {
            ...mapMutations(['REDUCE_CART','ADD_GOODS','IS_SELECT_GOODS','SELECTED_All_GOODS','CLEAR_CART']),

            reduceGoods(goodsId,goodsNum){
                //如果等于1的就判断
                // console.log(goodsId);
                if(goodsNum>1)
               {
                   this.REDUCE_CART({goodsId}) ;
               }
             else if(goodsNum==1)
                  Dialog.confirm({
                      title: 'zxp提示',
                      message: '你真的要删除商品吗'
                  }).then(() => {
                      this.REDUCE_CART({goodsId});
                      // on confirm
                  }).catch(() => {
                      // on cancel
                  });


            },
            addGoods(goodsId,goodsName,goodsPrice,smallImage)
            {   //
                this.ADD_GOODS({goodsId,goodsName,goodsPrice,smallImage});

            }
            ,
            isSelectGoods(goodsId)
            {
                   //更改选中
                // alert(122);
              this.IS_SELECT_GOODS({goodsId});


            },
                selectAll(isSelected){
                    // console.log(isSelected);
                    this.SELECTED_All_GOODS({isSelected});
                    // this.isAllSelected=!isSelected;


        },
                toPay()
                {
                  if(this.totalPrice>0)
                  {
                          //跳转路由界面
                           this.$router.push({path:'/order'})
                  }
                  else {
                      Toast(
                          {
                              message:'请先选择商品然后结算',
                              duration:1000
                          }

                      );
                  }
                },
                clearCart()
                {
                    Dialog.confirm({
                        title: 'zxp提示',
                        message: '你真的要清空购物车吗'
                    }).then(() => {
                        // console.log(11);
                        this.CLEAR_CART();
                        // on confirm
                    }).catch(() => {
                        // on cancel
                    });


                }
        }

    }

</script>

<style lang="less" scoped>

  #cart{
      width: 100%;
      height: 100%;
      background-color: #f5f5f5;
  }

  .titleWrapper{
      width: 100%;
      height: 2.6rem;
      background: #fff;
      -webkit-background-size: 0.1rem 4.4rem;
      background-size: 0.1rem 4.4rem;
      position: fixed;
      left: 0;
      top: 0;
      z-index: 999;

      display: flex;
      justify-content: center;
      align-items: center;
  }

  .contentWrapper{
      padding-top: 3.5rem;
  }

  /*列表内容*/
  .contentWrapperList{
      padding-bottom: 6rem;
  }

  .contentWrapperList section{
      background-color: #fff;
  }

  .cartCheckBox{
      background: url("./images/shop-icon.png ") no-repeat;
      -webkit-background-size: 2.5rem 5rem;
      background-size: 2.5rem 5rem;
      width: 1rem;
      height: 1rem;
  }

  .cartCheckBox[checked]{
      background-position: -1.2rem 0;
  }

  .shopCartListCon{
      display: flex;
      height: 6rem;
      border-bottom:  0.01rem solid #e0e0e0;
      margin-bottom: 0.7rem;
      padding: 0.5rem 0;
  }

  .shopCartListCon .left{
      /*background: purple;*/
      flex: 1;
      display: flex;
      /*justify-content: center;*/
  }

  .shopCartListCon .left a{
      display: inline-block;
      margin-top: 0.8rem;
      margin-left: 0.5rem;
  }


  .shopCartListCon .center{
      /*background: blue;*/
      flex: 3;
  }

  .shopCartListCon .center img{
      width: 100%;
      height: 100%;
  }

  .shopCartListCon .right{
      /*background: orangered;*/
      flex: 6;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 0.5rem;
      margin-right: 0.5rem;

      position: relative;
  }

  .shopCartListCon .right a{
      height: 2.2rem;
      line-height: 1.2rem;
      overflow: hidden;
      margin-bottom: 0.3rem;
      font-size: 0.8rem;
      color: #000;
  }

  .shopCartListCon .bottomContent{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
  }

  .shopCartListCon .bottomContent .shopPrice{
      font-size: 0.8rem;
  }

  .shopCartListCon .right .shopDeal span{
      display: inline-block;
      width: 1rem;
      height: 1.2rem;
      line-height: 1.2rem;
      text-align: center;
      float: left;
  }

  .shopCartListCon .right .shopDeal input{
      float: left;
      width: 2rem;
      height: 1.2rem;
      text-align: center;
      margin: 0 0.2rem;
      font-size: 0.8rem;
  }

  /*底部通栏*/
  .tabBar{
      position: fixed;
      left:0;
      bottom:2.7rem;
      width:100%;
      height: 2.5rem;
      background-color: #fff;

      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 0.01rem solid #e0e0e0;
  }

  .tabBarLeft{
      display: flex;
      align-items: center;
      margin-left: 0.5rem;
  }

  .tabBarLeft .selectAll{
      margin-left: 1rem;
      font-size: 1rem;
  }

  .totalPrice{
      color: #E9232C;
  }


  .tabBarRight .pay{
      width:5rem;
      height: 2rem;
      background-color: #E9232C;
      border-radius: 1rem;
      margin-right: 0.5rem;

      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1rem;
      color: #fff;
  }
  .clearCart{
      position: absolute;
      right: 0;

  }


</style>