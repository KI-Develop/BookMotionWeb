<template>
  <div>
    <!-- ない時の処理書く -->
    <WishList
      v-if="items.length"
      :tsundoku-data="items"
      @getWishlistDatahoge="getBookData"
    />
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

  created() {
    this.getBookData()
  }

  mounted() {
    this.$nuxt.$emit('updatePageName', [
      { name: 'ホーム', path: '' },
      { name: '気になる本', path: '/list/wishlist' }
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
    console.log('wishlist index', this.items)
  }
}
</script>
