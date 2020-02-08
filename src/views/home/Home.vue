<template>
  <div id="home">
      <nav-bar class="home-nav">
        <template v-slot:center>
          购物街
        </template>
      </nav-bar>
      <scroll class="content" ref="scroll">
         <home-swiper :banners="banners"></home-swiper>
          <recommend-view :recommends="recommends"></recommend-view>
          <feature-view></feature-view>
          <tab-control :titles="['流行','新款','精选']" class="tab-control" @tabClick="tabClick"></tab-control>
          <goods-list :goods="currGoods"></goods-list>
      </scroll>
      <back-top @click.native="backTop"></back-top>
      
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabcontrol/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll' //这个不能用鼠标滚轮
import BackTop from 'components/content/backtop/BackTop'

import HomeSwiper from './childrencomponents/HomeSwiper'
import RecommendView from './childrencomponents/RecommendView'
import FeatureView from './childrencomponents/FeatureView'

import {getHomeMultidata,getHomeGoods} from 'network/home'

export default {
  components: {
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,

    HomeSwiper,
    RecommendView,
    FeatureView
  },
  data () {
    return {
      banners:[],
      recommends:[],
      goods:{
        "pop":{page:0,list:[]},
        "new":{page:0,list:[]},
        "sell":{page:0,list:[]}
      },
      currGoodsType:"pop"
    }
  },
  computed: {
    currGoods(){
        return this.goods[this.currGoodsType].list
    }
  },
  created () {
    this.getHomeMultidata()  //写this调用的是method的方法 不写调用的导入的方法
    this.getHomeGoods("pop")
    this.getHomeGoods("new")
    this.getHomeGoods("sell")  
  },
  methods: {
    /**
     * 事件
     */
    tabClick(index){
      switch (index) {
        case 0:
            this.currGoodsType="pop"
          break;
       case 1:
            this.currGoodsType="new"
          break;
       case 2:
            this.currGoodsType="sell"
          break;
      }
    },
    backTop(){
      this.$refs.scroll.toPositon(0,0);
    },
    /**
     *网络请求
     */
    getHomeMultidata(){
      getHomeMultidata().then(res=>{
      this.banners=res.data.banner.list
      this.recommends=res.data.recommend.list
      })
    },
    getHomeGoods(type){
      const page=this.goods[type].page+1
      getHomeGoods(type,page).then(res=>{
          this.goods[type].page=page;
          this.goods[type].list.push(...res.data.list)
      })
    }
    
  }
}
</script>

<style scoped>
#home{
  padding-top: 44px
}
.home-nav{
  background-color: var(--color-tint);
  color: white;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
}
.tab-control{
  position: sticky;
  top: 44px;
  z-index: 9;
}
.content{
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>