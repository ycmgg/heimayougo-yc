<template>
  <view class="goods-itme">
    <view class="goods-itme-left">
      <radio :checked="val.goods_state" color="#C00000" v-if="showRadio" @click="radioClick"></radio>
      <image :src="val.goods_small_logo || defaultPic"></image>
    </view>
    <view class="goods-itme-right">
      <text class="name">{{val.goods_name}}</text>
      <view class="goods-info-box">
        <text class="price">$ {{val.goods_price | tofixed}}</text>
        <uni-number-box :min="1" :value="val.goods_count" v-if="showNum" @change="numChange"></uni-number-box>
      </view>
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
      },
      // 是否展示图片左侧的 radio
      showRadio: {
        type: Boolean,
        default: false
      },
      showNum: {
        type: Boolean,
        default: false
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
    },
    methods: {
      radioClick() {
        this.$emit('radio-change', {
          goods_id: this.val.goods_id,
          goods_state: !this.val.goods_state
        })
      },
      numChange (val) {
        this.$emit('num-change',{
          goods_id: this.val.goods_id,
          goods_count: +val
        })
      }
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
      display: flex;
      justify-content: space-between;
      align-items: center;

      image {
        width: 100px;
        height: 100px;
        display: block;
      }
    }

    .goods-itme-right {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .goods-info-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

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
