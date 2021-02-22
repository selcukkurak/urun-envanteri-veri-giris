import React from 'react'
import IdariKayitForm from './IdariKayitForm'


export default function IdariKayitEklemeFormu({history}){

  console.log(history)
  return(
    <IdariKayitForm
      history={history}
    />
  )
}