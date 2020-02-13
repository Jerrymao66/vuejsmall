<template>
  <div id="app">
    <keep-alive exclude="Detail"><router-view></router-view></keep-alive>
   <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import router from './router'
import store from './store'
import MainTabBar from 'components/content/mainTabbar/MainTabBar'
export default {
  name: 'app', 
  router,
  store,
  components: {
    MainTabBar
  }
}
</script>

<style>
@import  "assets/css/base.css" 
</style>
