<template>
   <div class="userCenter">
      <van-nav-bar
              title="个人中心"
              left-arrow
              @click-left="onClickLeft"
              class="nav-bar"
              :fixed=true
              :border=true
      ></van-nav-bar>
      <div style="margin-top: 5rem" class="loginOut">
         <van-button type="danger" class="btn" @click="loginOut()">退出</van-button>
      </div>
   </div>
</template>

<script>
   import {mapState,mapMutations} from 'vuex'
    export default {
        name: "LoginOut",
       methods:{
         ...mapMutations(['RESET_USER_INFO']),
          onClickLeft()
          {
             this.$router.go(-1);
          },
          loginOut(){
             // 1.清空用户信息
             this.RESET_USER_INFO();
             //2.返回主页
             this.$router.back();
          }
       }
    }
</script>

<style scoped>
 .userCenter{

    z-index: 200;
     position: fixed;
     background-color: #F5F5F5;
     right: 0;
     bottom: 0;
     left: 0;
     top: 0;
 }
   .loginOut{

     display: flex;
      justify-content: center;
      align-items: center;

   }
 .loginOut .btn{

    width: 8rem;

 }
</style>