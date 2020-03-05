<template>
    <div id="order">
<!--        头部-->
        <van-nav-bar
                title="填写订单"
                left-arrow
                @click-left="onClickLeft"
                class="nav-bar"
                :fixed=true
                :border=true
        ></van-nav-bar>
<!--        地址卡片-->
        <van-contact-card v-if="addText"
                :type="cardType"
                :add-text="addText?'请选择地址':''"
                :name="currentContact.name"
                :tel="currentContact.tel"
                @click="chooseAddress"
                style="margin-top: 3rem"
                
        ></van-contact-card>
         <van-cell-group v-else style="margin-top: 3rem">
               <van-cell icon='checked' title="钟信泼"  value="13645094121"  style="font-size:0.8rem" />
            <van-cell title="闽江学院2区1A207" icon="location" style="font-size:0.7rem" is-link to="order/myAddress"/>
         </van-cell-group >
<!--        单元格-->
        <van-cell-group style="margin-top: 0.6rem">
            <van-cell title="送达时间" :value="preTime" ></van-cell>
            <van-cell  :is-link=true :center=true :value="goodsCount" label="描述信息" >
                <template slot="title">
                    <span v-for="p in pList" :key="p.id">
                       
                   <img :src="p.smallImage" style="width: 3rem;" >
                   </span>
                </template>
            </van-cell>
        </van-cell-group>

        <van-cell-group style="margin-top: 0.6rem">
            <van-cell title="支付方式" value="微信"></van-cell>
        </van-cell-group>
        <van-cell-group style="margin-top: 0.6rem">
            <van-cell title="备注">
                <input type="text" style="text-align: right" placeholder="选填，备注您的特殊需求！" v-model="notice">
            </van-cell>
        </van-cell-group>
        <van-cell-group style="margin-top: 0.6rem">
            <van-cell title="商品金额" :value="totalPrice|moneyFormat"></van-cell>
            <van-cell title="配送费" :value="expressCost|moneyFormat"></van-cell>
        </van-cell-group>
        <van-submit-bar
                :price="totalPrice*100"
                button-text="提交订单"
                @submit="onSubmit"
        ></van-submit-bar>
           <transition name="router-slider" mode="out-in">
        <router-view></router-view>
           </transition>
    </div>
</template>

<script>
    import {Toast} from 'vant'
    import {mapState} from "vuex"
    import moment from 'moment'
    export default {
        name: "Order",
        data() {
            return {
                chosenContactId: null,
                editingContact: {},
                showList: false,
                showEdit: false,
                isEdit: false,
                notice:'',
                expressCost:0,
                addText:false
            };
        },

        computed: {
            cardType() {
                return this.chosenContactId !== null ? 'edit' : 'add';
            },

            currentContact() {
                const id = this.chosenContactId;
                return id !== null ? this.list.filter(item => item.id === id)[0] : {};
            },
               ...mapState(['userInfo','shopCart']),
pList()
{
    
    return Object.values(this.shopCart);
}
               ,
          //结算
        goodsCount()
            {
                let count=0;

                Object.values(this.shopCart).forEach(
                    (value)=>{
                        if(value.checked)
                       {count+=value.num;}
                             
                    }


                );



                return '一共'+count+'件商品';
            },
             //预计送达时间
               preTime(){
       
       let   m= moment(new Date());
       //添加送达时间
            m=m.add(24, 'hours');
             return  m.format('YYYY-MM-DD');
         }
         ,
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
        
      

        methods: {
            onClickLeft() {
               this.$router.push({path:'/dashboard/cart'});
            },

            chooseAddress()
            {
                this.$router.push({path:'order/myAddress'})
            },
            onSubmit()
            {
                if(this.addText==true)
                {Toast('请选择地址');
                }
                else{
                    Toast('正在提交');
                }
            }

        }
    }
</script>

<style scoped>
  #order{
      width: 100%;
      height: 100%;
      background-color: #f5f5f5;
  }
  .van-cell__left-icon{
      color: rgb(151, 8, 8);
  }
 .router-slider-enter-active,.router-slider-leave-active{
     transition: all .3s ease;

 }
  .router-slider-enter, .router-slider-leave-to{

      transform: translate3d(4rem,0,0);
      opacity: 0;
  }

</style>