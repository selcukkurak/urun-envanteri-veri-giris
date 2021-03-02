import React from 'react'
import { InputGroup } from '@blueprintjs/core'

export default function Arama({aranan, setAranan, placeholder}){

  const onAramaChange = (event) => {
    setAranan(event.target.value)
  }

  return(
    <InputGroup
      placeholder={placeholder}
      value={aranan}
      onChange={(event) => onAramaChange(event)}
      leftIcon={"search"}
    />
  )
}