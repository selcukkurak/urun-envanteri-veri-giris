import React from 'react'
import { useRecoilValue } from 'recoil'
import { idariKayitlarState } from '../store'
import Liste from './Liste'
import { localSort } from '../util/sort'
import {uniqBy} from 'lodash'

function IdariKayitListe(){
  const idariKayitlar = uniqBy(localSort(useRecoilValue(idariKayitlarState), 'adi'), 'adi')
  return(
    <Liste
      title={"İdari Kayitlar"}
      butonText={"Yeni İdari Kayit Ekle"}
      dizi={idariKayitlar}
    />
  )
}

export default React.memo(IdariKayitListe)