interface BookData {
  id?: number
  title?: string
  authors?: Array<string>
  description?: string
  bookImage?: string
}

export interface TsundokuData extends BookData {
  readingStartDate?: string
  readingEndDate?: string
  readingEndExpectedDate?: string
  achievementRate?: number
  currentPageCount?: number
  totalPageCount?: number
}
export interface WishlistData extends BookData {
  memo?: string
  createdAt?: string
}
