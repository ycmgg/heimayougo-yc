<template>
  <view>
    <my-search @myclick="gotoSearch"></my-search>
    <view class="scroll-view-container">
      <!-- 左侧的滚动视图区域 -->
      <scroll-view class="left-scroll-view" scroll-y="true" :style="{height: wh + 'px'}">
        <block v-for="(val,i) in cateList" :key="i">
          <view class="left-scroll-view-itme" :class="{active:i === active}" @click="activeChanged(i)">{{val.cat_name}}
          </view>
        </block>
      </scroll-view>
      <!-- 左侧的滚动视图区域 -->
      <scroll-view class="right-scroll-view" scroll-y="true" :style="{height: wh + 'px'}" :scroll-top="scrollTop">
        <view class="cate-1v2" v-for="(val,i) in cateLevel2" :key="i">
          <view class="cate-1v2-title">/ {{val.cat_name}} /</view>
          <!-- 动态渲染三级分类的列表数据 -->
          <view class="cate-1v3-list">
            <!-- 三级分类 Item 项 -->
            <view class="cate-1v3-item" v-for="val2 in val.children" :key="val2.cat_id" @click="gotoGoodsList(val2)">
              <!-- 图片 -->
              <image :src="val2.cat_icon" />
              <!-- 文本 -->
              <text>{{val2.cat_name}}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  import badgeMix from '@/mixins/tabbar-badge.js'
  export default {
    mixins:[badgeMix],
    data() {
      return {
        wh: 0,
        cateList: [],
        // 当前选中项的索引，默认让第一项被选中
        active: 0,
        // 二级分类列表
        cateLevel2: [],
        scrollTop: 0
      };
    },
    onLoad() {
      const sysInfo = uni.getSystemInfoSync()
      this.wh = sysInfo.windowHeight - 50
      this.getCateList()
    },
    methods: {
      // 获取分类列表数据的方法
      async getCateList() {
        try {
          const {
            data
          } = await uni.$http.get('/api/public/v1/categories')
          this.cateList = data.message
          this.cateLevel2 = data.message[0].children
        } catch (err) {
          uni.$showMsg()
        }
      },
      activeChanged(i) {
        this.active = i
        this.cateLevel2 = this.cateList[i].children
        this.scrollTop = this.scrollTop === 1 ? 0 : 1
      },
      //  跳转分类页面
      gotoGoodsList(val) {
        uni.navigateTo({
          url: `/subpkg/goods_list/goods_list?cid=${val.cat_id}`
        })
      },
      // 跳转到分包中的搜索页面
      gotoSearch() {
        uni.navigateTo({
          url: '/subpkg/search/search'
        })
      }
    }
  }
</script>

<style lang="scss">
  .scroll-view-container {
    display: flex;

    .left-scroll-view {
      width: 120px;

      .left-scroll-view-itme {
        line-height: 60px;
        background-color: #f7f7f7;
        text-align: center;
        font-size: 12px;

        &.active {
          background-color: #aaffff;
          position: relative;

          &::before {
            content: ' ';
            display: block;
            width: 3px;
            height: 60px;
            background-color: #ffaaff;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
    }

    .right-scroll-view {
      .cate-1v2-title {
        font-size: 12px;
        font-weight: bold;
        text-align: center;
        padding: 15px 0;
      }
    }
  }

  .cate-1v3-list {
    display: flex;
    flex-wrap: wrap;

    .cate-1v3-item {
      width: 33.33%;
      margin-bottom: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;

      image {
        width: 60px;
        height: 60px;
      }

      text {
        font-size: 12px;
      }
    }
  }
</style>
