<template>
 <swiper v-if="banners.length">
    <swiper-item v-for="(item, index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'
export default {
    components: {
        Swiper,
        SwiperItem
    },
    props: {
        banners: {
            type: Array,
            default(){
                return []
            }
      }
    },
    data () {
      return {
        isLoad:false  
      }
    },
    methods: {
      imageLoad(){
        if(!this.isLoad){
          this.$emit("lunBoLoad")
          this.isLoad=!this.isLoad
        }
      }
    }
}
</script>

<style>

</style>