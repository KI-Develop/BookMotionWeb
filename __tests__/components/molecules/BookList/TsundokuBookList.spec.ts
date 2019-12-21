import { shallowMount, createLocalVue } from '@vue/test-utils'
import iView from 'iview'
import BookList from '~/components/molecules/BookList.vue'
import { TsundokuData } from '@/types/book'
import { fromTimeStampToDate } from '~/api'

const localVue = createLocalVue()
localVue.use(iView, fromTimeStampToDate)

describe('Tsundoku BookList', () => {
  const tsundokuData: TsundokuData[] = [
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
      readingStartDate: 1575385200,
      readingEndExpectedDate: 1576249200,
      currentPageCount: 5,
      totalPageCount: 256,
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
      readingStartDate: 1575385200,
      readingEndExpectedDate: 1576249200,
      currentPageCount: 5,
      totalPageCount: 256,
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
      readingStartDate: 1575385200,
      readingEndExpectedDate: 1576249200,
      currentPageCount: 5,
      totalPageCount: 256,
      createdAt: 1574516743
    }
  ]

  test('propsを受け取れること', () => {
    const wrapper = shallowMount(BookList, {
      localVue,
      propsData: {
        items: tsundokuData,
        flag: 'tsundoku',
        loadingFlag: false
      }
    })
    expect(wrapper.props().items).toBe(tsundokuData)
    expect(wrapper.props().flag).toBe('tsundoku')
    expect(wrapper.props().loadingFlag).toBe(false)
  })

  test('editTsundokuが叩ける', () => {
    const wrapper = shallowMount(BookList, {
      localVue,
      propsData: {
        items: tsundokuData,
        flag: 'tsundoku',
        loadingFlag: false
      }
    })
    tsundokuData.map(bookData => {
      wrapper.vm.$emit('editTsundoku', bookData)
    })
    expect(wrapper.emitted('editTsundoku').length).toBe(3)
  })
})
