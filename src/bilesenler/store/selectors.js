import { selector } from 'recoil'
import { bultenlerState, referanslarState } from './index'
import { localSort } from '../util/sort'
import groupBy from 'lodash/groupBy'
import maxBy from 'lodash/maxBy'

export const siraliKurumlar = selector({
  key: 'siraliKurumlar',
  get: ({ get }) => {
    const kurumlar = get(referanslarState).KAYNAK_KURUM || []

    return localSort(kurumlar, 'adi')
  }
})
export const tekilBultenler = selector({
  key: 'tekilBultenler',
  get: ({ get }) => {
    const bultenler = get(bultenlerState)
    const gruplanmisBultenler = groupBy(bultenler, 'id')

    return Object.keys(gruplanmisBultenler)
      .map(id => maxBy(gruplanmisBultenler[id], bulten => bulten.sonYayin.id))
      .sort((a, b) => a.adi.localeCompare(b.adi))
  }
})