import React from 'react'
import useUrunDetay from '../../hook/useUrunDetay'
import UrunForm from './UrunForm'



export default function UrunGuncellemeFormu({match, history}){
  const {
    isLoading,
    error,
    data,
    } = useUrunDetay(Number(match.params.id))


  if(!data) return null

  return(
    <UrunForm
      history={history}
      isLoading={isLoading}
      error={error}
      seciliUrun={data}
    />
  )


}