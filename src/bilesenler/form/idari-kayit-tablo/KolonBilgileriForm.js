import React from 'react'
import { Button, Colors, HTMLTable, InputGroup } from '@blueprintjs/core'
import styled from 'styled-components'
import SelectField from '../SelectField'
import {Field} from 'formik'

const Baslik = styled.div`
  padding: 16px 16px;
  font-size: 1.1em;
  font-weight: 600;
  background-color: ${Colors.ORANGE5};
`
const Table = styled(HTMLTable)`
  width: 100%;
  padding: 0;
  margin: 0;
  background-color: whitesmoke;
  height: 10vh;
  max-height: 40vh;
  overflow-y: auto;
`

const pkDurum = [
  {
    label: 'Primary Key', value: 0,
  },
  {
    label: 'Foreign Key', value: 1,
  }
]
export default function KolonBilgileriForm ({ handleChange, setFieldValue, kolonBilgileri, seciliTabloAdi }) {
  const handleNewKolon = () => {
    const yeniKolon = {
      id: kolonBilgileri.length,
      adi: '',
      aciklama: '',
      viewAdi: '',
      pkKontrol: false,
      iliskiTabloKolonAdi: ''
    }
    setFieldValue(`kolonBilgileri`, [...kolonBilgileri, yeniKolon])
  }

  const handleRemoveTabloKolonu = (key) => {
    const yeniKolon = kolonBilgileri.filter((item, index) => index !== key)
    setFieldValue(`kolonBilgileri`, yeniKolon)
  }
  return (
    <div>
      <Baslik>{seciliTabloAdi.toUpperCase()} Tablosu Kolon Bilgileri</Baslik>
      <Table striped boy={kolonBilgileri.length}>
        <thead>
        <tr>
          <th><Button icon={'plus'} onClick={() => handleNewKolon()}/></th>
          <th>Kolon Adı</th>
          <th>Kolon Açıklaması</th>
          <th>View Kolon Adı</th>
          <th>Pk mı FK mı?</th>
          <th>İlişkili Tablo Kolon Adı</th>
        </tr>
        </thead>
        <tbody>
        {kolonBilgileri.map((value, index) => (
          <tr key={index}>
            <td><Button icon={'minus'} onClick={() => handleRemoveTabloKolonu(index)}/></td>
            <td><InputGroup name={`kolonBilgileri[${index}].adi`}
                            value={value.adi || ''}
                            onChange={handleChange}/></td>
            <td><InputGroup name={`kolonBilgileri[${index}].aciklama`}
                            value={value.aciklama || ''}
                            onChange={handleChange}/></td>
            <td><InputGroup name={`kolonBilgileri[${index}].viewAdi`}
                            value={value.viewAdi || ''}
                            onChange={handleChange}/></td>
            <td>
              <Field name={`kolonBilgileri[${index}].pkKontrol`} isClearable
                     value={value.pkKontrol || null} options={pkDurum}
                     component={SelectField}/>
            </td>
            <td><InputGroup
              name={`kolonBilgileri[${index}].iliskiTabloKolonAdi`}
              value={value.iliskiTabloKolonAdi || ''}
              onChange={handleChange}/></td>
          </tr>
        ))}
        </tbody>
      </Table>
    </div>

  )
}