<template>
   
    <swiper id="swing" :options="swiperOption" ref="mySwiper" >
	   <!-- slides -->
	   <swiper-slide v-for="slide in swing_list">
		  <img :src="slide.icon_url" :alt="slide.public_name">
	   </swiper-slide>
	  
	   <!-- Optional controls -->
	   <div class="swiper-pagination"  slot="pagination"></div>
	  
    </swiper>
  
</template>

<script>
    //引入swiper
    import 'swiper/dist/css/swiper.css'

    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    export default {
        name: "Swing",
	   props:{
            swing_list:Array
	   },
        data() {
            return {
                swiperOption: {
                    // some swiper options/callbacks
                    // 所有的参数同 swiper 官方 api 参数
                    // ...
				notNextTick: true,
                    pagination: {
                        el: '.swiper-pagination',
				    clickable:true,
				   
				    },
                    loop:true,
                    speed:600,
                    autoplay:{
                        delay:1000
                },
				on:{
                        slideChangeTransitionEnd(){
                      

				    }
				}
				
            }
        }},
	   computed:{
            //监听swiper
          swiper()
		{
		    return this.$refs.mySwiper.swiper;
		}
    
	   },
	   components: {
            swiper,
            swiperSlide
        }
    }
</script>

<style scoped>
#swing{
   

    width: 100%;
    height: 10rem;
    /*background-color: blue;*/
}
#swing img{
    
    width: 100%;
    height: 100%;
}
/*强制更改*/
#swing >>> .swiper-pagination-bullet-active{
	background-color: #2eb257;
}
</style>