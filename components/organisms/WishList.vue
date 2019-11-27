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
      @wishRemoveWishlist="removeWishlist"
    />
    <BookModal
      :dialog.sync="dialog"
      :item="item"
      title="積み本に追加"
      ok-emit-name="wishlistOk"
      @wishlistOk="ok"
    />
    <RemoveModal
      :dialog.sync="removeDialog"
      :item="removeItem"
      flag="wishlist"
      remove-emit-name="wishlistRemove"
      @wishlistRemove="remove"
    />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import BookList from '@/components/molecules/BookList.vue'
import BookModal from '~/components/molecules/BookModal.vue'
import RemoveModal from '~/components/molecules/RemoveModal.vue'
import Refine from '@/components/molecules/Refine.vue'
import { WishlistData, SearchData } from '@/types/book'
import { db } from '~/plugins/firebase'

@Component({
  components: { BookList, Refine, BookModal, RemoveModal }
})
export default class WishList extends Vue {
  @Prop({ default: {} })
  tsundokuData!: WishlistData

  flag: string = 'wishlist'
  item: SearchData = {}
  removeItem: any = {}
  dialog: boolean = false
  removeDialog: boolean = false

  bookCriteria: Array<string> = [
    'すべて表示',
    '論文',
    '同人誌',
    '書籍登録が早い順'
  ]
  defaultBookCriteria: string = 'すべて表示'

  addTsundoku(item: any) {
    this.item = item
    this.dialog = true
  }

  removeWishlist(removeItem: any) {
    this.removeItem = removeItem
    this.removeDialog = true
  }
  remove(removeItem: any) {
    db.collection('books')
      .doc(removeItem.id)
      .delete()
      .then(() => {
        this.removeItem = {}
        this.$emit('updateWishlist')
        this.$Notice.success({ title: '削除しました。' })
      })
      .catch(error => {
        console.log(error)
      })
  }

  ok(tsundokuData: any) {
    db.collection('books')
      .doc(tsundokuData.item.id)
      .update({
        bookStatus: 'tsundoku',
        currentPageCount: tsundokuData.currentPageCount,
        readingStartDate: tsundokuData.readingStartDate,
        readingEndExpectedDate: tsundokuData.readingEndExpectedDate,
        'items.totalPageCount': tsundokuData.item.totalPageCount
      })
      .then(() => {
        this.$emit('updateWishlist')
        this.$Notice.success({ title: '積み本に追加しました。' })
      })
      .catch(err => {
        console.log(err)
        this.$Notice.error({ title: '追加に失敗しました。' })
      })
  }
}
</script>
