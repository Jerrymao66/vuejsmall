export default {
    //context 对象解构
    addToCart({ state, commit }, payload) {
        const product = state.cartList.find(p =>  p.iid === payload.iid )
       return new Promise((reslove,reject)=>{
            if(product){
                commit("addCount",product)
                reslove("商品数量加1")
            } 
            else{
                commit("addNewProduct",payload);
                reslove("成功加入购物车")
            }
       })
    }
}