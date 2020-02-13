<template>
  <div id="detail">
      <detail-nav-bar class="detail-nav" @titleClick="titleClick" :curr-index="currIndex"></detail-nav-bar>
        <scroll class="content" ref="scroll" :probeType="3" @srcoll="contentSrcoll">
            <detail-swiper :topImages="topImages" ref="dswiper"></detail-swiper>
            <detail-base-info  :goods="goods" ></detail-base-info>
            <detail-shop-info :shop="shop"></detail-shop-info>
            <detail-goods-info :detailInfo="detailInfo" @imgLoad="imgLoad"></detail-goods-info>
            <detail-param-info :paramInfo="paramInfo" ref="dparam"></detail-param-info>
            <detail-comment-info :commentInfo="commentInfo" ref="dcomment"></detail-comment-info>
            <detail-recommend-list :recommendList="recommendList" ref="drecommend"></detail-recommend-list>
        </scroll>
        <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
        <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import DetailNavBar from './childrencomponents/DetailNavBar'
import DetailSwiper from './childrencomponents/DetailSwiper'
import DetailBaseInfo from './childrencomponents/DetailBaseInfo'
import DetailShopInfo from './childrencomponents/DetailShopInfo'
import DetailGoodsInfo from './childrencomponents/DetailGoodsInfo'
import DetailParamInfo from './childrencomponents/DetailParamInfo'
import DetailCommentInfo from './childrencomponents/DetailCommentInfo'
import DetailRecommendList from './childrencomponents/DetailRecommendList'
import DetailBottomBar from './childrencomponents/DetailBottomBar'

import {getData,Goods,Shop,GoodsParam,getRecommendData} from 'network/detail'
import {deBounce} from 'common/utils.js'
import {BACKTOP_DISTANCE} from 'common/const'
import {backTopMixin} from 'common/mixin'
import {Toast} from 'vant'
export default {
    name:'Detail',
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailRecommendList,
      DetailBottomBar,
      Scroll 
    },
    mixins: [backTopMixin],
    data () {
        return {
            iid:null,
            topImages:[],
            goods:{},
            shop:{},
            detailInfo:{},
            paramInfo:{},
            commentInfo:{},
            recommendList:[],
            refresh:null,
            themeTopYs:[],
            getTopOffsets:null,
            getTabIndex:null,
            currIndex:0
        }
    },
    created () {
        //在created函数中不能获取对应的组件或元素，因为还没挂载
        this.iid=this.$route.params.iid;
        getData(this.iid).then(res=>{
            const data=res.result
            //顶部轮播
            this.topImages=data.itemInfo.topImages
            //基本信息
            this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
            //店铺信息
            this.shop = new Shop(data.shopInfo);
            //商品详情
            this.detailInfo = data.detailInfo;
            //商品参数
            this.paramInfo=new GoodsParam(data.itemParams.info, data.itemParams.rule);
            //商品评论
             if (data.rate.list) {
            this.commentInfo = data.rate.list[0];
          }
        })
        //获取推荐数据
        getRecommendData().then(res=>{
             this.recommendList = res.data.list
        }).catch(err=>{
            console.log("获取推荐数据失败")
        })

       
        
    },
    mounted () {
        let newRefresh=deBounce(this.$refs.scroll.refresh,300); 
        this.refresh =()=>{
            newRefresh()
        }
        this.getTopOffsets = deBounce(()=>{
            this.themeTopYs=[]
            this.themeTopYs.push(0)
            this.themeTopYs.push(this.$refs.dparam.$el.offsetTop)
            this.themeTopYs.push(this.$refs.dcomment.$el.offsetTop)
            this.themeTopYs.push(this.$refs.drecommend.$el.offsetTop)
            this.themeTopYs.push(Number.MAX_VALUE)
        },300)
         
    },
    methods: {
        imgLoad(){
            //方法一漏洞 如果在detailgoodsinfo里加++this.counter===this.imgLength可能还有卡顿因为不是每次刷新
            //this.$refs.scroll.refresh()
            //方法二漏洞 每次生成新的refresh函数，调用的不是同一个
            //const refresh = deBounce(this.$refs.scroll.refresh,300)
            //      refresh()
            //方法三，定义变量储存 在mouted函数中调用防抖函数
            this.refresh() 

            //监听图片加载完成，获取topOffset
            this.getTopOffsets()
        },
        titleClick(index){
            /** 方法1，scrollToElement
            const dscroll= this.$refs.scroll;
            switch (index) {
                case 0:
                    dscroll.scrollToElement(this.$refs.dswiper.$el,300)
                    break;
                case 1:
                      dscroll.scrollToElement(this.$refs.dparam.$el,300)
                    break;
                case 2:
                      dscroll.scrollToElement(this.$refs.dcomment.$el,300)
                    break;
                case 3:
                      dscroll.scrollToElement(this.$refs.drecommend.$el,300)
                    break;
            }
            */
           /**先获取每个元素对应的offsetTop  通过index 进行跳转*/
           this.$refs.scroll.toPositon(0,-this.themeTopYs[index])
        },
        contentSrcoll(position){
            // 1.监听滚动到哪一个主题
            this._listenScrollTheme(-position.y)
            //2.backtopx显示，没抽取到mixin
            this.isShowBackTop=-position.y>BACKTOP_DISTANCE
         },
         _listenScrollTheme(position) {
        let length = this.themeTopYs.length;

        for (let i = 0; i < length; i++) {
          let iPos = this.themeTopYs[i];
          /**
           * 判断的方案:
           *  方案一:
           *    条件: (i < (length-1) && currentPos >= iPos && currentPos < this.themeTopYs[i+1]) || (i === (length-1) && currentPos >= iPos),
           *    优点: 不需要引入其他的内容, 通过逻辑解决
           *    缺点: 判断条件过长, 并且不容易理解
           *  方案二:
           *    条件: 给themeTopYs最后添加一个很大的值, 用于和最后一个主题的top进行比较.
           *    优点: 简洁明了, 便于理解
           *    缺点: 需要引入一个较大的int数字
           * 疑惑: 在第一个判断中, 为什么不能直接判断(currentPos >= iPos)即可?
           * 解答: 比如在某一个currentPos大于第0个时, 就会break, 不会判断后面的i了.
           */
          if (position >= iPos && position < this.themeTopYs[i+1]) {
            if (this.currIndex !== i) {
              this.currIndex = i;
            }
            break;
          }
        }
      },
      addToCart(){
        //创建商品
        const product = {}
        // 2.对象信息
        product.iid = this.iid;
        product.imgURL = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc;
        product.newPrice = this.goods.nowPrice;
        //发送到action
        this.$store.dispatch('addToCart', product).then(res=>{
            Toast.success(res)
        })
      }

    }

}
</script>

<style scoped>
#detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
}
.content{
    position: absolute;
    top: 44px;
    bottom: 60px;
}
.detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
}
</style>