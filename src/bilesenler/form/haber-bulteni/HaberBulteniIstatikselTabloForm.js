import React from 'react'
import { Col, Row } from 'react-grid-system'
import { Button, Card, HTMLTable, InputGroup } from '@blueprintjs/core'
import styled from 'styled-components'
import { AnaRenkler } from '@tuik/renkler'

const Kart = styled(Card)`
  padding: 0;
  margin-top: 64px;
  height: ${props => props.boy > 3 && '300px'};
  overflow-y: auto;
`
const Baslik = styled.div`
  font-weight: 600;
  color: ${AnaRenkler.kirmizi};
  font-size: 1em;
  padding: 4px 8px;
  background-color: whitesmoke;
  height: 32px;
`
export default function HaberBulteniIstatikselTabloForm ({
  handleChange,
  istatikselTablolar,
  setFieldValue,
  kategori
}) {
  if (!kategori) return null
  const handleNewTablo = () => {
    const yeniTablo = {
      id: istatikselTablolar.length,
      tabloAdi: '',
      veritabaniTabloAdi: '',
      aciklama: '',
      kategoriId: kategori.id
    }
    setFieldValue(`istatikselTablolar`, [...istatikselTablolar, yeniTablo])
  }
  console.log('kategoriler', kategori)
  const handleRemoveRow = (key) => {
    const yeniTablolar = istatikselTablolar.filter((item, index) => index !== key)
    setFieldValue('istatikselTablolar', yeniTablolar)
  }

  const filtreliTablolar = istatikselTablolar.filter(tablo => tablo.kategoriId === kategori.id)

  return (
    <Row>
      <Col>
        <Kart boy={filtreliTablolar.length}>
          <Baslik>{kategori.adi} Kategorisi Altında ki İstatiksel Tablolar</Baslik>
          <HTMLTable striped style={{ width: '100%' }}>
            <thead>
            <tr>
              <th/>
              <th><Button icon={'plus'} onClick={handleNewTablo}/></th>
              <th>Tablo Adı</th>
              <th>Veritabanı Tablo Adı</th>
              <th>Açıklama</th>
            </tr>
            </thead>
            <tbody>
            {filtreliTablolar && filtreliTablolar.map((value, index) => (
              <tr key={index}>
                <td>#{index + 1}</td>
                <td><Button icon={'minus'} onClick={() => handleRemoveRow(index)}/></td>
                <td><InputGroup name={`istatikselTablolar[${value.id}].tabloAdi`} value={value.tabloAdi || ''}
                                onChange={handleChange}/></td>
                <td><InputGroup name={`istatikselTablolar[${value.id}].veritabaniTabloAdi`}
                                value={value.veritabaniTabloAdi || ''}
                                onChange={handleChange}/></td>
                <td><InputGroup name={`istatikselTablolar[${value.id}].aciklama`} value={value.aciklama || ''}
                                onChange={handleChange}/></td>
              </tr>
            ))}
            </tbody>
          </HTMLTable>
        </Kart>
      </Col>
    </Row>
  )
}
