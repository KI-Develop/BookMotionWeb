<template>
  <BookInput ok-emit-name="manualInputOk" @manualInputOk="ok" />
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import * as firebase from 'firebase/app'
import BookInput from '~/components/molecules/BookInput.vue'
import { AddTsundokuData, AddWishlistData } from '~/types/book'
import { addTsundoku, addWishlist } from '~/api/index'

@Component({
  components: {
    BookInput
  }
})
export default class ManualInput extends Vue {
  ok(bookData: any) {
    if (bookData.bookStatus === 'tsundoku') {
      const addTsundokuData: AddTsundokuData = {
        userId: this.$store.state.auth.uid,
        bookStatus: bookData.bookStatus,
        bookType: 'book',
        readingStartDate: bookData.readingStartDate,
        readingEndExpectedDate: bookData.readingEndDate,
        currentPageCount: bookData.currentPageCount,
        items: {
          title: bookData.title,
          authors: [bookData.author],
          description: bookData.desc,
          bookImage: '',
          publishedDate: '',
          publisher: bookData.publisher,
          totalPageCount: bookData.totalPageCount
        },
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      }
      addTsundoku(addTsundokuData)
        .then(res => {
          // this.success('tsundoku')
        })
        .catch(err => {
          console.log(err)
          // this.error()
        })
    }
    if (bookData.bookStatus === 'wishlist') {
      const addWishlistData: AddWishlistData = {
        userId: this.$store.state.auth.uid,
        bookStatus: bookData.bookStatus,
        bookType: 'book',
        items: {
          title: bookData.title,
          authors: [bookData.author],
          description: bookData.desc,
          bookImage: '',
          publishedDate: '',
          publisher: bookData.publisher
        },
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      }
      addWishlist(addWishlistData)
        .then(res => {
          // this.success('tsundoku')
        })
        .catch(err => {
          console.log(err)
          // this.error()
        })
    }
  }
}
</script>
