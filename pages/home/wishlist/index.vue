<template>
  <div>
    <Row>
      <WishList
        v-if="items.length"
        :tsundoku-data="items"
        @getWishlistDatahoge="getBookData"
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
import { db } from '~/plugins/firebase'

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
      { name: 'ホーム', path: '' },
      { name: '気になる本', path: '/home/wishlist' }
    ])
  }

  fromTimeStampToDate(date: any): string {
    const d = new Date(date.seconds * 1000)
    const year = d.getFullYear()
    const month = `0${d.getMonth() + 1}`.slice(-2)
    const day = `0${d.getDate()}`.slice(-2)
    return `${year}-${month}-${day}`
  }
  async getBookData() {
    this.spinShow = true
    const snapShot = await db
      .collection('books')
      .where('userId', '==', this.$store.state.auth.uid)
      .where('bookStatus', '==', 'wishlist')
      .get()
    snapShot.forEach(doc => {
      const data = doc.data().items
      data.id = doc.id
      data.createdAt = this.fromTimeStampToDate(doc.data().createdAt)
      this.items.push(data)
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
