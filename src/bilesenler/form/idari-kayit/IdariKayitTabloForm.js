import React, { useState } from 'react'
import { Col, Container, Row } from 'react-grid-system'
import { Button, Card, HTMLTable, InputGroup } from '@blueprintjs/core'
import { AnaRenkler } from '@tuik/renkler'
import styled from 'styled-components'
import SelectField from '../SelectField'
import { Field } from 'formik'

const Kart = styled(Card)`
  margin: 16px;
  max-height: 35vh;
  overflow-y: ${props => props.boy > 4 && 'scroll'};

  &:last-child {
    max-height: 40vh;
  }
`
const Baslik = styled.div`
  padding: 16px 16px;
  font-size: 1.1em;
  font-weight: 600;
  color: ${AnaRenkler.kirmizi}
`
const pkDurum = [
  {
    label: 'Primary Key', value: 0,
  },
  {
    label: 'Foreign Key', value: 1,
  }
]

export default function IdariKayitTabloForm ({ tablolar, setFieldValue, handleChange, kolonBilgileri }) {
  const [seciliTablo, setSeciliTablo] = useState(null)

  const handleAddNewRow = (index) => {
    const yeniTablo = {
      id: index,
      adi: '',
      aciklama: '',
      viewAdi: '',
      kolonBilgileri: [
        {
          id: 0,
          adi: '',
          aciklama: '',
          viewAdi: '',
          pkKontrol: false,
          iliskiTabloKolonAdi: ''
        }
      ]
    }
    setFieldValue('tablolar', [...tablolar, yeniTablo])
  }
  console.log('tablolar', tablolar)
  const handleNewKolon = (id) => {
    const yeniKolon = {
      id: tablolar[id].kolonBilgileri.length,
      adi: '',
      aciklama: '',
      viewAdi: '',
      pkKontrol: false,
      iliskiTabloKolonAdi: ''
    }
    setFieldValue(`tablolar[${id}].kolonBilgileri`, [...tablolar[id].kolonBilgileri, yeniKolon])
  }

  const handleRemoveTabloKolonu = (key, id) => {
    const yeniKolon = kolonBilgileri[id].filter((item, index) => index !== key)
    setFieldValue(`tablolar[${id}].kolonBilgileri`, yeniKolon)
  }
  const handleRemoveRow = (key) => {
    const yeniTablo = tablolar.filter((item, index) => index !== key)
    setFieldValue('tablolar', yeniTablo)
  }

  const seciliTabloClick = (item) => {
    setSeciliTablo(item)
  }
  return (
    <div>
      <Kart boy={tablolar.length}>
        <Container fluid>
          <Row>
            <Col sm={12} md={12} lg={12}>
              <HTMLTable striped style={{ width: '100%' }}>
                <thead>
                <tr>
                  <th><Button icon={'plus'} onClick={() => handleAddNewRow(tablolar.length)}/></th>
                  <th style={{ width: '80px' }}>Sıra No</th>
                  <th>İstatistik Tablo Adı</th>
                  <th>Tablo Açıklaması</th>
                  <th>Açılan View Adı</th>
                  <th/>
                </tr>
                </thead>
                <tbody>
                {tablolar && tablolar.length !== 0 && tablolar.map((value, index) => (
                  <tr key={index}>
                    <td><Button icon={'minus'} onClick={() => handleRemoveRow(index)}/></td>
                    <td style={{ fontWeight: '600', textAlign: 'center' }}>{index + 1}</td>
                    <td><InputGroup large name={`tablolar[${index}].adi`} value={value.adi || ''}
                                    onChange={handleChange}/></td>
                    <td><InputGroup large name={`tablolar[${index}].aciklama`} value={value.aciklama || ''}
                                    onChange={handleChange}/></td>
                    <td><InputGroup large name={`tablolar[${index}].viewAdi`} value={value.viewAdi || ''}
                                    onChange={handleChange}/></td>
                    <td>
                      <Button text="Aç" intent="danger" onClick={() => seciliTabloClick(value)}/>
                    </td>
                  </tr>
                ))}
                </tbody>
              </HTMLTable>
            </Col>
          </Row>
        </Container>
      </Kart>
      {seciliTablo && kolonBilgileri.length !== 0 && (
        <Kart boy={seciliTablo && kolonBilgileri[seciliTablo.id].length}>
          <Container fluid>
            <Row>
              <Col sm={12} md={12} lg={12}>
                <Baslik>{seciliTablo.adi.toUpperCase()} Tablosu Kolon Bilgileri</Baslik>
                <HTMLTable striped style={{ width: '100%' }}>
                  <thead>
                  <tr>
                    <th><Button icon={'plus'} onClick={() => handleNewKolon(seciliTablo.id)}/></th>
                    <th style={{ width: '80px' }}>Sıra No</th>
                    <th>Kolon Adı</th>
                    <th>Kolon Açıklaması</th>
                    <th>View Kolon Adı</th>
                    <th>Pk mı FK mı?</th>
                    <th>İlişkili Tablo Kolon Adı</th>
                  </tr>
                  </thead>
                  <tbody>
                  {kolonBilgileri[seciliTablo.id].map((value, index) => (
                    <tr key={index}>
                      <td><Button icon={'minus'} onClick={() => handleRemoveTabloKolonu(index, seciliTablo.id)}/></td>
                      <td style={{ fontWeight: '600', textAlign: 'center' }}>{index + 1}</td>
                      <td><InputGroup large name={`tablolar[${seciliTablo.id}].kolonBilgileri[${index}].adi`}
                                      value={value.adi || ''}
                                      onChange={handleChange}/></td>
                      <td><InputGroup large name={`tablolar[${seciliTablo.id}].kolonBilgileri[${index}].aciklama`}
                                      value={value.aciklama || ''}
                                      onChange={handleChange}/></td>
                      <td><InputGroup large name={`tablolar[${seciliTablo.id}].kolonBilgileri[${index}].viewAdi`}
                                      value={value.viewAdi || ''}
                                      onChange={handleChange}/></td>
                      <td>
                        <Field name={`tablolar[${seciliTablo.id}].kolonBilgileri[${index}].pkKontrol`} isClearable
                               value={value.pkKontrol || null} options={pkDurum}
                               component={SelectField}/>
                      </td>
                      <td><InputGroup large
                                      name={`tablolar[${seciliTablo.id}].kolonBilgileri[${index}].iliskiTabloKolonAdi`}
                                      value={value.iliskiTabloKolonAdi || ''}
                                      onChange={handleChange}/></td>
                    </tr>
                  ))}
                  </tbody>
                </HTMLTable>
              </Col>
            </Row>
          </Container>
        </Kart>
      )}
    </div>
  )
}