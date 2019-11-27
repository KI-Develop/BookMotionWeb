<template>
  <div>
    <Row>
      <WishList
        v-if="items.length"
        :items="items"
        @updateWishlist="getBookData"
      />
    </Row>
    <i-col>
      <Spin v-if="spinShow" size="large" fix>
        <Icon type="ios-loading" size="18" class="demo-spin-icon-load" />
        <div>Loading...</div>
      </Spin>
    </i-col>
    <template v-if="!items.length && spinShow == false">
      <Alert show-icon closable style="width:350px; margin:0 auto">
        気になる本はありません。
        <span slot="desc">
          気になる本を
          <nuxt-link to="/register/searchdb"> データベース </nuxt-link>
          から登録する
        </span>
      </Alert>
      <br />
      <Alert
        type="warning"
        show-icon
        closable
        style="width:350px; margin:0 auto"
      >
        Sorry ...
        <span slot="desc">
          ページを再リロードすると表示されないエラーが起きています。
          <br />
          全力でバグを潰しますので少々お待ちください。
        </span>
      </Alert>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import WishList from '@/components/organisms/WishList.vue'
import { WishlistData } from '@/types/book'
import { getWishlistData } from '~/api/index'

@Component({
  components: {
    WishList
  }
})
export default class Index extends Vue {
  flag: string = 'wishlist'
  items: WishlistData[] = []
  spinShow: boolean = false

  created() {
    this.getBookData()
  }

  mounted() {
    this.$nuxt.$emit('updatePageName', [
      { name: 'ホーム', path: '', openName: '1' },
      { name: '気になる本', path: '/home/wishlist', activeName: '1-2' }
    ])
  }

  async getBookData() {
    this.spinShow = true
    this.items = []

    await getWishlistData(this.$store.state.auth.uid)
      .then(res => {
        res.docs.map(snapShot => {
          const data = snapShot.data().items
          data.id = snapShot.id
          data.createdAt = snapShot.data().createdAt
          this.items.push(data)
        })
      })
      .catch(err => {
        console.log(err)
      })

    this.spinShow = false
  }
}
</script>
<style scoped>
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
</style>
