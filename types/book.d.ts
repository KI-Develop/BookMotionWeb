interface BookData {
  title?: string
  authors?: Array<string>
  description?: string
  bookImage?: string
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
  id?: number
  memo?: string
  createdAt?: string
}

export interface SearchData extends BookData {
  publishedDate?: string
  selfLink?: string
}
