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
        @searchAddWishlist="dialog = false"
      />
      <BookModal
        :dialog.sync="dialog"
        ok-emit-name="searchDbOk"
        cancel-emit-name="searchDbCancel"
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
import _ from 'lodash'
import * as firebase from 'firebase/app'
import { SearchData, AddWishlistData } from '~/types/book'
import { googleBooksApi } from '~/api/index'
import BookList from '~/components/molecules/BookList.vue'
import BookModal from '~/components/molecules/BookModal.vue'
import Search from '~/components/molecules/Search.vue'
import { db } from '~/plugins/firebase'

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
  dialog: boolean = false

  onKeywordChanged(keyword: string) {
    this.keyword = keyword
    this.spinShow = true
    this.debouncedGetAnswer()
  }

  created() {
    this.debouncedGetAnswer = _.debounce(this.getAnswer, 1500)
  }

  mounted() {
    this.$nuxt.$emit('updatePageName', [
      { name: '書籍登録', path: '' },
      { name: 'データベース検索', path: '/register/searchdb' }
    ])
  }

  debouncedGetAnswer() {}

  getAnswer() {
    if (this.keyword === '') {
      this.items = []
      this.spinShow = false
      return
    }

    googleBooksApi(this.keyword)
      .then(res => {
        for (const [index, item] of res.data.items.entries()) {
          if (item.volumeInfo) {
            this.items.push({
              title: item.volumeInfo.title || '',
              authors: item.volumeInfo.authors || [],
              description: item.volumeInfo.description || '',
              publishedDate: item.volumeInfo.publishedDate || '',
              publisher: item.volumeInfo.publisher || ''
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

  addTsundoku(item: any) {
    // TODO: dbに追加
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
    db.collection('books')
      .add(wishlistData)
      .then(res => {
        this.success('wishlist')
      })
      .catch(err => console.log(err))
  }

  ok() {
    this.success('tsundoku')
  }
  cancel(dialogVisible: boolean) {
    this.dialog = dialogVisible
  }

  success(bookType: string): void {
    this.$Notice.success({
      title:
        bookType === 'tsundoku'
          ? '積み本に追加しました。'
          : '気になる本に追加しました。',
      render: h => {
        return h('span', [
          h(
            'a',
            {
              attrs: {
                href: '/list/' + bookType
              }
            },
            bookType === 'tsundoku' ? '積み本一覧' : '気になる本一覧'
          ),
          'を確認する。'
        ])
      }
    })
  }
}
</script>

<style scoped>
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
</style>
