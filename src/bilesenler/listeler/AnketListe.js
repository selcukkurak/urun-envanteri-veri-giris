import React from 'react'
import { useRecoilValue } from 'recoil'
import { anketlerState } from '../store'
import Liste from './Liste'


function AnketListe(){
  const anketler = useRecoilValue(anketlerState)

  return(
    <Liste
      title={"Anketler"}
      butonText={"Yeni Anket Ekle"}
      dizi={anketler}
    />
  )
}

export default React.memo(AnketListe)