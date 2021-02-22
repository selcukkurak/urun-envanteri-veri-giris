import React from 'react'
import { useRecoilValue } from 'recoil'
import { anketlerState } from '../store'
import Liste from './Liste'
import { localSort } from '../util/sort'


function AnketListe(){
  const anketler = localSort(useRecoilValue(anketlerState), 'adi' )

  return(
    <Liste
      title={"Anketler"}
      butonText={"Yeni Anket Ekle"}
      dizi={anketler}
      path={window.location.pathname + "/yeni-anket"}
    />
  )
}

export default React.memo(AnketListe)