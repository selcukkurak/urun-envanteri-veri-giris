import React from 'react'
import { Field, Form, Formik } from 'formik'
import { Container, Row, Col } from 'react-grid-system'
import { Button, FormGroup, InputGroup, Switch } from '@blueprintjs/core'
import styled from 'styled-components'
import SelectField from '../SelectField'
import useSecenekler from '../useSecenekler'

const Wrapper = styled.div`
  padding: 70px 0;
`
const Satir = styled(Row)`
  padding: 4px 8px;
`
export default function AnketForm ({ seciliAnket, history }) {

  const {
    periyotOptions,
    cografiDuzeyOptions,
    veriBirimDuzeyiOption
  } = useSecenekler();

  const seciliAnketItem = (nesne) => {
    if (seciliAnket && nesne) return {
      label: nesne.adi,
      value: nesne.id
    }
    else return null
  }

  const initialValues = {
    kodu: seciliAnket ? seciliAnket.id : '',
    adi: seciliAnket ? seciliAnket.adi : '',
    periyot:seciliAnket ? seciliAnketItem(seciliAnket.periyot) : null,
    birimDuzeyi:seciliAnket ?  seciliAnketItem(seciliAnket.birimDuzeyi) : null,
    orneklemSayisi: seciliAnket ? seciliAnket.orneklemSayisi : '',
    cografiDuzeyi:seciliAnket ? seciliAnketItem(seciliAnket.cografiDuzey) : null,
    sema: seciliAnket ? seciliAnket.sema : '',
    ustDurum: seciliAnket ? seciliAnket.ustDurum !== 0 : false,
    harzemliDurum: seciliAnket ? seciliAnket.harzemliDurum !== 0 : false,
    kontrolorSayisiBolge: seciliAnket ? seciliAnket.kontrolorSayisiBolge : '',
    anketorSayisiBolge: seciliAnket ? seciliAnket.anketorSayisiBolge : '',
    kontrolorSayisiMerkez: seciliAnket ? seciliAnket.kontrolorSayisiMerkez : '',
    anketorSayisiMerkez: seciliAnket ? seciliAnket.anketorSayisiMerkez : '',
    cevaplayiciBirim: null,
    duzeltmeDurum: seciliAnket ? seciliAnket.duzeltmeDurum : false
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
                <Col sm={5.5} md={5.5} lg={5.5}>
                  <FormGroup label={'Anket Kodu:'}>
                    <InputGroup large disabled={seciliAnket} name="kodu" value={values.kodu} onChange={handleChange}/>
                  </FormGroup>
                </Col>
                <Col/>
                <Col sm={5.5} md={5.5} lg={5.5}>
                  <FormGroup label={'Anket Adı:'}>
                    <InputGroup large name="adi" value={values.adi} onChange={handleChange}/>
                  </FormGroup>
                </Col>
              </Satir>
              <Satir>
                <Col sm={5.5} md={5.5} lg={5.5}>
                  <FormGroup label={'Periyodu:'}>
                    <Field name='periyot' isClearable value={values.periyot || null} options={periyotOptions}
                           component={SelectField}/>
                  </FormGroup>
                </Col>
                <Col/>
                <Col sm={5.5} md={5.5} lg={5.5}>
                  <FormGroup label={'Verinin Birim Düzeyi:'}>
                    <Field name='birimDuzeyi' isClearable value={values.birimDuzeyi || null}
                           options={veriBirimDuzeyiOption}
                           component={SelectField}/>
                  </FormGroup>
                </Col>
              </Satir>
              <Satir>
                <Col sm={5.5} md={5.5} lg={5.5}>
                  <FormGroup label={'Örneklem Boyutu:'}>
                    <InputGroup type="number" name="orneklemSayisi" value={values.orneklemSayisi} onChange={handleChange}/>
                  </FormGroup>
                </Col>
                <Col/>
                <Col sm={5.5} md={5.5} lg={5.5}>
                  <FormGroup label={'Coğrafi Düzeyi:'}>
                    <Field name='cografiDuzeyi' isClearable value={values.cografiDuzeyi || null}
                           options={cografiDuzeyOptions}
                           component={SelectField}/>
                  </FormGroup>
                </Col>
              </Satir>
              <Satir>
                <Col sm={5.5} md={5.5} lg={5.5}>
                  <FormGroup label={'Şeması:'}>
                    <InputGroup name="sema" value={values.sema} onChange={handleChange}/>
                  </FormGroup>
                </Col>
              </Satir>
              <Satir>
                <Col sm={5.5} md={5.5} lg={5.5}>
                  <Switch name="ustDurum" label='ÜST de var mı?' alignIndicator='right'
                          checked={values.ustDurum} onChange={handleChange}/>
                </Col>
              </Satir>
              <Satir>
                <Col sm={5.5} md={5.5} lg={5.5}>
                  <Switch name="harzemliDurum" label='Harzemli de var mı?' alignIndicator='right'
                          checked={values.harzemliDurum} onChange={handleChange}/>
                </Col>
              </Satir>
              <Satir>
                <Col sm={5.5} md={5.5} lg={5.5}>
                  <FormGroup label={'Çalışma da yer alan toplam kontrolör sayısı - MERKEZ:'}>
                    <InputGroup type="number" name="kontrolorSayisiMerkez" value={values.kontrolorSayisiMerkez}
                                onChange={handleChange}/>
                  </FormGroup>
                </Col>
                <Col/>
                <Col sm={5.5} md={5.5} lg={5.5}>
                  <FormGroup label={'Çalışma da yer alan toplam anketör sayısı - MERKEZ:'}>
                    <InputGroup type="number" name="anketorSayisiMerkez" value={values.anketorSayisiMerkez}
                                onChange={handleChange}/>
                  </FormGroup>
                </Col>
              </Satir>
              <Satir>
                <Col sm={5.5} md={5.5} lg={5.5}>
                  <FormGroup label={'Çalışma da yer alan toplam kontrolör sayısı - BÖLGE:'}>
                    <InputGroup type="number" name="kontrolorSayisiBolge" value={values.kontrolorSayisiBolge}
                                onChange={handleChange}/>
                  </FormGroup>
                </Col>
                <Col/>
                <Col sm={5.5} md={5.5} lg={5.5}>
                  <FormGroup label={'Çalışma da yer alan toplam anketör sayısı - BÖLGE:'}>
                    <InputGroup type="number" name="anketorSayisiBolge" value={values.anketorSayisiBolge}
                                onChange={handleChange}/>
                  </FormGroup>
                </Col>
              </Satir>
              <Satir>
                <Col sm={5.5} md={5.5} lg={5.5}>
                  <Switch name="duzeltmeDurum" label='Mevsimsel Düzeltme Kullanılıyor mu?' alignIndicator='right'
                          checked={values.duzeltmeDurum} onChange={handleChange}/>
                </Col>
              </Satir>
              <Satir/>
              <Satir>
                <Col sm={8} md={8} lg={8}/>
                <Col>
                  <Button fill intent='danger' text={'Geri Dön'} onClick={history.goBack}/>
                </Col>
                <Col>
                  <Button fill intent='success' text={'Kaydet'}/>
                </Col>
              </Satir>
            </Container>
          </Form>
        )}
      </Formik>
    </Wrapper>

  )
}