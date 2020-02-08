<template>
  <div class="wrapper">
      <ul>
        <button @click="btnClick"> sadasdasd</button>
        <li>内容11</li>
        <li>内容21</li>
        <li>内容31</li>
        <li>内容41</li>
        <li>内容51</li>
        <li>内容61</li>
        <li>内容71</li>
        <li>内容81</li>
        <li>内容91</li>
        <li>内容101</li>
        <li>内容111</li>
        <li>内容121</li>
        <li>内容131</li>
        <li>内容141</li>
        <li>内容151</li>
        <li>内容161</li>
        <li>内容171</li>
        <li>内容181</li>
        <li>内容191</li>
        <li>内容201</li>
        <li>内容211</li>
        <li>内容221</li>
        <li>内容231</li>
        <li>内容241</li>
        <li>内容251</li>
        <li>内容261</li>
        <li>内容271</li>
        <li>内容281</li>
        <li>内容291</li>
        <li>内容301</li>
        <li>内容311</li>
        <li>内容321</li>
        <li>内容331</li>
        <li>内容341</li>
        <li>内容351</li>
        <li>内容361</li>
        <li>内容371</li>
        <li>内容381</li>
        <li>内容391</li>
        <li>内容401</li>
        <li>内容411</li>
        <li>内容421</li>
        <li>内容431</li>
        <li>内容441</li>
        <li>内容451</li>
        <li>内容461</li>
        <li>内容471</li>
        <li>内容481</li>
        <li>内容491</li>
        <li>内容501</li>
        <li>内容511</li>
        <li>内容521</li>
        <li>内容531</li>
        <li>内容541</li>
        <li>内容551</li>
        <li>内容561</li>
        <li>内容571</li>
        <li>内容581</li>
        <li>内容591</li>
        <li>内容601</li>
        <li>内容611</li>
        <li>内容621</li>
        <li>内容631</li>
        <li>内容641</li>
        <li>内容651</li>
        <li>内容661</li>
        <li>内容671</li>
        <li>内容681</li>
        <li>内容691</li>
        <li>内容701</li>
        <li>内容711</li>
        <li>内容721</li>
        <li>内容731</li>
        <li>内容741</li>
        <li>内容751</li>
        <li>内容761</li>
        <li>内容771</li>
        <li>内容781</li>
        <li>内容791</li>
        <li>内容801</li>
        <li>内容811</li>
        <li>内容821</li>
        <li>内容831</li>
        <li>内容841</li>
        <li>内容851</li>
        <li>内容861</li>
        <li>内容871</li>
        <li>内容881</li>
        <li>内容891</li>
        <li>内容901</li>
        <li>内容911</li>
        <li>内容921</li>
        <li>内容931</li>
        <li>内容941</li>
        <li>内容951</li>
        <li>内容961</li>
        <li>内容971</li>
        <li>内容981</li>
        <li>内容991</li>
      </ul>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      bs:null
    }
  },
mounted () {
  const bs = new BScroll(document.querySelector('.wrapper'),{
    click:true
  })
  this.bs=bs
  bs.on()
},
methods: {
  btnClick(){
    console.log("Aaa")
  }
}
}
</script>

<style scoped>
.wrapper{
  height: 100px;
  overflow: hidden;
  background-color: red;
}
</style>