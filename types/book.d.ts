interface BookData {
  title?: string
  authors?: Array<string>
  description?: string
  bookImage?: string
  publishedDate?: string
  publisher?: string
}

interface AddBookData {
  userId: string
  bookStatus: string
  bookType: string
  createdAt: any
}

export interface TsundokuData extends BookData {
  id?: number
  readingStartDate?: string
  readingEndDate?: string
  readingEndExpectedDate?: string
  achievementRate?: number
  currentPageCount?: number
  totalPageCount?: number
}
export interface WishlistData extends BookData {
  createdAt?: Date
}

export interface SearchData extends BookData {}

export interface AddWishlistData extends AddBookData {
  items: SearchData
}
