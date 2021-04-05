import React, { useState } from 'react'
import { Col, Container, Row } from 'react-grid-system'
import { Button, Card, HTMLTable } from '@blueprintjs/core'
import styled from 'styled-components'
import HaberBulteniIstatikselTabloForm from './HaberBulteniIstatikselTabloForm'
import {AnaRenkler} from '@tuik/renkler'
import KategoriDialog from './KategoriDialog'

const Kart = styled(Card)`
  max-height: 300px;
  padding: 0;
  overflow-y: auto;
  margin-top: 8px;
  
  &:last-child {
    padding-bottom: 8px;
  }
`

const Baslik = styled.div`
  font-weight: 600;
  font-size: 1.1em;
  color: ${AnaRenkler.kirmizi};
  flex: 1;
`
const EylemBaslik = styled.th`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-right: 50px;
`
const EylemDetay = styled.td`
  display: flex;
  justify-content: space-around;
  align-items: center;
`


export default function HaberBulteniKategoriForm ({ kategoriler, handleChange, setFieldValue, istatikselTablolar, seciliBulten }) {
  const [seciliKategori, setSeciliKategori] = useState(null)

  const handleRemoveKategori = (key) => {
    const yeniKategori = kategoriler.filter((kategori, index) => index !== key)

    setFieldValue('kategoriler' , yeniKategori)
    setSeciliKategori(null)
  }

  const seciliItem = (item) => {
    setSeciliKategori(item)
  }
  return (
    <Row>
      <Col sm={12} md={12} lg={6}>
        <div style={{display: 'flex', marginTop:"32px"}}>
          <Baslik>Kategoriler</Baslik>
          <KategoriDialog
            kategoriler={kategoriler}
            setFieldValue={setFieldValue}
            handleChange={handleChange}
            seciliBulten={seciliBulten}
          />
        </div>
        <Kart>
          <Container>
            <Row>
              <Col>
                <HTMLTable striped style={{width:"100%"}}>
                  <thead>
                  <tr>
                    <th style={{width:"50%"}}>Adı</th>
                    <EylemBaslik>Eylemler</EylemBaslik>
                  </tr>
                  </thead>
                  <tbody>
                  {kategoriler.length !== 0 && kategoriler.map((kategori, index) => (
                    <tr key={index} onClick={() => seciliItem(kategori)} className="active">
                      <td style={{width:"50%"}}>{kategori.adi}</td>
                      <EylemDetay>
                        <Button minimal rightIcon={'edit'} intent={'primary'} text="Düzenle"/>
                        <Button minimal rightIcon={'trash'} intent={'danger'} text="Sil" onClick={() => handleRemoveKategori(index)}/>
                      </EylemDetay>
                    </tr>
                  ))
                  }
                  </tbody>
                </HTMLTable>
              </Col>
            </Row>
          </Container>
        </Kart>
      </Col>
      <Col>
        <HaberBulteniIstatikselTabloForm
          istatikselTablolar={istatikselTablolar}
          setFieldValue={setFieldValue}
          handleChange={handleChange}
          kategori={seciliKategori}
        />
      </Col>

    </Row>

  )
}