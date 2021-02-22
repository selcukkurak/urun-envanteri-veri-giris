import React from 'react'
import { useRecoilValue } from 'recoil'
import { idariKayitlarState } from '../store'
import Liste from './Liste'
import { localSort } from '../util/sort'
import {uniqBy} from 'lodash'

export default function IdariKayitListe({match}){
  const idariKayitlar = uniqBy(localSort(useRecoilValue(idariKayitlarState), 'adi'), 'adi')
  return(
    <Liste
      title={"İdari Kayitlar"}
      butonText={"Yeni İdari Kayit Ekle"}
      dizi={idariKayitlar}
      url={match.url}
      path={`${match.url}/yeni-idariKayit`}
    />
  )
}
