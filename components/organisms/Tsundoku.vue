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
      :loading-flag="loadingFlag"
      @tsunEditTsundoku="editTsundoku"
      @tsunRemoveTsundoku="removeTsundoku"
      @tsunLoadMore="loadMore"
    />
    <BookModal
      :dialog.sync="dialog"
      :item="item"
      title="積み本の編集"
      ok-emit-name="tsundokuOk"
      @tsundokuOk="editOk"
    />
    <RemoveModal
      :dialog.sync="removeDialog"
      :item="removeItem"
      remove-name="積み本"
      remove-emit-name="tsundokuRemove"
      @tsundokuRemove="remove"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import BookList from '@/components/molecules/BookList.vue'
import BookModal from '~/components/molecules/BookModal.vue'
import RemoveModal from '~/components/molecules/RemoveModal.vue'
import Refine from '@/components/molecules/Refine.vue'
import { TsundokuData, updateTsundokuData } from '@/types/book'
import {
  getMoreTsundokuData,
  deleteBookDocument,
  updateTsundoku
} from '~/api/index'

@Component({
  components: { BookList, Refine, BookModal, RemoveModal }
})
export default class Index extends Vue {
  @Prop({ default: {} })
  tsundokuData!: TsundokuData[]

  flag: string = 'tsundoku'
  item: any = {}
  removeItem: any = {}
  dialog: boolean = false
  removeDialog: boolean = false
  loadingFlag: boolean = false

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

  editTsundoku(item: any) {
    this.item = item
    this.dialog = true
  }

  removeTsundoku(removeItem: any) {
    this.removeItem = removeItem
    this.removeDialog = true
  }
  remove(removeItem: any) {
    deleteBookDocument(removeItem.id)
      .then(() => {
        this.removeItem = {}
        this.$emit('updateTsundoku')
        this.$Notice.success({ title: '削除しました。' })
      })
      .catch(error => {
        console.log(error)
      })
  }

  editOk(tsundokuData: any) {
    const updateItem: updateTsundokuData = {
      documentId: tsundokuData.item.id,
      currentPageCount: tsundokuData.currentPageCount,
      totalPageCount: tsundokuData.item.totalPageCount,
      readingStartDate: tsundokuData.readingStartDate,
      readingEndExpectedDate: tsundokuData.readingEndExpectedDate
    }
    updateTsundoku(updateItem)
      .then(() => {
        this.$emit('updateTsundoku')
        this.$Notice.success({ title: '積み本を編集しました。' })
      })
      .catch(err => {
        console.log(err)
        this.$Notice.error({ title: '編集に失敗しました。' })
      })
  }

  async loadMore(lastBookData: TsundokuData) {
    this.loadingFlag = true
    await getMoreTsundokuData(
      this.$store.state.auth.uid,
      lastBookData.createdAt
    ).then(res => {
      res.docs.map(snapShot => {
        if (snapShot.exists) {
          const data = snapShot.data()
          this.tsundokuData.push({
            id: snapShot.id,
            title: data.items.title,
            authors: data.items.authors,
            description: data.items.description,
            bookImage: data.items.bookImage,
            publishedDate: data.items.publishedDate,
            publisher: data.items.publisher,
            readingStartDate: data.readingStartDate,
            readingEndExpectedDate: data.readingEndExpectedDate,
            currentPageCount: data.currentPageCount,
            totalPageCount: data.items.totalPageCount,
            createdAt: data.createdAt
          })
        }
      })
      this.loadingFlag = false
    })
  }
}
</script>
