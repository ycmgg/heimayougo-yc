<template>
  <view class="cart-container" v-if="cart.length !== 0">
    <!--收货地址 -->
    <my-address></my-address>
    <!-- 购物车商品列表的标题区域 -->
    <view class="cart-title">
      <!-- 左侧的图标 -->
      <uni-icons type="shop" size="18"></uni-icons>
      <!-- 描述文本 -->
      <text class="cart-title-text">购物车</text>
    </view>

    <uni-swipe-action>
      <!-- 购物车列表 -->
      <block v-for="(val,i) in cart" :key="i">
        <uni-swipe-action-item :right-options="options" @click="uniSwipeActionItemDel(val.goods_id)">
          <my-goods :showRadio="true" :val="val" @radio-change="radioChange" :showNum="true" @num-change="numChange">
          </my-goods>
        </uni-swipe-action-item>
      </block>
    </uni-swipe-action>

    <!-- 结算组件 -->
    <my-settle></my-settle>
  </view>
  
    <!-- 空白购物车区域 -->
    <view class="empty-cart" v-else>
      <image src="/static/cart_empty@2x.png" class="empty-img"></image>
      <text class="tip-text">空空如也~</text>
    </view>
</template>

<script>
  import badgeMix from '@/mixins/tabbar-badge.js'
  import {
    mapState,
    mapMutations
  } from 'vuex'
  export default {
    mixins: [badgeMix],
    computed: {
      ...mapState('cart', ['cart'])
    },
    data() {
      return {
        options: [{
          text: '删除', // 显示的文本内容
          style: {
            backgroundColor: '#C00000' // 按钮的背景颜色
          }
        }]
      }
    },
    methods: {
      ...mapMutations('cart', ['updataGoodsState', 'updateGoodsCount', 'delGoodsById']),
      radioChange(e) {
        this.updataGoodsState(e)
      },
      numChange(e) {
        this.updateGoodsCount(e)
      },
      uniSwipeActionItemDel (id) {
        this.delGoodsById(id)
      }
    }
  }
</script>

<style lang="scss">
  .cart-container{
    padding-bottom: 50px;
  }
  .cart-title {
    height: 40px;
    display: flex;

    align-items: center;
    font-size: 14px;
    padding-left: 5px;

    border-bottom: 1px solid #efefef;

    .cart-title-text {
      margin-left: 10px;
    }
  }
  
  .empty-cart {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 150px;
  
    .empty-img {
      width: 90px;
      height: 90px;
    }
  
    .tip-text {
      font-size: 12px;
      color: gray;
      margin-top: 15px;
    }
  }
</style>
