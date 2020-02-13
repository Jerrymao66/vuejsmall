<template>
  <swiper v-if="topImages.length" class="sw">
      <swiper-item v-for="(item,index) in topImages" :key="index">
          <img :src="item">
      </swiper-item>
  </swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'
export default {
    name:"DetailSwiper",
    components: {
        Swiper,
        SwiperItem
    },
    props: {
        topImages:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style>
.sw{
    height: 300px;
    overflow: hidden;
}
</style>