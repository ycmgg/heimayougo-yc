<template>
  <view class="goods-list">
    <view v-for="(val,i) in goodsList" :key="i" @click="gotoDoodsDetail(val.goods_id)">
      <my-goods :val="val" />
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        queryObj: {
          query: '',
          cid: '',
          pagenum: 1,
          pagesize: 10
        },
        goodsList: [],
        total: 0,
        isloading: false
      };
    },
    onLoad(op) {
      this.queryObj.query = op.query || ''
      this.queryObj.cid = op.cid || ''
      this.getGoodsList()
    },
    methods: {
      async getGoodsList(yc) {
        try {
          this.isloading = true
          const {
            data: {
              message
            }
          } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
          this.total = message.total
          this.goodsList = [...this.goodsList,...message.goods]
          this.isloading = false
          yc && yc()
        } catch (err) {
          uni.$showMsg()
        }
      },
      gotoDoodsDetail (id) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + id
        })
      }
    },
    onReachBottom() {
        if(this.isloading) return
        if(this.goodsList.length >= this.total) return uni.$showMsg('没有更多数据了!')
        this.queryObj.pagenum++
        this.getGoodsList()
    },
    onPullDownRefresh () {
      this.queryObj.pagenum = 1
      this.total = 0
      this.isloading = false 
      this.goodsList = []
      
      this.getGoodsList(() => uni.stopPullDownRefresh())
    }
  }
</script>

<style lang="scss">

</style>
