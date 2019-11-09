<template>
  <div>
    <Row>
      <i-col :xs="{ span: 24 }" :lg="{ span: 12 }">
        <i-input v-model="keyword" :placeholder="pHolder">
          <Select slot="prepend" v-model="select" style="width: 80px">
            <Option value="book">
              書籍検索
            </Option>
            <Option value="paper">
              論文検索
            </Option>
          </Select>
          <Button slot="append" icon="ios-search" />
        </i-input>
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
import { Component, Watch, Vue } from 'vue-property-decorator'
import axios from 'axios'
import _ from 'lodash'
import { SearchData } from '~/types/book'
import BookList from '~/components/molecules/BookList.vue'

@Component({
  components: {
    BookList
  }
})
export default class database extends Vue {
  keyword: string = ''
  message: string = ''
  select: string = 'book'
  items: SearchData[] = []

  get pHolder() {
    return this.select === 'book' ? 'タイトルや著者から検索する' : '論文だお'
  }

  @Watch('keyword')
  onKeywordChanged() {
    this.message = 'waiting for you stop typing...'
    this.debouncedGetAnswer()
  }

  created() {
    this.debouncedGetAnswer = _.debounce(this.getAnswer, 1500)
  }

  mounted() {
    this.$nuxt.$emit('updatePageName', [
      { name: '書籍登録', path: '' },
      { name: 'データベース検索', path: '/register/database' }
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
      console.log(item.volumeInfo)
      if (item.volumeInfo) {
        this.items.push({
          title: item.volumeInfo.title,
          authors: item.volumeInfo.authors,
          description: item.volumeInfo.description,
          publishedDate: item.volumeInfo.publishedDate
        })
        if (item.volumeInfo.imageLinks) {
          this.items[index].bookImage = item.volumeInfo.imageLinks.thumbnail
        }
      }
    }
  }
}
</script>
