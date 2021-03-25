import React from 'react'
import { Col } from 'react-grid-system'
import { Button, Card, HTMLTable, InputGroup } from '@blueprintjs/core'
import styled from 'styled-components'
import { Field } from 'formik'
import SelectField from '../SelectField'

const Kart = styled(Card)`
  max-height: ${props => props.boy > 3 && '450px'};
  overflow-y: ${props => props.boy > 4 && 'scroll'};
`
export default function HaberBulteniIstatistikiTabloForm ({ istatistikiTablolar, handleChange, setFieldValue }) {
  const handleAddNewTablo = () => {
    const yeniTablo = {
      id: istatistikiTablolar.length,
      tabloAdi: '',
      veritabaniTabloAdi: "",
      aciklama: "",
      kategori: null
    }
    setFieldValue('istatistikiTablolar', [...istatistikiTablolar, yeniTablo])
  }
  const handleRemoveRow = (key) => {
    const yeniTablolar = istatistikiTablolar.filter((item, index) => index !== key)
    setFieldValue('istatistikiTablolar', yeniTablolar)
  }
  return (
    <Col sm={12} md={12} lg={12}>
      <Kart boy={istatistikiTablolar.length}>
        <HTMLTable striped style={{ width: '100%' }}>
          <thead>
          <tr>
            <th/>
            <th><Button icon={'plus'} onClick={() => handleAddNewTablo()}/></th>
            <th>Tablo Adı</th>
            <th>Veritabanı Tablo Adı</th>
            <th>Açıklama</th>
            <th>Kategori</th>
          </tr>
          </thead>
          <tbody>
          {istatistikiTablolar.map((value, index) => (
            <tr key={index}>
              <td>#{index + 1}</td>
              <td><Button icon={'minus'} onClick={() => handleRemoveRow(index)}/></td>
              <td><InputGroup large name={`tablolar[${index}].tabloAdi`} value={value.tabloAdi || ''}
                              onChange={handleChange}/></td>
              <td><InputGroup large name={`tablolar[${index}].veritabaniTabloAdi`}
                              value={value.veritabaniTabloAdi || ''}
                              onChange={handleChange}/></td>
              <td><InputGroup large name={`tablolar[${index}].aciklama`} value={value.aciklama || ''}
                              onChange={handleChange}/></td>
              <td><Field name={`paylasimlar[${index}].kategori`} isClearable value={value.kategori || null}
                         component={SelectField}/></td>
            </tr>
          ))}
          </tbody>
        </HTMLTable>
      </Kart>
    </Col>
  )
}