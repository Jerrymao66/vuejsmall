<template>
 <div  ref="wrapper"> 
     <div>
         <slot></slot>
     </div>
 </div> 
</template>

<script>
import Scroll from 'better-scroll'
export default {
    data () {
        return {
            scroll:null      
        }
    },
    props: {
        probeType:{
            type:Number,
            default:0
        },
        pullUpLoad:{
            type:Boolean,
            default:false
        }
    },
    mounted () {
        this.scroll=new Scroll(this.$refs.wrapper,{
            click:true,
            probeType:this.probeType,
            pullUpLoad:this.pullUpLoad
        });
        this.scroll.on("scroll",position=>{
            this.$emit("srcoll",position)
        }),
        this.scroll.on("pullingUp",()=>{
            this.$emit("pullingUp")
        })
    },
    methods: {
        toPositon(x,y,time=300){
            this.scroll&&this.scroll.scrollTo(x,y,time);
        },
        finishPullUp(){
            this.scroll&&this.scroll.finishPullUp() //完成上拉加载后调用，不然只加载一次
        },
        refresh(){
            this.scroll&&this.scroll.refresh() //刷新conten高度，防止图片没加载完成，就计算scroll下拉长度
        },
        scrollToElement(el,time){
            this.scroll&&this.scroll.scrollToElement(el,time)
        }

    }
}
</script>

<style>

</style>