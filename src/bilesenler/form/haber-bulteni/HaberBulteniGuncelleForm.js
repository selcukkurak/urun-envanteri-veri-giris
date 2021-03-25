import React from 'react'
import { useRecoilValue } from 'recoil'
import { tekilBultenler } from '../../store/selectors'
import HaberBulteniForm from './HaberBulteniForm'


export default function HaberBulteniGuncelleForm({match, history}){
  const bultenler = useRecoilValue(tekilBultenler)
  const seciliBultenId = match.params.id
  const seciliHaberBulteni = bultenler.find(bulten => bulten.id)


  console.log("bultenler" , bultenler)
  console.log("secili" , seciliHaberBulteni)
  console.log("bultenId" , seciliBultenId)
  return(
    <HaberBulteniForm
      history={history}
      seciliBulten={seciliHaberBulteni}
    />
  )
}