<template>
<div class="recommend-info">
    <div class="info-header">热门推荐</div>
  <div class="goods" >
      <goods-list-item v-for="(item,index) in recommendList" 
      :key="index" :goodsItem="item"></goods-list-item>
  </div>
</div>
</template>

<script>
import GoodsListItem from 'components/content/goods/GoodsListItem'  
export default {
    props: {
        recommendList:{
            type:Array,
            default(){
                return []
            }
        }
    },
    components: {
        GoodsListItem
    }
}
</script>

<style scoped>
.goods{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
.info-header {
    line-height: 40px;
    padding-left: 8px;
    font-size: 15px;
    color: #333;
  }
</style>