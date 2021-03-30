import React, { useState } from 'react'
import styled from 'styled-components'
import TabloFormDialog from './TabloFormDialog'
import { Container, Row, Col } from 'react-grid-system'
import { Button, Card, HTMLTable, Icon } from '@blueprintjs/core'
import TabloGuncellemeFormDialog from './TabloGuncellemeFormDialog'
import KolonBilgileriForm from '../idari-kayit-tablo/KolonBilgileriForm'

const Wrapper = styled.div`
  margin-top: 16px
`
const Kart = styled(Card)`
  padding: 0;
  height: ${props => props.boyut > 3 ? '400px' : '200px'};
  overflow-y: auto;
`

const EylemBaslik = styled.th`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-right: 30px;
`
const EylemDetay = styled.td`
  display: flex;
  justify-content: space-around;
  align-items: center;
`
export default function TabloBilgileriForm ({ tablolar, handleChange, setFieldValue }) {
  const [seciliTablo, setSeciliTablo] = useState(false)

  const handleSecimTablo = (tablo) => {
    setSeciliTablo(tablo)
  }
  const tabloSil = (id) => {
    const yeniTablolar = tablolar.filter(tablo => id !== tablo.id)
    setFieldValue('tablolar', [...yeniTablolar])
  }
  return (
    <Wrapper>
      <Container fluid>
        <Row>
          <Col sm={12} md={12} lg={7}>
            <div style={{ display: 'flex' }}>
              <div style={{ flex: 1 }}/>
              <TabloFormDialog
                tablolar={tablolar}
                setFieldValue={setFieldValue}
                handleChange={handleChange}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={12} lg={7}>
            <Kart boyut={tablolar && tablolar.length}>
              {tablolar && tablolar.length !== 0 ? (
                <HTMLTable striped style={{ width: '100%' }}>
                  <thead>
                  <tr>
                    <th>Adı</th>
                    <th>Açıklama</th>
                    <EylemBaslik>Eylemler</EylemBaslik>
                  </tr>
                  </thead>
                  <tbody>
                  {tablolar.map(tablo => (
                    <tr key={tablo.id}>
                      <td>{tablo.adi}</td>
                      <td>{tablo.aciklama}</td>
                      <EylemDetay>
                        <Button minimal rightIcon={'plus'} intent={'primary'} text="Kolon Bilgileri Ekle"
                                onClick={() => handleSecimTablo(tablo)}/>
                        <TabloGuncellemeFormDialog
                          tablo={tablo}
                          handleChange={handleChange}
                        />
                        <Button minimal rightIcon={'trash'} intent={'danger'} text="Sil"
                                onClick={() => tabloSil(tablo.id)}/>
                      </EylemDetay>
                    </tr>
                  ))}
                  </tbody>
                </HTMLTable>
              ) : (
                <div style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '64px',
                  justifyContent: 'center'
                }}>
                  <Icon icon='info-sign' iconSize={30}/>
                  Bu İdari Kayıta Ait Tablo Yok
                </div>
              )}
            </Kart>
          </Col>
        </Row>
          <Row>
            <Col>
              <KolonBilgileriForm
                setFieldValue={setFieldValue}
                handleChange={handleChange}
                tablo={seciliTablo}
                tablolar={tablolar}
              />
            </Col>
          </Row>


      </Container>
    </Wrapper>
  )
}