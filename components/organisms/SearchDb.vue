<template>
  <div>
    <Row>
      <i-col :xs="{ span: 24 }" :lg="{ span: 12 }">
        <Search
          option="書籍検索"
          select="タイトルや著者から検索する"
          button-icon="ios-search"
          emit-name="bookKeywordChanged"
          @bookKeywordChanged="onKeywordChanged"
        />
      </i-col>
    </Row>
    <br />
    <Row>
      <BookList
        v-if="items.length"
        :items="items"
        flag="search"
        @searchAddTsundoku="addTsundoku"
        @searchAddWishlist="addWishlist"
      />
      <BookModal
        :dialog.sync="dialog"
        ok-emit-name="searchDbOk"
        title="積み本に追加"
        :item="item"
        :total-page-count="totalPageCount"
        @searchDbOk="ok"
      />
      <i-col :xs="{ span: 24 }" :lg="{ span: 12 }">
        <Spin v-if="spinShow" size="large" fix>
          <Icon type="ios-loading" size="18" class="demo-spin-icon-load" />
          <div>Loading...</div>
        </Spin>
      </i-col>
    </Row>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import * as firebase from 'firebase/app'
import { SearchData, AddWishlistData, AddTsundokuData } from '~/types/book'
import { googleBooksApi, addTsundoku, addWishlist } from '~/api/index'
import BookList from '~/components/molecules/BookList.vue'
import BookModal from '~/components/molecules/BookModal.vue'
import Search from '~/components/molecules/Search.vue'

@Component({
  components: {
    BookList,
    BookModal,
    Search
  }
})
export default class SearchDb extends Vue {
  keyword: string = ''
  message: string = ''
  spinShow: boolean = false
  items: SearchData[] = []
  item: SearchData = {}
  totalPageCount: number = 0
  dialog: boolean = false

  onKeywordChanged(keyword: string) {
    this.keyword = keyword
    this.spinShow = true
    this.getAnswer()
  }

  debouncedGetAnswer() {}

  getAnswer() {
    if (this.keyword === '') {
      this.items = []
      this.spinShow = false
      return
    }

    this.items = []

    googleBooksApi(this.keyword)
      .then(res => {
        for (const [index, item] of res.data.items.entries()) {
          if (item.volumeInfo) {
            this.items.push({
              title: item.volumeInfo.title || '',
              authors: item.volumeInfo.authors || [],
              description: item.volumeInfo.description || '',
              publishedDate: item.volumeInfo.publishedDate || '',
              publisher: item.volumeInfo.publisher || '',
              totalPageCount: item.volumeInfo.pageCount || 0
            })

            if (item.volumeInfo.imageLinks) {
              this.items[index].bookImage = item.volumeInfo.imageLinks.thumbnail
            }
          }
        }

        this.spinShow = false
      })
      .catch(err => {
        console.log(err)
      })
  }

  addTsundoku(item: SearchData) {
    this.totalPageCount = item.totalPageCount || 0
    this.item = item
    this.dialog = true
  }

  addWishlist(item: SearchData): void {
    const wishlistData: AddWishlistData = {
      userId: this.$store.state.auth.uid,
      bookStatus: 'wishlist',
      bookType: 'book',
      items: item,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    }
    addWishlist(wishlistData)
      .then(res => {
        this.success('wishlist')
      })
      .catch(err => {
        console.log(err)
        this.error()
      })
  }

  ok(tsundokuData: any) {
    // TODO: itemをapiに追加
    const addTsundokuData: AddTsundokuData = {
      userId: this.$store.state.auth.uid,
      bookStatus: 'tsundoku',
      bookType: 'book',
      readingStartDate: tsundokuData.readingStartDate,
      readingEndExpectedDate: tsundokuData.readingEndExpectedDate,
      currentPageCount: tsundokuData.currentPageCount,
      items: tsundokuData.item,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    }
    addTsundoku(addTsundokuData)
      .then(res => {
        this.success('tsundoku')
      })
      .catch(err => {
        console.log(err)
        this.error()
      })
  }
  cancel(dialogVisible: boolean) {
    this.dialog = dialogVisible
  }

  success(bookType: string): void {
    this.$Notice.success({
      title:
        bookType === 'tsundoku'
          ? '積み本に追加しました。'
          : '気になる本に追加しました。'
    })
  }

  error() {
    this.$Notice.error({
      title: '追加に失敗しました。'
    })
  }
}
</script>

<style scoped>
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
</style>
