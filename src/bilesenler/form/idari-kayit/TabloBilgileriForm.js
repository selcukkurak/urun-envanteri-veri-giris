import React, { useState } from 'react'
import styled from 'styled-components'
import TabloFormDialog from './TabloFormDialog'
import { Container, Row, Col } from 'react-grid-system'
import { Button, Card, Colors, HTMLTable, Icon } from '@blueprintjs/core'
import TabloGuncellemeFormDialog from './TabloGuncellemeFormDialog'
import KolonBilgileriForm from './KolonBilgileriForm'
import { Formik } from 'formik'
import KolonBilgileriDrawer from '../../detaylar/KolonBilgileriDrawer'

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

const AktifSatir = styled.tr`
  &.active {
    background-color: ${props => props.seciliTabloId === props.id ? Colors.LIGHT_GRAY5 : "white"};
  }
`
export default function TabloBilgileriForm ({ seciliKayit }) {
  const [seciliTablo, setSeciliTablo] = useState(null)
  const [kolonAlani, setKolonAlani] = useState(false)
  const handleSecimTablo = (tablo) => {
    setSeciliTablo(tablo)
  }

  const kolonAlaniAc = () => {
    if(seciliTablo)
      setKolonAlani(true)
    else
      setKolonAlani(false)
  }
  const initialValues = {
    tablolar:seciliKayit ? seciliKayit.data : []
  }
  const tabloSil = (values,setFieldValue ,id) => {
    const yeniTablolar = values.tablolar.filter(tablo => id !== tablo.id)
    setFieldValue('tablolar', [...yeniTablolar])
  }
  const handleSubmit = (event) => {
    event.preventDefault()
  }
  console.log("seciliTablo", seciliTablo)
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
                    <HTMLTable width={'100%'}>
                      <thead>
                      <tr>
                        <th>Adı</th>
                        <th>Açıklama</th>
                        <EylemBaslik>Eylemler</EylemBaslik>
                      </tr>
                      </thead>
                      <tbody>
                      {values.tablolar.map(tablo => (
                        <AktifSatir key={tablo.id} id={tablo.id} seciliTabloId={seciliTablo && seciliTablo.id} onClick={() => handleSecimTablo(tablo)} className={"active"}>
                          <KolonBilgileriDrawer tablo={tablo}/>
                          <td width={'40%'}>{tablo.aciklama}</td>
                          <EylemDetay>
                            <Button minimal rightIcon={'plus'} intent={'primary'} text="Kolon Bilgileri Ekle" onClick={kolonAlaniAc}/>
                            <TabloGuncellemeFormDialog
                              tablo={tablo}
                              handleChange={handleChange}
                            />
                            <Button minimal rightIcon={'trash'} intent={'danger'} text="Sil"
                                    onClick={() => tabloSil( values, setFieldValue,tablo.id)}/>
                          </EylemDetay>
                        </AktifSatir>
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
            <Row>
              <Col>
                {kolonAlani && (
                  <KolonBilgileriForm
                    setFieldValue={setFieldValue}
                    handleChange={handleChange}
                    tablo={seciliTablo}
                  />
                )}

              </Col>
            </Row>
          </Container>
        )}

      </Formik>

    </Wrapper>
  )
}