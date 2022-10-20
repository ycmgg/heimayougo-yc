<template>
  <view>
    <view class="search-box">
      <my-search @myclick="gotoSearch"></my-search>
    </view>
    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :circular="true">
      <swiper-item v-for="val in swiperList" :key="val.goods_id">
        <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + val.goods_id">
          <image :src="val.image_src" />
        </navigator>
      </swiper-item>
    </swiper>

    <!-- 分类导航区域 -->
    <view class="nav-list">
      <view class="nav-itme" v-for="(val, i) in navList" :key="i" @click="navClickHandler(val)">
        <image :src="val.image_src" class="nav-img"></image>
      </view>
    </view>

    <!-- 楼层区域 -->
    <view class="floor-list">
      <view class="floor-itme" v-for="(val,i) in floorList" :key="i">
        <image :src="val.floor_title.image_src" class="floor-title"></image>

        <!-- 楼层图片区域 -->
        <view class="floor-img-box">
          <!-- 左侧大图片的盒子 -->
          <navigator :url="val.product_list[0].url" class="left-img-box">
            <image :src="val.product_list[0].image_src" mode="widthFix" :style="{width: val.product_list[0].image_width + 'rpx'}">
            </image>
          </navigator>
          <!-- 右侧 4 个小图片的盒子 -->
          <view class="right-img-box">
            <navigator :url="itme.url" class="right-img-item" v-for="(itme,ind) in val.product_list" :key="ind" v-if="ind !== 0">
              <image :src="itme.image_src" mode="widthFix" :style="{width: itme.image_width + 'rpx'}"></image>
            </navigator>
          </view>
        </view>

      </view>
    </view>



  </view>
</template>

<script>
  import badgeMix from '@/mixins/tabbar-badge.js'
  export default {
    mixins:[badgeMix],
    data() {
      return {
        // 轮播图的数据列表，默认为空数组
        swiperList: [],
        // 1. 分类导航的数据列表
        navList: [],
        // 1. 楼层的数据列表
        floorList: []
      }
    },
    onLoad() {
      // 在小程序页面刚加载的时候，调用获取轮播图数据的方法
      this.getSwiperList(),
      this.getNavList()
      this.getFloorList()
    },
    methods: {
      // 获取轮播图数据的方法
      async getSwiperList() {
        try {
          const {
            data
          } = await uni.$http.get('/api/public/v1/home/swiperdata')
          this.swiperList = data.message
        } catch (err) {
          uni.$showMsg()
        }
      },
      //获取分类导航的数据列表
      async getNavList() {
        try {
          const {
            data: {
              message
            }
          } = await uni.$http.get('/api/public/v1/home/catitems')
          this.navList = message
        } catch (err) {
          uni.$showMsg()
        }
      },
      // nav-item 项被点击时候的事件处理函数
      navClickHandler(val) {
        if (val.name === '分类') {
          uni.switchTab({
            url: '/pages/cate/cate'
          })
        }
      },
      //获取楼层列表数据的方法
      async getFloorList() {
        try {
          const {
            data: {
              message
            }
          } = await uni.$http.get('/api/public/v1/home/floordata')
          // 通过双层 forEach 循环，处理 URL 地址
          message.forEach(val => {
            val.product_list.forEach(itme => {
              itme.url = '/subpkg/goods_list/goods_list?' + itme.navigator_url.split('?')[1]
            })
          })
          
          this.floorList = message
        } catch (err) {
          uni.$showMsg()
        }
      },
      // 跳转搜索页面
      gotoSearch () {
        uni.navigateTo({
          url: '/subpkg/search/search'
        })
      }
    }
  }
</script>

<style lang="scss">
  swiper {
    height: 330rpx;

    .swiper-item,
    image {
      width: 100%;
      height: 100%;
    }
  }

  .nav-list {
    display: flex;
    justify-content: space-around;
    margin: 15rpx 0;

    .nav-img {
      width: 128rpx;
      height: 140rpx;
    }
  }

  .floor-title {
    height: 60rpx;
    width: 100%;
    display: flex;
  }

  .right-img-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .floor-img-box {
    display: flex;
    padding-left: 10rpx;
  }
  
  .search-box{
    position: sticky;
    top: 0;
    z-index: 999;
  }
</style>
