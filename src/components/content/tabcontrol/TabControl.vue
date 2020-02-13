<template>
  <div class="tab-control">
    <div class="tab-control-item" v-for="(item,index) in titles" :key="index" @click="itemClick(index)">
        <span :class="{active:currIndex===index }">{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        titles:{
            type:Array,
            defaut(){
                return []
            }
        }
    },
    data () {
        return {
            currIndex:0
        }
    },
    methods: {
        itemClick(index){
            this.currIndex=index
            this.$emit("tabClick",index)
        }
    }
}
</script>

<style scoped>
.tab-control{
    display: flex;
    text-align: center;
    line-height: 40px;
    height: 40px;
    font-size: 15px;
    background-color: #fff;
}
.tab-control-item{
    flex: 1
}
.tab-control-item span{
    padding: 5px
}
.active{
    color:var(--color-high-text);
     border-bottom: 2px solid var(--color-high-text);
}
</style>