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
const FonksiyonelButonAlani = styled(Row)`
  bottom: 5%;
  right: 0;
  width: 100%;
  position: fixed;
`


export default function AnketForm ({ seciliAnket, history }) {
  // const setAnketler = useSetRecoilState(anketlerState)
  // const periyotlar = useRecoilValue(referanslarState).PERIYOT
  // const cografiDuzeyler = useRecoilValue(referanslarState).COGRAFI_DUZEY
  // const veriBirimDuzeyleri = useRecoilValue(referanslarState).ISTATISTIKI_BIRIM_DUZEY
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
    birimDuzeyi:seciliAnket ?  seciliAnketItem(seciliAnket.birimDuzey) : null,
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
  // const anketEkleIstek = (values) => {
  //   const yeniAnket = {
  //     id:values.kodu,
  //     adi:values.adi,
  //     taslak:false,
  //     periyot:periyotlar.find(periyot => periyot.id === values.periyot.value),
  //     cografiDuzey:cografiDuzeyler.find(duzey => duzey.id === values.cografiDuzeyi.value),
  //     birimDuzey:veriBirimDuzeyleri.find(duzey => duzey.id === values.birimDuzeyi.value),
  //     orneklemSayisi:values.orneklemSayisi,
  //     sema:values.sema,
  //     harzemliDurum: values.harzemliDurum ? 1 : 0,
  //     ustDurum: values.ustDurum ? 1 : 0,
  //     anketorSayisiMerkez: values.anketorSayisiMerkez,
  //     anketorSayisiBolge: values.anketorSayisiBolge,
  //     kontrolorSayisiMerkez: values.kontrolorSayisiMerkez,
  //     kontrolorSayisiBolge: values.kontrolorSayisiBolge
  //   }
  //
  //   return Axios.post("api/anketler/ekle", { yeniAnket })
  // }
  const handleAnketSubmit = (event) => {
    event.preventDefault();
    // anketEkleIstek(values).then(res => setAnketler(res.data))
    history.goBack()
  }
  return (
    <Wrapper>
      <Formik
        initialValues={initialValues}
        onSubmit={handleAnketSubmit}
        enableReinitialize
      >
        {({
          values,
          handleChange,
          handleSubmit,
          dirty,
          resetForm
        }) => (
          <Form onSubmit={handleSubmit}>
            <Container fluid>
              <Satir>
                <Col sm={10} md={10} lg={10}/>
                <Col>
                  {dirty && (
                    <Button fill minimal intent={'danger'} text={'İçeriği Temizle'} rightIcon="cross" onClick={resetForm}/>
                  )}
                </Col>
              </Satir>
              <Satir>
                <Col sm={5.5} md={5.5} lg={5.5}>
                  <FormGroup label={'Anket Kodu:'} labelFor="kodu">
                    <InputGroup large disabled={seciliAnket} name="kodu" id="kodu" value={values.kodu} onChange={handleChange}/>
                  </FormGroup>
                </Col>
                <Col/>
                <Col sm={5.5} md={5.5} lg={5.5}>
                  <FormGroup label={'Anket Adı:'} labelFor="adi">
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
              <FonksiyonelButonAlani>
                <Col sm={8} md={8} lg={8}/>
                <Col>
                  <Button fill intent='danger' text={'Geri Dön'} onClick={history.goBack}/>
                </Col>
                <Col>
                  <Button fill intent='success' text={'Kaydet'} onClick={(event) => handleAnketSubmit(event)}/>
                </Col>
              </FonksiyonelButonAlani>
            </Container>
          </Form>
        )}
      </Formik>
    </Wrapper>

  )
}