interface BookData {
  id?: string
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
  readingStartDate?: string
  readingEndDate?: string
  readingEndExpectedDate?: string
  currentPageCount?: number
  totalPageCount?: number
}
export interface WishlistData extends BookData {
  createdAt?: Date
}

export interface SearchData extends BookData {
  totalPageCount?: number
}

export interface AddWishlistData extends AddBookData {
  items: SearchData
}

export interface AddTsundokuData extends AddBookData {
  readingStartDate: string
  readingEndExpectedDate: string
  currentPageCount: number
  items: SearchData
}
