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
    .orderBy('createdAt', 'desc')
    .where('userId', '==', userId)
    .where('bookStatus', '==', 'tsundoku')
    .limit(10)
    .get()
  return snapShot
}

export async function getWishlistData(userId: string) {
  const snapShot = await db
    .collection('books')
    .orderBy('createdAt', 'desc')
    .where('userId', '==', userId)
    .where('bookStatus', '==', 'wishlist')
    .limit(10)
    .get()
  return snapShot
}

export async function getMoreTsundokuData(userId: string, lastDate: any) {
  const snapShot = await db
    .collection('books')
    .orderBy('createdAt', 'desc')
    .where('userId', '==', userId)
    .where('bookStatus', '==', 'tsundoku')
    .startAfter(lastDate)
    .limit(10)
    .get()
  return snapShot
}

export async function getMoreWishlistData(userId: string, lastDate: any) {
  const snapShot = await db
    .collection('books')
    .orderBy('createdAt', 'desc')
    .where('userId', '==', userId)
    .where('bookStatus', '==', 'wishlist')
    .startAfter(lastDate)
    .limit(10)
    .get()
  return snapShot
}

export function fromTimeStampToDate(date: any): string {
  const d = new Date(date.seconds * 1000)
  const year = d.getFullYear()
  const month = `0${d.getMonth() + 1}`.slice(-2)
  const day = `0${d.getDate()}`.slice(-2)
  return `${year}-${month}-${day}`
}
