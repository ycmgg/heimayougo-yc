export default {
  namespaced: true,

  state: () => ({
    // 购物车的数组，用来存储购物车中每个商品的信息对象
    // 每个商品的信息对象，都包含如下 6 个属性：
    // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
    cart: JSON.parse(uni.getStorageSync('cart') || '[]')
  }),

  mutations: {
    addToCart(state, goods) {
      const cc = state.cart.find(val => val.goods_id === goods.goods_id)
      if (!cc) {
        state.cart.push(goods)
      } else {
        cc.goods_count++
      }
      this.commit('cart/saveToStorage')
    },
    saveToStorage(state) {
      uni.setStorageSync('cart', JSON.stringify(state.cart))
    },
    // 更新购物车商品的勾选状态
    updataGoodsState(state, goods) {
      const x = state.cart.find(val => val.goods_id === goods.goods_id)
      if (x) {
        x.goods_state = goods.goods_state
        this.commit('cart/saveToStorage')
      }
    },
    // 更新商品数量
    updateGoodsCount(state, goods) {
      const y = state.cart.find(val => val.goods_id === goods.goods_id)
      if (y) {
        y.goods_count = goods.goods_count
        this.commit('cart/saveToStorage')
      }
    },
    // 删除商品
    delGoodsById(state, id) {
      state.cart = state.cart.filter(val => val.goods_id !== id)
      this.commit('cart/saveToStorage')
    },
    // 更新所有商品的勾选状态
    updateAllGoodsState(state, s) {
      state.cart.forEach(val => val.goods_state = s)
      this.commit('cart/saveToStorage')
    }
  },

  getters: {
    total(state) {
      // let c = 0
      // state.cart.forEach(val => c += val.goods_count)
      // return c
      return state.cart.reduce((s, itme) => s += itme.goods_count, 0)
    },
    // 商品数量
    goodsCount(state) {
      return state.cart.filter(val => val.goods_state).reduce((s, itme) => s += itme.goods_count, 0)
    },
    // 商品价格
    tmiut (state) {
      return state.cart.filter(val => val.goods_state).reduce((s,itme) => s += itme.goods_price * itme.goods_count,0).toFixed(2)
    }
  }
}
