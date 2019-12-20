import { shallowMount, createLocalVue } from '@vue/test-utils'
import iView from 'iview'
import BookList from '~/components/molecules/BookList.vue'
import { WishlistData } from '@/types/book'
import { fromTimeStampToDate } from '~/api'

const localVue = createLocalVue()
localVue.use(iView, fromTimeStampToDate)

describe('気になる本のBookList', () => {
  const wishlistData: WishlistData[] = [
    {
      id: 'kjAPgpyBFWtQNCPXjlhV',
      title: '夜行',
      authors: ['森見登美彦'],
      description:
        '僕らは誰も彼女のことを忘れられなかった。 私たち六人は、京都で学生時代を過ごした仲間だった。十年前、鞍馬の火祭りを訪れた私たちの前から、長谷川さんは突然姿を消した。十年ぶりに鞍馬に集まったのは、おそらく皆、もう一度彼女に会いたかったからだ。夜が更けるなか、それぞれが旅先で出会った不思議な体験を語り出す。私たちは全員、岸田道生という画家が描いた「夜行」という絵と出会っていた。 旅の夜の怪談に、青春小説、ファンタジーの要素を織り込んだ最高傑作！ 「夜はどこにでも通じているの。世界はつねに夜なのよ」',
      bookImage:
        'http://books.google.com/books/content?id=noA4DQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      publishedDate: '2016-10-30',
      publisher: '小学館',
      createdAt: 1574516743
    },
    {
      id: 'kjAPgpyBFWtQNCPXjlhV',
      title: '夜行',
      authors: ['森見登美彦'],
      description:
        '僕らは誰も彼女のことを忘れられなかった。 私たち六人は、京都で学生時代を過ごした仲間だった。十年前、鞍馬の火祭りを訪れた私たちの前から、長谷川さんは突然姿を消した。十年ぶりに鞍馬に集まったのは、おそらく皆、もう一度彼女に会いたかったからだ。夜が更けるなか、それぞれが旅先で出会った不思議な体験を語り出す。私たちは全員、岸田道生という画家が描いた「夜行」という絵と出会っていた。 旅の夜の怪談に、青春小説、ファンタジーの要素を織り込んだ最高傑作！ 「夜はどこにでも通じているの。世界はつねに夜なのよ」',
      bookImage:
        'http://books.google.com/books/content?id=noA4DQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      publishedDate: '2016-10-30',
      publisher: '小学館',
      createdAt: 1574516743
    },
    {
      id: 'kjAPgpyBFWtQNCPXjlhV',
      title: '夜行',
      authors: ['森見登美彦'],
      description:
        '僕らは誰も彼女のことを忘れられなかった。 私たち六人は、京都で学生時代を過ごした仲間だった。十年前、鞍馬の火祭りを訪れた私たちの前から、長谷川さんは突然姿を消した。十年ぶりに鞍馬に集まったのは、おそらく皆、もう一度彼女に会いたかったからだ。夜が更けるなか、それぞれが旅先で出会った不思議な体験を語り出す。私たちは全員、岸田道生という画家が描いた「夜行」という絵と出会っていた。 旅の夜の怪談に、青春小説、ファンタジーの要素を織り込んだ最高傑作！ 「夜はどこにでも通じているの。世界はつねに夜なのよ」',
      bookImage:
        'http://books.google.com/books/content?id=noA4DQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      publishedDate: '2016-10-30',
      publisher: '小学館',
      createdAt: 1574516743
    }
  ]

  test('propsを受け取れること', () => {
    const wrapper = shallowMount(BookList, {
      localVue,
      propsData: {
        items: wishlistData,
        flag: 'wishlist',
        loadingFlag: false
      }
    })
    expect(wrapper.props().items).toBe(wishlistData)
    expect(wrapper.props().flag).toBe('wishlist')
    expect(wrapper.props().loadingFlag).toBe(false)
  })

  test('addTsundokuが叩ける', () => {
    const wrapper = shallowMount(BookList, {
      localVue,
      propsData: {
        items: wishlistData,
        flag: 'wishlist',
        loadingFlag: false
      }
    })
    wishlistData.map(bookData => {
      wrapper.vm.$emit('addTsundoku', bookData)
    })

    expect(wrapper.emitted().addTsundoku.length).toBe(3)
  })

  test('removeWishlistが叩ける', () => {
    const wrapper = shallowMount(BookList, {
      localVue,
      propsData: {
        items: wishlistData,
        flag: 'wishlist',
        loadingFlag: false
      }
    })
    wishlistData.map(bookData => {
      wrapper.vm.$emit('removeWishlist', bookData)
    })

    expect(wrapper.emitted().removeWishlist.length).toBe(3)
  })
})
