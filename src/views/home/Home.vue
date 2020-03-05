<template>
    <div id="home">

        <van-loading type="spinner" color="#1989fa" v-if="showLoading" class="loading">
            xp正在拼命加载
        </van-loading>
        <div v-else>
           <!-- /*头部*/-->
            <Header></Header>
            <!-- /*轮播图*/-->
            <Swing :swing_list="swing_list"></Swing>
           <!-- 导航栏 -->
            <Nav :nav_list="nav_list"></Nav>
           <!-- /*限时秒杀*/-->

            <FlashSale :flashSale_list="flashSale_list"></FlashSale>
           <!--猜你喜欢-->
           <YouLike :youLike_list="youLike_list"></YouLike>
            <!--返回顶部-->
            <MarkPage v-if="markShow" ></MarkPage>
            <!-- footer -->
            <div class="footer">部分数据来自小撩买菜</div>
        </div>

    </div>

</template>

<script>
    import Swing from './components/swing/Swing.vue'
    import Header from './components/header/Header.vue'
    import Nav from './components/nav/Nav.vue'
    import FlashSale from './components/flashSale/FlashSale.vue'
    import YouLike from './components/youLike/YouLike.vue'
    import MarkPage from './components/markPage/MarkPage.vue'
    //请求数据
    import {getHomeData} from '@/service/api/index.js'

    //引入监听是否显示返回按钮
    import {showBack, animate} from '@/config/global.js'
    //引入消息订阅
    import PubSub from 'pubsub-js'
    //引入购物车
    import {mapMutations,mapState} from 'vuex'
   // 引入vant提示框
    import {Toast} from 'vant'
    export default {
        name: "Home",

        data(){

            return{
                swing_list:[],
                showLoading:true,
                nav_list:[],
                flashSale_list:[],
                youLike_list:[],
                markShow:false,

            }
        },
        computed:{

            ...mapState(['shopCart','userInfo'])
        },
        created(){
            getHomeData().then(response=>{
                    // console.log(response);
                // console.log(response.data);
                if(response.success)
                {    //得到轮播图数据
                    this.swing_list=response.data.list[0].icon_list;
                    //得到Nav的数据
                    this.nav_list=response.data.list[2].icon_list;
                    //得到秒杀数据
                    this.flashSale_list=response.data.list[3].product_list;
                    // console.log(this.flashSale_list);
                    //得到猜你喜欢数据
                    this.youLike_list=response.data.list[12].product_list;

                    this.showLoading=false;

                    showBack((state)=>{
                        this.markShow=state;

                    });
                    // console.log(this.flashSale_list);
                }
            }).catch(error=>{
                console.log(error);
            });

        },
        mounted(){
            // //订阅加入购物车消息
            PubSub.subscribe('homeAddToCart',(msg,goods)=>{
              if(!this.userInfo.token)
              {
                  //让他去登陆
                  this.$router.push('/login');
                  return;
              }
              if (msg==='homeAddToCart')
              {
                  this.ADD_GOODS(
                      {
                          goodsId:goods.id,
                          goodsName:goods.name,
                          smallImage:goods.small_image,
                          goodsPrice:goods.price

                      }
                  )


              };
                Toast({
                    message:'添加购物车成功',
                    duration:800


                });


            });

        },
        components:{
            Header,
            Swing,
            Nav,
            FlashSale,
            YouLike,
            MarkPage
      },
        methods:{
           ...mapMutations(['ADD_GOODS']),

        },
        beforeDestroy() {
          PubSub.clearAllSubscriptions();
        },
    }
</script>

<style lang="less" scoped>
    #home{
	   width: 100%;
        /*height:8854px;*/
        height: 100%;
	   background-color: #f2f3f5;
    }
    #home .loading{
        position: absolute;
        left: 50%;
        top: 40%;
        transform: translate(-50%);

    }
    .footer{
        font-size: 0.6rem;
        text-align: center;
        margin-bottom: 3rem;
        color: #cccccc;
    }
</style>