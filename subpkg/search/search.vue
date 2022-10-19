<template>
  <view class="search-box">
    <!-- 使用 uni-ui 提供的搜索组件 -->
    <uni-search-bar @input="input" placeholder="请输入搜索内容" :radius="100" cancelButton="none"></uni-search-bar>

    <!-- 搜索建议列表 -->
    <view class="sugg-list" v-if="searchResults.length !== 0">
      <view class="sugg-itme" v-for="val in searchResults" :key="val.goods_id" @click="gotoDetail(val.goods_id)">
        <view class="goods-name">{{val.goods_name}}</view>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view>

    <!-- 搜索历史列表 -->
    <view class="history-box" v-else>
      <!-- 标题区域 -->
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons @click="clean" type="trash" size="17"></uni-icons>
      </view>
      <!-- 列表区域 -->
      <view class="history-list">
        <uni-tag @click="gotoDoodsList(val)" :text="val" v-for="(val,i) in historyList" :key="i"></uni-tag>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        timer: null,
        kw: '',
        // 搜索结果列表
        searchResults: [],
        // 搜索关键词的历史记录
        historyList: []
      };
    },
    onLoad () {
      this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
    },
    methods: {
      input(val) {
        clearTimeout(this.timer)
        if (val === '') return this.searchResults = []
        this.timer = setTimeout(() => {
          // val 是最新的搜索内容
          this.kw = val
          // 根据关键词，查询搜索建议列表
          this.getSearchList()
        }, 800)
      },
      async getSearchList() {
        try {
          const {
            data
          } = await uni.$http.get('/api/public/v1/goods/qsearch', {
            query: this.kw
          })
          this.searchResults = data.message
          this.saveSearchHistory()
        } catch (err) {
          uni.$showMsg()
        }
      },
      // 跳转详情页面
      gotoDetail(id) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + id
        })
      },
      // 2. 保存搜索关键词的方法
      saveSearchHistory() {
        const s = this.historyList.findIndex(val => val === this.kw)
        if(s > -1) return
        // 2.1 直接把搜索关键词 push 到 historyList 数组中
        this.historyList.unshift(this.kw)
        uni.setStorageSync('kw', JSON.stringify(this.historyList))
      },
      clean () {
        // 清空 data 中保存的搜索历史
        this.historyList = []
        // 清空本地存储中记录的搜索历史
        uni.setStorageSync('kw', '[]')
      },
      //
      gotoDoodsList (kw) {
        uni.navigateTo({
          url: '/subpkg/goods_list/goods_list?query=' + kw
        })
      }
    }
  }
</script>

<style lang="scss">
  .search-box {
    position: sticky;
    top: 0;
    z-index: 999;
  }

  .sugg-list {
    padding: 0 5px;

    .sugg-itme {
      font-size: 12px;
      padding: 13px 0;
      border-bottom: 1px solid #efefef;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .goods-name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-right: 3px;
      }
    }
  }

  .history-box {
    padding: 0 5px;

    .history-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      font-size: 13px;
      border-bottom: 1px solid #efefef;
    }

    .history-list {
      display: flex;
      flex-wrap: wrap;
      .uni-tag {
        margin-top: 10px;
        margin-right: 5px;
      }
    }
  }
</style>
