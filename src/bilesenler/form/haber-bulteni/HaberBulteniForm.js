import React from 'react'
import {  Form, Formik } from 'formik'
import {Container, Row, Col} from 'react-grid-system'
import styled from 'styled-components'
import { Button, ButtonGroup, FormGroup, InputGroup } from '@blueprintjs/core'
import useSayfaIciGecis from '../../hook/useSayfaIciGecis'
import HaberBulteniTabloForm from './HaberBulteniTabloForm'
import HaberBulteniIstatistikiTabloForm from './HaberBulteniIstatistikiTabloForm'
import { PersistFormikValues } from 'formik-persist-values'

const Wrapper = styled.div`
  padding: 70px 16px;
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
const ButonAlani = styled.div`
  margin: 4px 64px;
  display: flex;
`
const ButonGrup = styled(ButtonGroup)`
  flex: 1;
  max-width: 35vw;
  width: 35vw;
`



export default function HaberBulteniForm({history, seciliBulten}){
  const {
    bultenGenel,
    bultenTablo,
    bultenIstatistikTablo,
    genelBultenSayfaClick,
    tabloBultenSayfaClick,
    istatistikBultenSayfaClick,
  } = useSayfaIciGecis()

  const initialValues = {
    adi:seciliBulten ? seciliBulten.adi :"",
    sonYayin:seciliBulten ? seciliBulten.sonYayin : {
      id:0,
      donemi:"",
      tarihi:"",
    },
    tablolar:[],
    istatistikiTablolar:[]
  }

  const handleSubmit = (event) => {
    event.preventDefault()
  }


  return(
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
            <ButonAlani>
              <ButonGrup fill>
                <Button intent={'danger'} minimal={!bultenGenel} text={'Genel Bilgiler'} onClick={genelBultenSayfaClick}/>
                <Button intent={'danger'} minimal={!bultenTablo} text={'Tablo Bilgileri'} onClick={tabloBultenSayfaClick}/>
                <Button intent={'danger'} minimal={!bultenIstatistikTablo} text={'İstatistiki Tablo Bilgileri'} onClick={istatistikBultenSayfaClick}/>
              </ButonGrup>
            </ButonAlani>
            <Container fluid>
              {bultenGenel && (
                <div>
                  <Satir>
                    <Col sm={5.5} md={5.5} lg={5.5}>
                      <FormGroup label={'Haber Bülteni Adı:'} labelFor="adi">
                        <InputGroup  name={'adi'} id="adi" value={values.adi || ''} onChange={handleChange}/>
                      </FormGroup>
                    </Col>
                    <Col/>
                    <Col sm={5.5} md={5.5} lg={5.5}>
                      <FormGroup label={'Haber Bülteni Kodu:'} labelFor="kodu">
                        <InputGroup name={'kodu'} id="kodu" value={values.kodu || ''} onChange={handleChange}/>
                      </FormGroup>
                    </Col>
                  </Satir>
                  <Satir>
                    <Col sm={5.5} md={5.5} lg={5.5}>
                      <FormGroup label={'Haber Bülteni Son Yayın Dönemi:'} labelFor="donem">
                        <InputGroup name={'sonYayin.donemi'} id="donem" value={values.sonYayin.donemi || ''} onChange={handleChange}/>
                      </FormGroup>
                    </Col>
                  </Satir>
                </div>
              )}
              {bultenTablo && (
                <Satir>
                  <HaberBulteniTabloForm
                    tablolar={values.tablolar}
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                  />
                </Satir>
              )}
              {bultenIstatistikTablo && (
                <Satir>
                  <HaberBulteniIstatistikiTabloForm
                    istatistikiTablolar={values.istatistikiTablolar}
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                  />
                </Satir>
              )}
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
            <PersistFormikValues name="bulten-form"/>
          </Form>
        </Wrapper>
      )}
    </Formik>
  )
}