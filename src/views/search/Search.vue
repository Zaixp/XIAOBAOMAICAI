<template>
<transition
   enter-active-class="animated tada"
    leave-active-class="animated bounceOutRight"
>
  <div>
      <van-nav-bar
  @click-left="onClickLeft"
  left-arrow

/>
  <van-search
  v-model="value"
  placeholder="请输入商品名称"
  show-action
  shape="round"
  @search="onSearch"
>
  <div slot="action" @click="onSearch">搜索</div>
</van-search>
  </div>
  </transition>
</template>
<script>
import {Toast} from 'vant'
export default {
    
    data()
    {
        return{
     value:''
        }
    },
    methods:{
        onSearch()
        {
Toast('正在搜索')
        },
        onClickLeft()
        {
            this.$router.go(-1);
        }
    }
}
</script>