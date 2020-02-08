<template>
 <div class="wrapper" ref="wrapper"> 
     <div class="content">
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
    mounted () {
        this.scroll=new Scroll(this.$refs.wrapper);
    },
    methods: {
        toPositon(x,y,time=300){
            this.scroll.scrollTo(x,y,time);
        }

    }
}
</script>

<style>

</style>