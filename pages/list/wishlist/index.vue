<template>
  <div>
    <!-- ない時の処理書く -->
    <WishList :tsundoku-data="items" />
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

  async getBookData() {
    const snapShot = await db
      .collection('books')
      .where('userId', '==', this.$store.state.auth.uid)
      .get()
    snapShot.forEach(doc => {
      const data = doc.data().items
      data.createdAt = doc.data().createdAt.toDate()
      this.items.push(data)
    })
  }
}
</script>
