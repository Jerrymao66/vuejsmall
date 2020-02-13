export default {
    addCount(state,payload){
        payload.counter+=1
    },
    addNewProduct(state,payload){
        payload.counter=1
        payload.checked=true
        state.cartList.push(payload)
    }
}