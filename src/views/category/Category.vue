<template>
    <div  id="category">
        <Header></Header>
        <div v-if="!showLoading" class="listWrapper">


                <div class="leftWrapper">
                    <ul class="wrapper">
                        <li
                                class="categoryItem"
                                v-for="(cate, index) in categoriesData"
                                :class="{selected: currentIndex === index}"
                                @click="clickLeftLi(index)"
                                :key="cate.id"
                                ref="menuList"
                        >
                            <span class="textWrapper">{{cate.name}}</span>
                        </li>
                    </ul>
                </div>
            <ContentView :categoriesDetailData="categoriesDetailData" />
    </div>
        <van-loading type="spinner" color="#1989fa" v-else class="loading">
            xp正在拼命加载
        </van-loading>
    </div>

</template>

<script>
    //引入betterScroll
    import BScroll from 'better-scroll'
    //引入
    import Nav from './components/Nav.vue'
    import Header from './components/Header.vue'
    import ContentView from './components/ContentView.vue'
    import {mapMutations,mapState} from 'vuex'
    import {Toast} from 'vant'
    //引入请求接口
    import {getCategories,getCategoriesDetail} from '@/service/api/index.js'
    export default {
        name: "Category"
        ,
        data(){

            return{
                showLoading:true,
                categoriesData:[],
                categoriesDetailData:[],
                currentIndex: this.$route.query.index+1||0,
            }
        },
    created() {
       this.getData();

    }
        ,
        computed:{
            ...mapState(['shopCart','userInfo'])
        },
        components:{
            Header,
            ContentView,
            Nav
        },
        mounted(){
        },
        methods:{
            ...mapMutations['ADD_GOODS'],

            async getData()
            {  //同步转异步
            let response= getCategories();
                // console.log(response);
                response.then((response)=>{

                   if(response.success)
                   {
                 this.categoriesData=response.data.cate;
                       // console.log(this.categoriesData);
                       //隐藏loading
                       this.showLoading=false;
                       //作用betterScroll
                       this.$nextTick(()=>{
                           this.leftScroll = new BScroll('.leftWrapper', {
                               probeType: 3,
                               click: true,
                               scrollY: true,
                               tap: true,
                               mouseWheel: true
                           })
                       })
                   }


                }).catch((error)=>{
                    console.log(error);
                });

                let rightRes = await getCategoriesDetail('/lk001');
                if (rightRes.success) {
                    this.categoriesDetailData = rightRes.data.cate;
                    // console.log(this.categoriesDetailData);
                }
            },
           async  clickLeftLi(index){
                let menuLists=this.$refs.menuList;
                // console.log(menuLists);

               this.currentIndex=index;
                 //滚动到对应的li标签
                this.leftScroll.scrollToElement(menuLists[index],500);
                //请求数据
                let rightRes = await getCategoriesDetail(`/lk00${index+1}`);
                if (rightRes.success) {
                    this.categoriesDetailData = rightRes.data.cate;
                    // console.log(this.categoriesDetailData);
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    #category{
	   width: 100%;
	   height: 100%;
	   /*background-color: green;*/
        background-color: #F5F5F5;
        overflow: hidden;
    }
    .loading{
        position: absolute;
        left: 50%;
        top: 40%;
        transform: translate(-50%);

    }
    .listWrapper{
        width: 100%;
        display: flex;
        position: absolute;
        top: 2.75rem;
        bottom: 3rem;
        overflow: hidden;

    }
    .leftWrapper{
        background-color: #F4F4F4;
        width: 5.3125rem;
        flex: 0 0 5.3125rem;
    }
    .categoryItem {
        padding: 0.75rem 0;
        border-bottom: solid 1px #E8E9E8;
        position: relative;
    }

    .categoryItem .textWrapper {
        line-height: 1.25rem;
        border-left: solid 0.1875rem transparent;
        padding: 0.3125rem 0.6875rem;
        font-size: 0.8125rem;
        color: #666666;
    }

    .categoryItem.selected {
        background: #FFF;
    }

    .categoryItem.selected .textWrapper {
        border-left-color: #c62f2f;
        font-weight: bold;
        font-size: 0.875rem;
        color: #333333;
    }

    @media (min-width: 960px) {
        .wrapper {
            border-right: 1px solid #E8E9E8;
        }

        .wrapper .categoryItem {
            background: #fff;
        }}
</style>