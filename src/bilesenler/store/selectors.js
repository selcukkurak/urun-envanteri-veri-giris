import { selector } from 'recoil'
import { referanslarState } from './index'
import { localSort } from '../util/sort'

export const siraliKurumlar = selector({
  key: 'siraliKurumlar',
  get: ({ get }) => {
    const kurumlar = get(referanslarState).KAYNAK_KURUM || []

    return localSort(kurumlar, 'adi')
  }
})