import React from 'react'
import { useRecoilValue } from 'recoil'
import { anketlerState } from '../../store'
import AnketForm from './AnketForm'


export default function AnketGuncellemeForm({match,history}){
  const anketler = useRecoilValue(anketlerState)
  const seciliAnketId = match.params.id
  const seciliAnket = anketler.find(anket => anket.id === seciliAnketId)

  return(
    <AnketForm
      seciliAnket={seciliAnket}
      history={history}
    />
  )
}