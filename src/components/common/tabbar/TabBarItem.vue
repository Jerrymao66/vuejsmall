<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <!-- 因为slot会被传入元素整个替换，所以在外面的div上绑定class属性而不是在里面的slot上面绑定 -->
    <div :style="activeStyle">
        <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            
        }
    },
    props: {
      path:String,
      activeColor:{
        type:String,
        default:"red"
      }
    },
    computed: {
      isActive(){
        return this.$route.path.indexOf(this.path)!==-1
      },
      activeStyle(){
        return this.isActive?{color:this.activeColor}:{}
      }
    },
    methods: {
    itemClick(){
      this.$router.replace(this.path)
    }  
    }
}
</script>

<style>
.tab-bar-item{
  flex: 1;
  text-align: center;
  font-size: 14px;
}
.tab-bar-item img{
    width: 24px;
    height: 24px;
    vertical-align: middle;
    margin-bottom: 2px;
}
</style>