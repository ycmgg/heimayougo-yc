<template>
  <view class="goods-itme">
    <view class="goods-itme-left">
      <image :src="val.goods_small_logo || defaultPic"></image>
    </view>
    <view class="goods-itme-right">
      <text class="name">{{val.goods_name}}</text>
      <text class="price">$ {{val.goods_price | tofixed}}</text>
    </view>
  </view>
</template>

<script>
  export default {
    name: "my-goods",
    props: {
      val: {
        type: Object,
        default: {}
      }
    },
    filters: {
      tofixed(unm) {
        return Number(unm).toFixed(2)
      }
    },
    data() {
      return {
        // 默认的空图片
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      };
    }
  }
</script>

<style lang="scss">
  .goods-itme {
    display: flex;
    padding: 10px 5px;
    border-bottom: 1px solid #8effee;

    .goods-itme-left {
      margin-right: 5px;

      image {
        width: 100px;
        height: 100px;
        display: block;
      }
    }

    .goods-itme-right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .name {
        font-size: 13px;
      }

      .price {
        font-size: 16px;
        color: #C00000;
      }
    }
  }
</style>
