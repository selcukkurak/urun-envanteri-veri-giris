import React, { useState } from 'react'
import styled from 'styled-components'
import TabloFormDialog from './TabloFormDialog'
import { Container, Row, Col } from 'react-grid-system'
import { Button, Card, HTMLTable, Icon } from '@blueprintjs/core'
import TabloGuncellemeFormDialog from './TabloGuncellemeFormDialog'
import KolonBilgileriForm from './KolonBilgileriForm'
import { Formik } from 'formik'

const Wrapper = styled.div`
  margin-top: 16px
`
const Kart = styled(Card)`
  padding: 0;
  height: ${props => props.boyut > 3 ? '400px' : '200px'};
  overflow-y: auto;
`
const BilgiMesaji = styled.div`
  font-weight: 600;
  font-size: 1em;
  padding-top:16px ;
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
export default function TabloBilgileriForm ({ seciliKayit }) {
  const [seciliTablo, setSeciliTablo] = useState(false)

  const handleSecimTablo = (tablo) => {
    setSeciliTablo(tablo)
  }

  const initialValues = {
    tablolar:seciliKayit ? seciliKayit.tablolar : [],
    kolonBilgileri:[]
  }
  const tabloSil = (values,setFieldValue ,id) => {
    const yeniTablolar = values.tablolar.filter(tablo => id !== tablo.id)
    setFieldValue('tablolar', [...yeniTablolar])
  }
  const handleSubmit = (event) => {
    event.preventDefault()
  }
  return (
    <Wrapper>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({
          values,
          setFieldValue,
          handleChange
        }) => (
          <Container fluid>
            <Row>
              <Col sm={12} md={12} lg={12}>
                <div style={{ display: 'flex' }}>
                  <div style={{ flex: 1 }}/>
                  <TabloFormDialog
                    seciliKayit={seciliKayit}
                    tablolar={values.tablolar}
                    setFieldValue={setFieldValue}
                    handleChange={handleChange}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={12} lg={12}>
                <Kart boyut={values.tablolar && values.tablolar.length}>
                  {values.tablolar && values.tablolar.length !== 0 ? (
                    <HTMLTable striped style={{ width: '100%' }}>
                      <thead>
                      <tr>
                        <th style={{ width: '30%' }}>Adı</th>
                        <th style={{ width: '40%' }}>Açıklama</th>
                        <EylemBaslik>Eylemler</EylemBaslik>
                      </tr>
                      </thead>
                      <tbody>
                      {values.tablolar.map(tablo => (
                        <tr key={tablo.id}>
                          <td style={{ width: '30%' }}>{tablo.adi}</td>
                          <td style={{ width: '40%' }}>{tablo.aciklama}</td>
                          <EylemDetay>
                            <Button minimal rightIcon={'plus'} intent={'primary'} text="Kolon Bilgileri Ekle"
                                    onClick={() => handleSecimTablo(tablo)}/>
                            <TabloGuncellemeFormDialog
                              tablo={tablo}
                              handleChange={handleChange}
                            />
                            <Button minimal rightIcon={'trash'} intent={'danger'} text="Sil"
                                    onClick={() => tabloSil( values, setFieldValue,tablo.id)}/>
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
                      <BilgiMesaji>Bu İdari Kayıta Ait Tablo Yok</BilgiMesaji>
                    </div>
                  )}
                </Kart>
              </Col>
            </Row>
            {console.log("kolonBilgileri" , values)}
            <Row>
              <Col>
                <KolonBilgileriForm
                  setFieldValue={setFieldValue}
                  handleChange={handleChange}
                  tablo={seciliTablo}
                  kolonBilgileri={values.kolonBilgileri}
                />
              </Col>
            </Row>


          </Container>
        )}

      </Formik>

    </Wrapper>
  )
}