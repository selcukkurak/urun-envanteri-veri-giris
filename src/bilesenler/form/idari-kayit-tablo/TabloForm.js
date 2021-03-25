import React from 'react'
import styled from 'styled-components'
import { Form, Formik } from 'formik'
import { Container, Row, Col } from 'react-grid-system'
import { Button, FormGroup, InputGroup } from '@blueprintjs/core'
import KolonBilgileriForm from './KolonBilgileriForm'

const Wrapper = styled.div`
  padding: 70px 0;
`
const Satir = styled(Row)`
  padding: 4px 8px;
`
const FonksiyonelButonAlani = styled(Row)`
  bottom: 5%;
  right: 0;
  width: 100%;
  position: fixed;
`
export default function TabloForm ({ history }) {

  const initialValues = {
    adi: '',
    aciklama: '',
    viewAdi: '',
    kolonBilgileri: [
      {
        id: 0,
        adi: '',
        aciklama: '',
        viewKolonAdi: '',
        pkKontrol: false,
        iliskiTabloKolonAdi: ''
      }
    ]
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
          handleChange,
          handleSubmit,
          setFieldValue,
          dirty,
          resetForm
        }) => (
          <Form onSubmit={handleSubmit}>
            <Container>
              <Satir>
                <Col sm={10} md={10} lg={10}/>
                <Col>
                  {dirty && (
                    <Button fill minimal intent={'danger'} text={'İçeriği Temizle'} rightIcon="cross"
                            onClick={resetForm}/>
                  )}
                </Col>
              </Satir>
              <Satir>
                <Col sm={6} md={6} lg={6}>
                  <FormGroup label={'Tablo Adı:'} labelFor="adi">
                    <InputGroup name="adi" id="adi" value={values.adi} onChange={handleChange}/>
                  </FormGroup>
                </Col>
                <Col sm={6} md={6} lg={6}>
                  <FormGroup label={'Tablo Açıklaması:'} labelFor="aciklama">
                    <InputGroup name="aciklama" id="aciklama" value={values.aciklama} onChange={handleChange}/>
                  </FormGroup>
                </Col>
              </Satir>
              <Satir>
                <Col sm={6} md={6} lg={6}>
                  <FormGroup label={'Tablo View Adı:'} labelFor="viewAdi">
                    <InputGroup name="viewAdi" id="viewAdi" value={values.viewAdi} onChange={handleChange}/>
                  </FormGroup>
                </Col>
              </Satir>
              <Satir/>
              <Satir/>
              <Satir>
                <Col>
                  <KolonBilgileriForm
                    kolonBilgileri={values.kolonBilgileri}
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                    seciliTabloAdi={values.adi}
                  />
                </Col>
              </Satir>
              <FonksiyonelButonAlani>
                <Col sm={8} md={8} lg={8}/>
                <Col>
                  <Button fill intent='danger' text={'Geri Dön'} onClick={history.goBack}/>
                </Col>
                <Col>
                  <Button fill intent='success' text={'Kaydet'}/>
                </Col>
              </FonksiyonelButonAlani>
            </Container>
          </Form>
        )}
      </Formik>
    </Wrapper>
  )
}