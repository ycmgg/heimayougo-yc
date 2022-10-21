<template>
  <view>
    <!-- 登录组件 -->
    <my-login v-if="!token"></my-login>

    <!-- 用户信息组件 -->
    <my-userinfo v-else></my-userinfo>
  </view>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  import badgeMix from '@/mixins/tabbar-badge.js'
  export default {
    mixins: [badgeMix],
    data() {
      return {

      };
    },
    computed: {
      ...mapState('user', 'token')
    }
  }
</script>

<style lang="scss">

</style>
