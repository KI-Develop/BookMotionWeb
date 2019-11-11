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
      <BookList v-if="items.length" :items="items" flag="search" />
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
import { SearchData } from '~/types/book'
import { googleBooksApi } from '~/api/index'
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
  spinShow: boolean = false
  items: SearchData[] = []

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
}
</script>

<style scoped>
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
</style>
