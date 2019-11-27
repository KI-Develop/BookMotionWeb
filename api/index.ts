import axios from 'axios'
import { AddTsundokuData, AddWishlistData } from '~/types/book'
import { db } from '~/plugins/firebase'

export async function googleBooksApi(keyword: string): Promise<any> {
  const res = await axios.get(
    'https://www.googleapis.com/books/v1/volumes?q=' +
      keyword +
      '&maxResults=40'
  )
  return res
}

export async function addTsundoku(wishlist: AddTsundokuData): Promise<any> {
  const res = await db.collection('books').add(wishlist)
  return res
}

export async function addWishlist(tsundokuData: AddWishlistData): Promise<any> {
  const res = await db.collection('books').add(tsundokuData)
  return res
}

export async function getTsundokuData(userId: string) {
  const snapShot = await db
    .collection('books')
    .where('userId', '==', userId)
    .where('bookStatus', '==', 'tsundoku')
    .get()
  return snapShot
}
