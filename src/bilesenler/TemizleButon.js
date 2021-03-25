import React from 'react'
import { Button } from '@blueprintjs/core'


export default function TemizleButon({setSorgu, setAranan}){


  const temizle = () => {
    setSorgu("")
    setAranan("")
  }

  return(
    <Button
      minimal
      intent="danger"
      text="Temizle"
      rightIcon="cross"
      onClick={temizle}
    />
  )
}