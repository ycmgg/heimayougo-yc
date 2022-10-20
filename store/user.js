export default {
  namespaced: true,
  state: () => ({
    address: JSON.parse(uni.getStorageSync('address') || '{}')
  }),
  mutations:{
    updateAddress (state,address) {
      state.address = address
      this.commit('user/saveAddressToStorage')
    },
    // 持久化
    saveAddressToStorage (state) {
      uni.setStorageSync('address', JSON.stringify(state.address))
    }
  },
  getters:{
    addsrt(state) {
      if (!state.address.provinceName === '') return ''
      // 拼接 省，市，区，详细地址 的字符串并返回给用户
      return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
    }
  }
}