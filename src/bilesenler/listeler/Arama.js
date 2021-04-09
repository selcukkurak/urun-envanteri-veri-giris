import React, { useRef, useState } from 'react'
import { Button, ButtonGroup, InputGroup } from '@blueprintjs/core'
import _ from 'lodash'
import TemizleButon from '../TemizleButon'
import { taslakDurumlar } from './ortak'
import useYanMenu from '../yan-menu/useYanMenu'


export default function Arama ({  setAranan, placeholder, secili, setSecili, setSeciliId }) {
  const {boy} = useYanMenu()
  const [sorgu, setSorgu] = useState('')
  const sorgulama = _.debounce(args => setAranan(args), 1000)
  const debouncedSave = useRef(sorgulama)
    .current

  const onAramaChange = (event) => {
    const value = event.target.value
    setSorgu(value)
    debouncedSave(value)
  }
  const handleSeciliTaslak = (event, secenek) => {
    setSecili(secenek)
    setSeciliId(0)
  }
  return (
    <div>
      {boy <850 && (
        <ButtonGroup style={{marginBottom:"16px"}}>
          {taslakDurumlar.map((taslak, index) => (
            <Button key={index} intent={'primary'}
                    minimal={secili.durum !== taslak.durum}
                    text={taslak.adi}
                    onClick={(event) => handleSeciliTaslak(event, taslak)}/>
          ))}
        </ButtonGroup>
      )}
      <InputGroup
        placeholder={placeholder}
        value={sorgu}
        onChange={(event) => onAramaChange(event)}
        leftIcon={'search'}
        rightElement={secili && (
          <div>
            {boy > 850 && (
              <ButtonGroup style={{marginRight:"16px"}}>
                {taslakDurumlar.map((taslak, index) => (
                  <Button key={index} intent={'primary'}
                          minimal={secili.durum !== taslak.durum}
                          text={taslak.adi}
                          onClick={(event) => handleSeciliTaslak(event, taslak)}/>
                ))}
              </ButtonGroup>
            )}
            {sorgu && (
              <TemizleButon setSorgu={setSorgu} setAranan={setAranan}/>
            )}
          </div>
        )}
      />
    </div>

  )
}