import React from 'react'
import { Button, Card, Colors, HTMLTable, InputGroup } from '@blueprintjs/core'
import styled from 'styled-components'
import SelectField from '../SelectField'
import {Field} from 'formik'

const Baslik = styled.div`
  padding: 16px 16px;
  font-size: 1.1em;
  font-weight: 600;
  background-color: ${Colors.GRAY5};
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

const Kart = styled(Card)`
  padding: 0;
  margin-top: 32px;
`
const KartGovde = styled.div`
  height: ${props => props.boy > 3  ?  "300px" : "300px"};
  overflow-y: auto;
`
const TableHeader = styled.th`
  position: sticky;
  background-color: white;
  top: 0;
  box-shadow: 0 1px 1px -1px rgba(0, 0, 0, 0.4);
`
const pkDurum = [
  {
    label: 'Primary Key', value: 0,
  },
  {
    label: 'Foreign Key', value: 1,
  }
]
export default function KolonBilgileriForm ({ handleChange, setFieldValue, tablo, kolonBilgileri }) {
  if(!tablo) return null
  const handleNewKolon = () => {
    const yeniKolon = {
      tabloId:tablo.id,
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
    <Kart>
      <Baslik>Kolon Bilgileri</Baslik>
      <KartGovde boy={kolonBilgileri.length}>
        <Table striped>
          <thead>
          <tr>
            <TableHeader><Button icon={'plus'} onClick={() => handleNewKolon()}/></TableHeader>
            <TableHeader>Kolon Adı</TableHeader>
            <TableHeader>Kolon Açıklaması</TableHeader>
            <TableHeader>View Kolon Adı</TableHeader>
            <TableHeader>Pk mı FK mı?</TableHeader>
            <TableHeader>İlişkili Tablo Kolon Adı</TableHeader>
          </tr>
          </thead>
          <tbody>
          {kolonBilgileri && kolonBilgileri.map((value, index) => (
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
      </KartGovde>
    </Kart>

  )
}