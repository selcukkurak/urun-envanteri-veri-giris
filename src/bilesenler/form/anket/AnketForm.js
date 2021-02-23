import React from 'react'
import { Field, Form, Formik } from 'formik'
import { Container, Row, Col } from 'react-grid-system'
import { Button, FormGroup, InputGroup } from '@blueprintjs/core'
import styled from 'styled-components'
import { useRecoilValue } from 'recoil'
import { referanslarState } from '../../store'
import SelectField from '../SelectField'
import { durumlar } from '../../hook/ortak'

const Wrapper = styled.div`
  padding: 70px 0;
`
const Satir = styled(Row)`
  padding:4px 8px;
`
export default function AnketForm ({seciliAnket, history}) {
  const periyotlar = useRecoilValue(referanslarState).PERIYOT
  const periyotOption = periyotlar && periyotlar.length !== 0 && periyotlar.map(periyot => ({label:periyot.adi, value:periyot.id}))

  const cografiDuzeyler = useRecoilValue(referanslarState).COGRAFI_DUZEY
  const cografiDuzeyOption =cografiDuzeyler && cografiDuzeyler.length !== 0 && cografiDuzeyler.map(duzey =>({label:duzey.adi, value:duzey.id}))

  const seciliAnketPeriyot = () => {
    if (seciliAnket && seciliAnket.periyot) return {
      label: seciliAnket.periyot.adi,
      value: seciliAnket.periyot.id
    }
    else return null
  }
  const seciliAnketCografiDuzey = () => {
    if (seciliAnket && seciliAnket.cografiDuzey) return {
      label: seciliAnket.cografiDuzey.adi,
      value: seciliAnket.cografiDuzey.id
    }
    else return null
  }
  const durumBelirleme = (seciliAnket, durum, nesne1, nesne2) => {
    if(seciliAnket){
      if(durum){
        return nesne1
      }
      else return nesne2
    }
    else return nesne2
  }
  const initialValues = {
    kodu:seciliAnket ? seciliAnket.id :'',
    adi: seciliAnket ? seciliAnket.adi :'',
    periyot: seciliAnketPeriyot() || null,
    birimDuzeyi: null,
    orneklemSayisi: seciliAnket ? seciliAnket.orneklemSayisi: '',
    cografiDuzeyi: seciliAnketCografiDuzey() || null,
    sema:seciliAnket ? seciliAnket.sema :'',
    ustDurum: seciliAnket ? seciliAnket.ustDurum === 0 ? durumlar[1] : durumlar[0] : durumlar[1],
    harzemliDurum:seciliAnket ?  durumBelirleme(seciliAnket, seciliAnket.harzemliDurum, durumlar[0], durumlar[1]) : durumlar[1],
    kontrolorSayisiBolge: '',
    anketorSayisiBolge: '',
    kontrolorSayisiMerkez: '',
    anketorSayisiMerkez: '',
    cevaplayiciBirim: null,
    duzeltmeDurum: null,
  }

  const handleSubmit = (event) => {
    event.preventDefault()
  }
  return (
    <Wrapper>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({
          values,
          handleChange,
          handleSubmit,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Container fluid>
              <Satir>
                <Col sm={3} md={3} lg={3}>
                  <FormGroup label={'Anket Kodu:'}/>
                </Col>
                <Col sm={6} md={6} lg={6}>
                  <InputGroup disabled={seciliAnket} name="kodu" value={values.kodu} onChange={handleChange}/>
                </Col>
              </Satir>
              <Satir>
                <Col sm={3} md={3} lg={3}>
                  <FormGroup label={'Anket Adı:'}/>
                </Col>
                <Col sm={6} md={6} lg={6}>
                  <InputGroup name="adi" value={values.adi} onChange={handleChange}/>
                </Col>
              </Satir>
              <Satir>
                <Col sm={3} md={3} lg={3}>
                  <FormGroup label={'Periyodu:'} labelFor={"?"}/>
                </Col>
                <Col sm={6} md={6} lg={6}>
                  <Field name='periyot' isClearable value={values.periyot || null} options={periyotOption}
                         component={SelectField}/>
                </Col>
              </Satir>
              <Satir>
                <Col sm={3} md={3} lg={3}>
                  <FormGroup label={'Verinin Birim Düzeyi:'}/>
                </Col>
                <Col sm={6} md={6} lg={6}>
                  <Field name='birimDuzeyim' isClearable value={values.birimDuzeyi || null}
                         component={SelectField}/>
                </Col>
              </Satir>
              <Satir>
                <Col sm={3} md={3} lg={3}>
                  <FormGroup label={'Örneklem Boyutu:'}/>
                </Col>
                <Col sm={6} md={6} lg={6}>
                  <InputGroup name="orneklemSayisi" value={values.orneklemSayisi} onChange={handleChange}/>
                </Col>
              </Satir>
              <Satir>
                <Col sm={3} md={3} lg={3}>
                  <FormGroup label={'Coğrafi Düzeyi:'} labelFor={"?"}/>
                </Col>
                <Col sm={6} md={6} lg={6}>
                  <Field name='cografiDuzeyi' isClearable value={values.cografiDuzeyi || null} options={cografiDuzeyOption}
                         component={SelectField}/>
                </Col>
              </Satir>
              <Satir>
                <Col sm={3} md={3} lg={3}>
                  <FormGroup label={'Şeması:'}/>
                </Col>
                <Col sm={6} md={6} lg={6}>
                  <InputGroup name="sema" value={values.sema} onChange={handleChange}/>
                </Col>
              </Satir>
              <Satir>
                <Col sm={3} md={3} lg={3}>
                  <FormGroup label={'ÜST de var mı?'}/>
                </Col>
                <Col sm={6} md={6} lg={6}>
                  <Field name='ustDurum' isClearable value={values.ustDurum || null} options={durumlar}
                         component={SelectField}/>
                </Col>
              </Satir>
              <Satir>
                <Col sm={3} md={3} lg={3}>
                  <FormGroup label={'Harzemli de var mı?'}/>
                </Col>
                <Col sm={6} md={6} lg={6}>
                  <Field name='harzemliDurum' isClearable value={values.harzemliDurum || null} options={durumlar}
                         component={SelectField}/>
                </Col>
              </Satir>
              <Satir>
                <Col sm={3} md={3} lg={3}>
                  <FormGroup label={'ÇALIŞMA DA YER ALAN TOPLAM KONTROLÖR SAYISI - MERKEZ:'}/>
                </Col>
                <Col sm={6} md={6} lg={6}>
                  <InputGroup type="number" name="kontrolorSayisiMerkez" value={values.kontrolorSayisiMerkez} onChange={handleChange}/>
                </Col>
              </Satir>
              <Satir>
                <Col sm={3} md={3} lg={3}>
                  <FormGroup label={'ÇALIŞMA DA YER ALAN TOPLAM ANKETÖR SAYISI - MERKEZ:'}/>
                </Col>
                <Col sm={6} md={6} lg={6}>
                  <InputGroup type="number" name="anketorSayisiMerkez" value={values.anketorSayisiMerkez} onChange={handleChange}/>
                </Col>
              </Satir>
              <Satir>
                <Col sm={3} md={3} lg={3}>
                  <FormGroup label={'ÇALIŞMA DA YER ALAN TOPLAM KONTROLÖR SAYISI - BÖLGE:'}/>
                </Col>
                <Col sm={6} md={6} lg={6}>
                  <InputGroup type="number" name="kontrolorSayisiBolge" value={values.kontrolorSayisiBolge} onChange={handleChange}/>
                </Col>
              </Satir>
              <Satir>
                <Col sm={3} md={3} lg={3}>
                  <FormGroup label={'ÇALIŞMA DA YER ALAN TOPLAM ANKETÖR SAYISI - BÖLGE:'}/>
                </Col>
                <Col sm={6} md={6} lg={6}>
                  <InputGroup type="number" name="anketorSayisiBolge" value={values.anketorSayisiBolge} onChange={handleChange}/>
                </Col>
              </Satir>
              <Satir>
                <Col sm={3} md={3} lg={3}>
                  <FormGroup label={'Mevsimsel Düzeltme Kullanılıyor mu?'}/>
                </Col>
                <Col sm={6} md={6} lg={6}>
                  <Field name='duzeltmeDurum' isClearable value={values.duzeltmeDurum || null} options={durumlar}
                         component={SelectField}/>
                </Col>
              </Satir>
              <Satir>
                <Col sm={8} md={8} lg={8}/>
                <Col>
                  <Button fill intent='danger' text={"Geri Dön"} onClick={history.goBack}/>
                </Col>
                <Col>
                  <Button fill intent='success' text={"Kaydet"}/>
                </Col>
              </Satir>
            </Container>
          </Form>
        )}
      </Formik>
    </Wrapper>

  )
}