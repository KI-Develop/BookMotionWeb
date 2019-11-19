<template>
  <div>
    <Refine
      :display-criteria="bookCriteria"
      :default-criteria="defaultBookCriteria"
    />
    <br /><br />
    <BookList
      :items="tsundokuData"
      :flag="flag"
      @wishAddTsundoku="addTsundoku"
    />
    <BookModal
      :dialog.sync="dialog"
      ok-emit-name="wishlistOk"
      :item="item"
      :total-page-count="totalPageCount"
      @wishlistOk="ok"
    />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import BookList from '@/components/molecules/BookList.vue'
import BookModal from '~/components/molecules/BookModal.vue'
import Refine from '@/components/molecules/Refine.vue'
import { WishlistData, SearchData } from '@/types/book'
import { db } from '~/plugins/firebase'

@Component({
  components: { BookList, Refine, BookModal }
})
export default class WishList extends Vue {
  @Prop({ default: {} })
  tsundokuData!: WishlistData

  flag: string = 'wishlist'
  totalPageCount: number = 0
  item: SearchData = {}
  dialog: boolean = false

  bookCriteria: Array<string> = [
    'すべて表示',
    '論文',
    '同人誌',
    '書籍登録が早い順'
  ]
  defaultBookCriteria: string = 'すべて表示'

  mounted() {
    this.$nuxt.$emit('updatePageName', [
      { name: 'ホーム', path: '' },
      { name: '気になる本', path: '/list/wishlist' }
    ])
  }

  addTsundoku(item) {
    this.totalPageCount = item.totalPageCount || 0
    this.item = item
    this.dialog = true
  }

  ok(tsundokuData: any) {
    db.collection('books')
      .doc(tsundokuData.item.id)
      .update({
        bookStatus: 'tsundoku',
        currentPageCount: tsundokuData.currentPageCount,
        readingStartDate: tsundokuData.readingStartDate,
        readingEndDate: tsundokuData.readingEndDate
      })
      .then(() => {
        // TODO ⬇︎発火するが、再レンダリングされないので修正する。
        // this.$emit('getWishlistDatahoge')
        this.$Notice.success({ title: 'このコンポーネント作れ' })
      })
  }
}
</script>
