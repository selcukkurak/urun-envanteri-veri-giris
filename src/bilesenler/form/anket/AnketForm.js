import React from 'react'
import { Field, Form, Formik } from 'formik'
import { Container, Row, Col } from 'react-grid-system'
import { Button, FormGroup, InputGroup, Switch } from '@blueprintjs/core'
import styled from 'styled-components'
import SelectField from '../SelectField'
import useSecenekler from '../useSecenekler'
import { PersistFormikValues } from 'formik-persist-values'
import { deleteLocalStorage } from '../ortak'
import Footer from '../Footer'
import {useRecoilValue } from 'recoil'
import { referanslarState } from '../../store'
import AnketAPI from '../../servisler/AnketAPI'
import { basariMesajiYayinla, hataMesajiYayinla } from '../../bildirim/mesajlar'

const Wrapper = styled.div`
  padding: 70px 0;
`
const Satir = styled(Row)`
  padding: 4px 8px;
`



export default function AnketForm ({ seciliAnket, history }) {
  const periyotlar = useRecoilValue(referanslarState).PERIYOT
  const cografiDuzeyler = useRecoilValue(referanslarState).COGRAFI_DUZEY
  const veriBirimDuzeyleri = useRecoilValue(referanslarState).ISTATISTIKI_BIRIM_DUZEY
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
  const anketEkleIstek = (values) => {
    const yeniAnket = {
      id:values.kodu,
      adi:values.adi,
      taslak:true,
      periyot:periyotlar.find(periyot => periyot.id === values.periyot.value),
      cografiDuzey:cografiDuzeyler.find(duzey => duzey.id === values.cografiDuzeyi.value),
      birimDuzey:veriBirimDuzeyleri.find(duzey => duzey.id === values.birimDuzeyi.value),
      orneklemSayisi:values.orneklemSayisi,
      sema:values.sema,
      harzemliDurum: values.harzemliDurum ? 1 : 0,
      ustDurum: values.ustDurum ? 1 : 0,
      anketorSayisiMerkez: values.anketorSayisiMerkez,
      anketorSayisiBolge: values.anketorSayisiBolge,
      kontrolorSayisiMerkez: values.kontrolorSayisiMerkez,
      kontrolorSayisiBolge: values.kontrolorSayisiBolge
    }

    AnketAPI.anketEklemeIstek(yeniAnket)
      .then(res => {
        if (res.status === 200)
          return basariMesajiYayinla("Ekleme ????lemi Ba??ar??l??")
        else
          return hataMesajiYayinla("Ekleme ????lemi Ba??ar??s??z")
      })
  }

  const guncelleAnket = (values,id) => {
    const guncelAnket = {
      ...seciliAnket,
      adi:values.adi,
      periyot:periyotlar.find(periyot => periyot.id === values.periyot.value),
      cografiDuzey:cografiDuzeyler.find(duzey => duzey.id === values.cografiDuzeyi.value),
      birimDuzey:veriBirimDuzeyleri.find(duzey => duzey.id === values.birimDuzeyi.value),
      orneklemSayisi:values.orneklemSayisi,
      sema:values.sema,
      harzemliDurum: values.harzemliDurum ? 1 : 0,
      ustDurum: values.ustDurum ? 1 : 0,
      anketorSayisiMerkez: values.anketorSayisiMerkez,
      anketorSayisiBolge: values.anketorSayisiBolge,
      kontrolorSayisiMerkez: values.kontrolorSayisiMerkez,
      kontrolorSayisiBolge: values.kontrolorSayisiBolge
    }

    AnketAPI.enketGuncellemeIstek(guncelAnket,id)
      .then(res => {
        if (res.status === 200)
          return basariMesajiYayinla("G??ncelleme ????lemi Ba??ar??l??")
        else
          return hataMesajiYayinla("G??ncelleme ????lemi Ba??ar??s??z")
      })
  }
  const handleAnketSubmit = (values,event) => {
    event.preventDefault();
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
        }) => (
          <Form onSubmit={handleSubmit}>
            <Container fluid>
              <Satir>
                <Col sm={5.5} md={5.5} lg={5.5}>
                  <FormGroup label={'Anket Kodu:'} labelFor="kodu">
                    <InputGroup large disabled={seciliAnket} name="kodu" id="kodu" value={values.kodu} onChange={handleChange}/>
                  </FormGroup>
                </Col>
                <Col/>
                <Col sm={5.5} md={5.5} lg={5.5}>
                  <FormGroup label={'Anket Ad??:'} labelFor="adi">
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
                  <FormGroup label={'Verinin Birim D??zeyi:'}>
                    <Field name='birimDuzeyi' isClearable value={values.birimDuzeyi || null}
                           options={veriBirimDuzeyiOption}
                           component={SelectField}/>
                  </FormGroup>
                </Col>
              </Satir>
              <Satir>
                <Col sm={5.5} md={5.5} lg={5.5}>
                  <FormGroup label={'??rneklem Boyutu:'}>
                    <InputGroup type="number" name="orneklemSayisi" value={values.orneklemSayisi} onChange={handleChange}/>
                  </FormGroup>
                </Col>
                <Col/>
                <Col sm={5.5} md={5.5} lg={5.5}>
                  <FormGroup label={'Co??rafi D??zeyi:'}>
                    <Field name='cografiDuzeyi' isClearable value={values.cografiDuzeyi || null}
                           options={cografiDuzeyOptions}
                           component={SelectField}/>
                  </FormGroup>
                </Col>
              </Satir>
              <Satir>
                <Col sm={5.5} md={5.5} lg={5.5}>
                  <FormGroup label={'??emas??:'}>
                    <InputGroup name="sema" value={values.sema} onChange={handleChange}/>
                  </FormGroup>
                </Col>
              </Satir>
              <Satir>
                <Col sm={5.5} md={5.5} lg={5.5}>
                  <Switch name="ustDurum" label='??ST de var m???' alignIndicator='right'
                          checked={values.ustDurum} onChange={handleChange}/>
                </Col>
              </Satir>
              <Satir>
                <Col sm={5.5} md={5.5} lg={5.5}>
                  <Switch name="harzemliDurum" label='Harzemli de var m???' alignIndicator='right'
                          checked={values.harzemliDurum} onChange={handleChange}/>
                </Col>
              </Satir>
              <Satir>
                <Col sm={5.5} md={5.5} lg={5.5}>
                  <FormGroup label={'??al????ma da yer alan toplam kontrol??r say??s?? - MERKEZ:'}>
                    <InputGroup type="number" name="kontrolorSayisiMerkez" value={values.kontrolorSayisiMerkez}
                                onChange={handleChange}/>
                  </FormGroup>
                </Col>
                <Col/>
                <Col sm={5.5} md={5.5} lg={5.5}>
                  <FormGroup label={'??al????ma da yer alan toplam anket??r say??s?? - MERKEZ:'}>
                    <InputGroup type="number" name="anketorSayisiMerkez" value={values.anketorSayisiMerkez}
                                onChange={handleChange}/>
                  </FormGroup>
                </Col>
              </Satir>
              <Satir>
                <Col sm={5.5} md={5.5} lg={5.5}>
                  <FormGroup label={'??al????ma da yer alan toplam kontrol??r say??s?? - B??LGE:'}>
                    <InputGroup type="number" name="kontrolorSayisiBolge" value={values.kontrolorSayisiBolge}
                                onChange={handleChange}/>
                  </FormGroup>
                </Col>
                <Col/>
                <Col sm={5.5} md={5.5} lg={5.5}>
                  <FormGroup label={'??al????ma da yer alan toplam anket??r say??s?? - B??LGE:'}>
                    <InputGroup type="number" name="anketorSayisiBolge" value={values.anketorSayisiBolge}
                                onChange={handleChange}/>
                  </FormGroup>
                </Col>
              </Satir>
              <Satir>
                <Col sm={5.5} md={5.5} lg={5.5}>
                  <Switch name="duzeltmeDurum" label='Mevsimsel D??zeltme Kullan??l??yor mu?' alignIndicator='right'
                          checked={values.duzeltmeDurum} onChange={handleChange}/>
                </Col>
              </Satir>
              <Satir/>
              <Footer>
                <Col sm={8} md={8} lg={8}/>
                <Col>
                  <Button fill intent='danger' text={'Geri D??n'} onClick={() => deleteLocalStorage(history)}/>
                </Col>
                <Col>
                  <Button fill intent='success' text={seciliAnket ? "G??ncelle" : 'Kaydet'}
                          onClick={() => seciliAnket ? guncelleAnket(values, seciliAnket.id) : anketEkleIstek(values)}/>
                </Col>
              </Footer>
            </Container>
            <PersistFormikValues name="anket-form" persistInvalid hashInitials/>
          </Form>
        )}
      </Formik>
    </Wrapper>

  )
}