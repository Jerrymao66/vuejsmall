<template>
  <div id="home">
      <nav-bar class="home-nav">
        <template v-slot:center>
          购物街
        </template>
      </nav-bar>
      <tab-control :titles="['流行','新款','精选']"  @tabClick="tabClick" 
          ref="tabControl1" v-show="isShowTabControl" class="fixed"></tab-control>
      <scroll class="content" ref="scroll" :probe-type="3" @srcoll="contentScroll" 
      :pullUpLoad="true" @pullingUp="loadMore">
         <home-swiper :banners="banners" @lunBoLoad="lunBoLoad"></home-swiper>
          <recommend-view :recommends="recommends"></recommend-view>
          <feature-view></feature-view>
          <tab-control :titles="['流行','新款','精选']"  @tabClick="tabClick" 
          ref="tabControl2"></tab-control>
          <goods-list :goods="currGoods"></goods-list>
      </scroll>
      <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
      
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
import {deBounce} from 'common/utils.js'

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
      currGoodsType:"pop",
      isShowBackTop:false,
      tabControlTopOffset:0,
      isShowTabControl:false,
      saveY:0
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
    //组件开始就创建监听事件，监听图片发射的事件,不要在这监听，
    //document.querySelector this.$refs  在created里拿都还没挂载 应该放到mouted
    //   this.$bus.$on("imgload",()=>{
    //     console.log(this.$refs.scroll.scroll) 回调函数有可能能拿到this.$refs
    // })  
  },
  mounted () {
    const refresh = deBounce(this.$refs.scroll.refresh,300)
     this.$bus.$on("imgload",()=>{
      refresh() //mounted里该函数只被执行一次，与detail里的methods里的imgload不一样，每次触发这个函数，生成新的函数，导致每次调用的refresh不是同一个
  })  
    //console.log(this.$refs.tabControl2.$el.offsetTop) 直接拿tabcontrol的高度不行，轮播图还没加载完成，高度不准
 
 },
  activated () {
    this.$refs.scroll.refresh() //先调用refresh刷新不然容易回到顶部
    this.$refs.scroll.toPositon(0,this.saveY,0)
  },
  deactivated () {
    this.saveY=this.$refs.scroll.scroll.y;
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
      this.$refs.tabControl1.currIndex=index;
      this.$refs.tabControl2.currIndex=index;
    },
    backTop(){
      this.$refs.scroll.toPositon(0,0);
    },
    contentScroll(position){
      this.isShowBackTop=-position.y>1000
      this.isShowTabControl=-position.y>this.tabControlTopOffset
    },
    loadMore(){
      this.getHomeGoods(this.currGoodsType)
      this.$refs.scroll.finishPullUp()
    },
    lunBoLoad(){
      this.tabControlTopOffset=this.$refs.tabControl2.$el.offsetTop;//拿到组件元素的offsettop属性
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

.home-nav{
  background-color: var(--color-tint);
  color: white;

  /* position: fixed; 利用系统滚动时才用的绝对定位
  top: 0;
  left: 0;
  right: 0;
  z-index: 9; */
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
.fixed{
  position: fixed;
  top: 44px;
  right: 0;
  left: 0;
}
</style>