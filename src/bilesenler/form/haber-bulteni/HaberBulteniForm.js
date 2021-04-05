import React from 'react'
import { Form, Formik } from 'formik'
import { Container, Row, Col } from 'react-grid-system'
import styled from 'styled-components'
import { Button, FormGroup, InputGroup } from '@blueprintjs/core'
import HaberBulteniTabloForm from './HaberBulteniTabloForm'
import HaberBulteniKategoriForm from './HaberBulteniKategoriForm'
import { PersistFormikValues } from 'formik-persist-values'
import { deleteLocalStorage } from '../ortak'

const Wrapper = styled.div`
  padding: 70px 16px;
`
const Satir = styled(Row)`
  padding: 4px 8px;
`
const FonksiyonelButonAlani = styled(Row)`
  bottom: 2%;
  right: 0;
  width: 85%;
  position: fixed;
`


export default function HaberBulteniForm ({ history, seciliBulten }) {

  const initialValues = {
    adi: seciliBulten ? seciliBulten.adi : '',
    kodu: seciliBulten ? seciliBulten.kodu : '',
    sonYayin: seciliBulten ? seciliBulten.sonYayin : {
      id: 0,
      donemi: '',
      tarihi: '',
    },
    tablolar: [],
    kategoriler: [],
    istatikselTablolar: [],
  }

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({
        values,
        handleChange,
        submitForm,
        setFieldValue
      }) => (
        <Wrapper>
          <Form onSubmit={submitForm}>
            <Container fluid>
              <Satir>
                <Col sm={3.5} md={3.5} lg={3.5}>
                  <FormGroup label={'Haber Bülteni Adı:'} labelFor="adi">
                    <InputGroup name={'adi'} id="adi" value={values.adi || ''} onChange={handleChange}/>
                  </FormGroup>
                </Col>
                <Col/>
                <Col sm={3.5} md={3.5} lg={3.5}>
                  <FormGroup label={'Haber Bülteni Kodu:'} labelFor="kodu">
                    <InputGroup name={'kodu'} id="kodu" value={values.kodu || ''} onChange={handleChange}/>
                  </FormGroup>
                </Col>
                <Col/>
                <Col sm={3.5} md={3.5} lg={3.5}>
                  <FormGroup label={'Haber Bülteni Son Yayın Dönemi:'} labelFor="donem">
                    <InputGroup name={'sonYayin.donemi'} id="donem" value={values.sonYayin.donemi || ''}
                                onChange={handleChange}/>
                  </FormGroup>
                </Col>
              </Satir>
              <Satir/>
              <Satir/>
              <Satir/>
              <Satir/>
              <HaberBulteniTabloForm
                tablolar={values.tablolar}
                handleChange={handleChange}
                setFieldValue={setFieldValue}
                seciliBulten={values.kodu}
              />
              <Satir/>
              <Satir/>
              <Satir/>
              <Satir/>
              <HaberBulteniKategoriForm
                kategoriler={values.kategoriler}
                istatikselTablolar={values.istatikselTablolar}
                handleChange={handleChange}
                setFieldValue={setFieldValue}
                seciliBulten={values.kodu}
              />
              <FonksiyonelButonAlani>
                <Col sm={4} md={4} lg={8}/>
                <Col>
                  <Button fill intent='danger' text={'Geri Dön'} onClick={() => deleteLocalStorage(history)}/>
                </Col>
                <Col>
                  <Button fill intent='success' text={'Kaydet'}/>
                </Col>
              </FonksiyonelButonAlani>
            </Container>
            <PersistFormikValues name="bulten-form" persistInvalid hashInitials/>
          </Form>
        </Wrapper>
      )}
    </Formik>
  )
}