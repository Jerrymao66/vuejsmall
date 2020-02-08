<template>
  <div id="app">
   <router-view></router-view>
   <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import router from './router'
import MainTabBar from 'components/content/mainTabbar/MainTabBar'
export default {
  name: 'app',
  router,
  components: {
    MainTabBar
  }
}
</script>

<style>
@import  "assets/css/base.css" 
</style>
