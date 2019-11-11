import axios from 'axios'

export async function googleBooksApi(keyword: string): Promise<any> {
  const res = await axios.get(
    'https://www.googleapis.com/books/v1/volumes?q=' +
      keyword +
      '&maxResults=40'
  )
  return res
}
