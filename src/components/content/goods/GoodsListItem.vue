<template>
  <div class="goods-item" @click="itemClick">
      <div>
          <img :src="getImg" @load="imageLoad">
      </div>
      <div class="goods-info">
          <p>{{goodsItem.title}}</p>
          <span class="price">¥{{goodsItem.price}}</span>
          <span class="collect">{{goodsItem.cfav}}</span>
      </div>
  </div>
</template>

<script>
export default {
    props: {
        goodsItem:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    methods: {
        //每张图片加载完成后拿到Scroll组件中的srcoll 调用其中的refresh方法刷新高度
        imageLoad(){
            //通过注册好的事件总线,跨组件发射到home 拿到scroll对象 
            let currPath = this.$route.path
            if(currPath.indexOf("/home")!==-1)
                this.$bus.$emit("imgload")    
            else this.$bus.$emit("detailImgload")
        },
        itemClick(){
            this.$router.push('/detail/'+this.goodsItem.iid||this.goodsItem.item_id)
        }
    },
    computed: {
        getImg() {
        return this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img
      }
    }
}
</script>

<style scoped>
.goods-item {
    padding-bottom: 40px;
    position: relative;
    width: 45%;
  }
.goods-item img {
    width: 100%;
}
.goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
}
.goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

.goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
}

.goods-info .collect {
    position: relative;
}

.goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: 0;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>