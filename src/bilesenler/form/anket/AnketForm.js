import React from 'react'
import { Field, Form, Formik } from 'formik'
import { Container, Row, Col } from 'react-grid-system'
import { Button, FormGroup, InputGroup, Switch } from '@blueprintjs/core'
import styled from 'styled-components'
import { useRecoilValue } from 'recoil'
import { referanslarState } from '../../store'
import SelectField from '../SelectField'

const Wrapper = styled.div`
  padding: 70px 0;
`
const Satir = styled(Row)`
  padding: 4px 8px;
`
export default function AnketForm ({ seciliAnket, history }) {
  const periyotlar = useRecoilValue(referanslarState).PERIYOT
  const periyotOption = periyotlar && periyotlar.length !== 0 && periyotlar.map(periyot => ({
    label: periyot.adi,
    value: periyot.id
  }))

  const cografiDuzeyler = useRecoilValue(referanslarState).COGRAFI_DUZEY
  const cografiDuzeyOption = cografiDuzeyler && cografiDuzeyler.length !== 0 && cografiDuzeyler.map(duzey => ({
    label: duzey.adi,
    value: duzey.id
  }))

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
  const initialValues = {
    kodu: seciliAnket ? seciliAnket.id : '',
    adi: seciliAnket ? seciliAnket.adi : '',
    periyot: seciliAnketPeriyot() || null,
    birimDuzeyi: null,
    orneklemSayisi: seciliAnket ? seciliAnket.orneklemSayisi : '',
    cografiDuzeyi: seciliAnketCografiDuzey() || null,
    sema: seciliAnket ? seciliAnket.sema : '',
    ustDurum: seciliAnket ? seciliAnket.ustDurum !== 0 : false,
    harzemliDurum: seciliAnket ? seciliAnket.harzemliDurum !== 0 : false,
    kontrolorSayisiBolge: '',
    anketorSayisiBolge: '',
    kontrolorSayisiMerkez: '',
    anketorSayisiMerkez: '',
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
                    <Field name='periyot' isClearable value={values.periyot || null} options={periyotOption}
                           component={SelectField}/>
                  </FormGroup>
                </Col>
                <Col/>
                <Col sm={5.5} md={5.5} lg={5.5}>
                  <FormGroup label={'Verinin Birim Düzeyi:'}>
                    <Field name='birimDuzeyim' isClearable value={values.birimDuzeyi || null}
                           component={SelectField}/>
                  </FormGroup>
                </Col>
              </Satir>
              <Satir>
                <Col sm={5.5} md={5.5} lg={5.5}>
                  <FormGroup label={'Örneklem Boyutu:'}>
                    <InputGroup name="orneklemSayisi" value={values.orneklemSayisi} onChange={handleChange}/>
                  </FormGroup>
                </Col>
                <Col/>
                <Col sm={5.5} md={5.5} lg={5.5}>
                  <FormGroup label={'Coğrafi Düzeyi:'}>
                    <Field name='cografiDuzeyi' isClearable value={values.cografiDuzeyi || null}
                           options={cografiDuzeyOption}
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