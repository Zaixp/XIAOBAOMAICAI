<template>
    <div class="myAddress">
        <van-nav-bar
                title="填写地址"
                left-arrow
                @click-left="onClickLeft"
                class="nav-bar"
                :fixed=true
                :border=true
        ></van-nav-bar>
    <van-address-list
            v-model="chosenAddressId"
            :list="list"
            @add="onAdd"
            @edit="onEdit"
            @select="onSelect"
              style="margin-top: 3rem"
    ></van-address-list>
        <transition name="router-slider" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import {Toast} from 'vant'

    export default {
        name: "MyAddress",
        data() {
            return {
                chosenAddressId: '1',
                list: [
                    {
                        id: '1',
                        name: '钟信泼',
                        tel: '13645094121',
                        address:'闽江学院2区1A207'
                    },
                    {
                        id: '2',
                        name: '李四',
                        tel: '1310000000',
                        address: '浙江省杭州市拱墅区莫干山路 50 号'
                    }
                ],

            }
        },
  
        methods: {
            onAdd() {
                this.$router.push({path:'myAddress/addAddress'});
            },
            onEdit(item, index) {
                this.$router.push({name:'editAddress'});
            },
            onClickLeft()
            {

                this.$router.push({path:'/order'})

            },
            onSelect()
            {
                   this.$router.push({path:'/order'})
            }


        }
    }
</script>

<style scoped>
.myAddress{

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f5f5f5;
    z-index: 200;


}
.router-slider-enter-active,.router-slider-leave-active{
    transition: all .3s ease;

}
.router-slider-enter, .router-slider-leave-to{

    transform: translate3d(2rem,0,0);
    opacity: 0;
}
</style>