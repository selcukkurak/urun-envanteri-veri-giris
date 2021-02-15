import React from 'react'
import { useRecoilValue } from 'recoil'
import { bultenlerState } from '../store'
import Liste from './Liste'


function BultenListe() {
  const bultenler = useRecoilValue(bultenlerState)

  return(
    <Liste
      title={"Haber Bültenleri"}
      butonText={"Yeni Haber Bülteni Ekle"}
      dizi={bultenler}
      path={"bultenler"}
    />
  )
}

export default React.memo(BultenListe)