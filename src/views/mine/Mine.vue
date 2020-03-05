<template>
    <div id="mine" v-if="userInfo.token">
       <div @click="ToUserCenter">
        <van-nav-bar
                title="我的"
                style="background-color:#c62f2f;"
                :fixed=true
                :boder=false
        ></van-nav-bar>
<!--        个人头像-->
        <van-cell-group>
            <van-cell
                    style="background-color:#c62f2f;margin-top: 2.6rem"
            >
                <!-- 使用 title 插槽来自定义标题 -->
                <template slot="title">
                    <div style="color: #F5F5F5" class="headImg-Wrapper">
                        <img src="./images/ycy.jpg">
                        <div class="personInfo">
                            <span>钟信泼</span>
                            <span>微信号:mc1831519928</span>
                        </div>
                    </div>
                </template>
            </van-cell>
        </van-cell-group>
       </div>
<!--        个人订单-->
        <van-cell-group >
            <van-cell
                    value="查看全部订单"
                    title="我的订单" icon="label" is-link
                    @click="goSearchOrder"
                    >
                <!-- 使用 right-icon 插槽来自定义右侧图标 -->

            </van-cell>
            <van-grid>
                <van-grid-item icon="pending-payment" text="待支付" ></van-grid-item>
                <van-grid-item icon="paid" text="待发货" ></van-grid-item>
                <van-grid-item icon="smile-comment-o" text="待收货" ></van-grid-item>
                <van-grid-item icon="cash-back-record" text="售后/退款" ></van-grid-item>
            </van-grid>
        </van-cell-group>
<!--           我的优惠劵-->
        <van-cell-group style="margin-top: 0.3rem" >
            <van-cell
                        value="1张"
                    title="我的优惠劵" icon="gold-coin" is-link>
                <!-- 使用 right-icon 插槽来自定义右侧图标 -->

            </van-cell>
            <van-cell

                    title="我的收货地址" icon="todo-list" is-link>
                <!-- 使用 right-icon 插槽来自定义右侧图标 -->

            </van-cell>
        </van-cell-group>
        <van-cell-group style="margin-top: 0.3rem" >
            <van-cell title="联系客服" icon="phone" value="客服时间 07:00-22:00" is-link></van-cell>
            <van-cell title="意见反馈" icon="smile-comment" is-link></van-cell>
        </van-cell-group>
        <van-cell-group style="margin-top: 0.3rem" >
            <van-cell title="小波买菜" icon="gift-card" value="下载APP体验更佳" is-link></van-cell>


        </van-cell-group>
        <!--路由的出口-->
        <transition name="router-slider" mode="out-in">
            <router-view></router-view>
        </transition>

    </div>
    <SelectLogin v-else></SelectLogin>
</template>

<script>
    import SelectLogin from "../login/SelectLogin";
    import {mapState,mapMutations} from 'vuex'
    import { Dialog } from 'vant';
    export default {
        name: "mine",
        computed:{
            ...mapState(['userInfo']),
        },
        components:{
            SelectLogin
        }
        ,
        methods:{
            ToUserCenter()
            {
                this.$router.push('/dashboard/mine/userCenter');
            },
            goSearchOrder()
            {
                Dialog.alert({
            message: '你还没有订单'
       }).then(() => {
     // on close
      });
            }

        }
    }
</script>

<style lang="less" scoped>
    #mine{
	   width: 100%;
	   height: 100%;
	   background-color:#F5F5F5;
    }
    .van-nav-bar__title{
        color: #F5F5F5;

    }
    .van-hairline--bottom::after{
        border-bottom-width: 0rem;
    }
    .headImg-Wrapper{
    position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .headImg-Wrapper img{
       width: 4rem;
        height: 4rem;
        border-radius: 2rem;
        border: #F5F5F5 0.15rem solid;
    }
    .headImg-Wrapper .personInfo{
       /*position: absolute;*/
       /*left: 5rem;*/
       /*top: 1.8rem;*/

        margin-left: 0.4rem;
  font-size: 0.8rem;
    }
    .headImg-Wrapper .personInfo span{
        display: block;
        margin-top: 0.1rem;
    }
    .van-cell__left-icon{

        color:#c62f2f ;
        font-size: 1.2rem;
    }
    /*转场动画*/
    .router-slider-enter-active, .router-slider-leave-active{
        transition: all 0.3s;
    }

    .router-slider-enter, .router-slider-leave-active{
        transform: translate3d(2rem, 0, 0);
        opacity: 0;
    }
</style>