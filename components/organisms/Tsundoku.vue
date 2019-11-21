<template>
  <div>
    <Refine
      :display-criteria="bookCriteria"
      :default-criteria="defaultBookCriteria"
    />
    <br />
    <br />
    <BookList
      :items="tsundokuData"
      :flag="flag"
      @tsunEditTsundoku="editTsundoku"
    />
    <BookModal
      :dialog.sync="dialog"
      :item="item"
      title="編集"
      ok-emit-name="tsundokuOk"
      @tsundokuOk="editOk"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import BookList from '@/components/molecules/BookList.vue'
import BookModal from '~/components/molecules/BookModal.vue'
import Refine from '@/components/molecules/Refine.vue'
import { TsundokuData } from '@/types/book'
import { db } from '~/plugins/firebase'

@Component({
  components: { BookList, Refine, BookModal }
})
export default class Index extends Vue {
  @Prop({ default: {} })
  tsundokuData!: TsundokuData

  flag: string = 'tsundoku'
  bookCriteria: Array<string> = [
    'すべて表示',
    '論文',
    '同人誌',
    '読書終了予定日が近い順',
    '読了達成率が高い順',
    '読了達成率が低い順',
    '読書開始日が早い順'
  ]
  defaultBookCriteria: string = 'すべて表示'
  dialog: boolean = false
  item: any = {}

  editTsundoku(item: any) {
    this.item = item
    this.dialog = true
  }
  editOk(tsundokuData: any) {
    console.log('editOk=>', tsundokuData)
    db.collection('books')
      .doc(tsundokuData.item.id)
      .update({
        currentPageCount: tsundokuData.currentPageCount,
        readingStartDate: tsundokuData.readingStartDate,
        readingEndExpectedDate: tsundokuData.readingEndExpectedDate,
        'items.totalPageCount': tsundokuData.item.totalPageCount
      })
      .then(() => {
        // TODO ⬇︎発火するが、再レンダリングされないので修正する。
        // this.$emit('getWishlistDatahoge')
        this.$Notice.success({ title: 'このコンポーネント作れ' })
      })
  }
}
</script>
