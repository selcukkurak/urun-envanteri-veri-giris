import React from 'react'
import { useRecoilValue } from 'recoil'
import { anketlerState } from '../store'
import Liste from './Liste'
import { localSort } from '../util/sort'


function AnketListe({match}){
  const anketler = localSort(useRecoilValue(anketlerState), 'adi' )

  return(
    <Liste
      title={"Anketler"}
      butonText={"Yeni Anket Ekle"}
      dizi={anketler}
      url={match.url}
      path={match.url + "/yeni-anket"}
    />
  )
}

export default React.memo(AnketListe)