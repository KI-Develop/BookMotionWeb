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
    <p>{{ message }}</p>
    <br />
    <template v-if="items.length">
      <BookList :items="items" flag="search" />
    </template>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import axios from 'axios'
import _ from 'lodash'
import { SearchData } from '~/types/book'
import BookList from '~/components/molecules/BookList.vue'
import Search from '~/components/molecules/Search.vue'

@Component({
  components: {
    BookList,
    Search
  }
})
export default class SearchDb extends Vue {
  keyword: string = ''
  message: string = ''
  select: string = 'book'
  items: SearchData[] = []

  onKeywordChanged(keyword: string) {
    this.keyword = keyword
    this.message = 'waiting for you stop typing...'
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

  async getAnswer() {
    if (this.keyword === '') {
      this.items = []
      this.message = ''
      return
    }

    this.message = 'Loading...'

    const res = await axios.get(
      'https://www.googleapis.com/books/v1/volumes?q=' +
        this.keyword +
        '&maxResults=40'
    )

    this.message = ''
    // TODO: error handling
    for (const [index, item] of res.data.items.entries()) {
      if (item.volumeInfo) {
        this.items.push({
          title: item.volumeInfo.title,
          authors: item.volumeInfo.authors,
          description: item.volumeInfo.description,
          publishedDate: item.volumeInfo.publishedDate,
          publisher: item.volumeInfo.publisher
        })
        if (item.volumeInfo.imageLinks) {
          this.items[index].bookImage = item.volumeInfo.imageLinks.thumbnail
        }
      }
    }
  }
}
</script>
