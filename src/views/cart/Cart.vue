<template>
  <div id="cart">
      <nav-bar class="nav-bar">
         <template v-slot:center>
          购物车({{cartCount}})
        </template>
      </nav-bar>
       <cart-list class="cart-list" :cart-list="cartList"></cart-list>
        <bottom-bar></bottom-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childrencomponents/CartList'
import BottomBar from './childrencomponents/BottomBar'
export default {
  components: {
    NavBar,
    CartList,
    BottomBar
  },
  computed: {
		  cartList() {
        console.log(this.$store.getters.cartList)
		    return this.$store.getters.cartList
      },
      cartCount() {
		    return this.$store.getters.cartCount
      }
    }
}
</script>

<style scoped>
 #cart {
    /*position: relative;*/
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }

  .cart-list {
    position: absolute;
    top: 44px;
    bottom: 49px;
    width: 100%;
  }
</style>