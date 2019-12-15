import { mount } from '@vue/test-utils'
import Refine from '~/components/molecules/Refine.vue'

describe('Rifine Component', () => {
  const displayCriteria: Array<string> = [
    'すべて表示',
    '論文',
    '同人誌',
    '読書終了予定日が近い順',
    '読了達成率が高い順',
    '読了達成率が低い順',
    '読書開始日が早い順'
  ]
  test('propsを受け取れること', () => {
    const wrapper = mount(Refine, {
      propsData: { displayCriteria }
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
