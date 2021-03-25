import React from 'react'
import { Col } from 'react-grid-system'
import { Button, Card, HTMLTable, InputGroup } from '@blueprintjs/core'
import styled from 'styled-components'

const Kart = styled(Card)`
  max-height: ${props => props.boy > 3 && '450px'};
  overflow-y: ${props => props.boy > 4 && 'scroll'};
`
export default function HaberBulteniTabloForm ({ tablolar, handleChange, setFieldValue }) {
  const handleAddNewRow = () => {
    const yeniTablo = {
      id: tablolar.length,
      tabloAdi: '',
      veritabaniTabloAdi: "",
      aciklama: "",
    }
    setFieldValue('tablolar', [...tablolar, yeniTablo])
  }
  const handleRemoveRow = (key) => {
    const yeniTablolar = tablolar.filter((item, index) => index !== key)
    setFieldValue('tablolar', yeniTablolar)
  }
  return (
    <Col sm={12} md={12} lg={12}>
      <Kart boy={tablolar.length}>
        <HTMLTable striped style={{ width: '100%' }}>
          <thead>
          <tr>
            <th/>
            <th><Button icon={'plus'} onClick={() => handleAddNewRow()}/></th>
            <th>Tablo Adı</th>
            <th>Veritabanı Tablo Adı</th>
            <th>Açıklama</th>
          </tr>
          </thead>
          <tbody>
          {tablolar.map((value, index) => (
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
            </tr>
          ))}
          </tbody>
        </HTMLTable>
      </Kart>
    </Col>
  )
}