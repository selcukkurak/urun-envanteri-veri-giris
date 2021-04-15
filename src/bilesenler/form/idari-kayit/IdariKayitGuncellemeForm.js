import React from 'react'
import { useRecoilValue } from 'recoil'
import { idariKayitlarState } from '../../store'
import IdariKayitForm from './IdariKayitForm'
import useIdariKayitTabloBilgileri from '../../hook/useIdariKayitTabloBilgileri'



export default function IdariKayitGuncellemeForm({match, history}){
  const idariKayitlar = useRecoilValue(idariKayitlarState)
  const seciliKayit = idariKayitlar.find(kayit => kayit.id === match.params.id)
  const {data} = useIdariKayitTabloBilgileri(seciliKayit)
  const seciliIdariKayit = {
    ...seciliKayit,
    data
  }
  console.log("seciliIdariKayit", seciliIdariKayit)
  if(!seciliIdariKayit) return null
  return(
    <IdariKayitForm
      seciliIdariKayit={seciliIdariKayit}
      history={history}
    />
  )
}