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
    <ul>
      <li v-for="item in items" :key="item.id">
        <p>{{ item.volumeInfo.title }}</p>
        <br />
        <p>{{ item.volumeInfo.description }}</p>
        <br />
        <template v-for="author in item.volumeInfo.authors">
          <p :key="author.id">
            {{ author }}
          </p>
        </template>
        <template v-if="item.volumeInfo.imageLinks">
          <template v-if="item.volumeInfo.imageLinks.thumbnail">
            <img :src="item.volumeInfo.imageLinks.thumbnail" />
          </template>
        </template>
      </li>
    </ul>
  </div>
</template>
<script>
import axios from 'axios'
import _ from 'lodash'
export default {
  data() {
    return {
      keyword: '',
      message: '',
      select: 'book',
      items: null
    }
  },
  computed: {
    pHolder() {
      return this.select === 'book' ? 'タイトルや著者から検索する' : '論文だお'
    }
  },
  watch: {
    keyword() {
      this.message = 'waiting for you stop typing...'
      this.debouncedGetAnswer()
    }
  },
  created() {
    this.debouncedGetAnswer = _.debounce(this.getAnswer, 1000)
  },
  mounted() {
    this.$nuxt.$emit('updatePageName', [
      { name: '書籍登録', path: '' },
      { name: 'データベース検索', path: '/register/database' }
    ])
  },
  methods: {
    getAnswer() {
      if (this.keyword === '') {
        this.items = null
        this.message = ''
        return
      }

      this.message = 'Loadng...'
      const vm = this
      // const params = { q: this.keyword }
      axios
        .get(
          'https://www.googleapis.com/books/v1/volumes?q=' +
            this.keyword +
            '&maxResults=40'
        )
        .then(function(response) {
          console.log(response.data.items)
          vm.items = response.data.items
        })
        .catch(function(error) {
          vm.messae = 'Error!' + error
        })
        .finally(function() {
          vm.message = ''
        })
    }
  }
}
</script>
