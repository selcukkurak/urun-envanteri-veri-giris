import React from 'react'
import { useRecoilValue } from 'recoil'
import { idariKayitlarState } from '../../store'
import IdariKayitForm from './IdariKayitForm'



export default function IdariKayitGuncellemeForm({match, history}){
  const idariKayitlar = useRecoilValue(idariKayitlarState)
  const seciliIdariKayit = idariKayitlar.find(kayit => kayit.id === match.params.id)

  return(
    <IdariKayitForm
      seciliIdariKayit={seciliIdariKayit}
      history={history}
    />
  )
}