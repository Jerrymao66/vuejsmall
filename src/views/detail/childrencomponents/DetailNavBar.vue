<template>
  <nav-bar>
    <template v-slot:left>
        <div @click="back">
            <img src="~assets/img/common/back.svg">
        </div>
    </template>
    <template v-slot:center >
        <div class="nav-center">
            <div class="title" v-for="(item,index) in titles" :key="index" 
            :class="{active:currIndex==index}" @click="itemClick(index)">
                     {{item}}
            </div>
        </div>
    </template>
  </nav-bar>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
    components: {
        NavBar
    },
    data () {
        return {
            titles:['商品','参数','评论','推荐'],
        }
    },
    props: {
            currIndex:{
                type:Number,
                default:0
            }
    },
    methods: {
        itemClick(index){
            this.currIndex=index
            this.$emit("titleClick",index)
        },
        back(){
            this.$router.back()
        }
    }
}
</script>

<style scoped>
.nav-center{
    display: flex;
    font-size: 13px;
}
.title{
    flex:1;
}
img{
    margin-top: 12px
}
.active{
    color:var(--color-high-text)
}
</style>