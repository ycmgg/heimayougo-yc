import {
  mapGetters
} from 'vuex'

export default {
  computed: {
    ...mapGetters('cart', ['total'])
  },
  watch: {
    total() {
      this.getTotal()
    }
  },
  onShow() {
    this.getTotal()
  },
  methods: {
    getTotal() {
      uni.setTabBarBadge({
        index: 2,
        text: this.total + ''
      })
    }
  }
}
