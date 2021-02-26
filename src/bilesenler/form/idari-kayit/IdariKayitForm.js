import React from 'react'
import { Field, Form, Formik } from 'formik'
import { Container, Row, Col } from 'react-grid-system'
import styled from 'styled-components'
import { Button, FormGroup, InputGroup, TextArea } from '@blueprintjs/core'
import SelectField from '../SelectField'
import ReactQuill from 'react-quill'
import { useRecoilValue } from 'recoil'
import { birimlerState, referanslarState } from '../../store'

const Wrapper = styled.div`
  padding: 70px 0;
`
const Satir = styled(Row)`
  padding: 8px 8px;
`

export default function IdariKayitForm ({ history, seciliIdariKayit }) {
  const hiddenYasalHukumInput = React.useRef(null)
  const hiddenProtokolInput = React.useRef(null)
  const handleClick = (hiddenFile) => {
    hiddenFile.current.click()
  }
  const veriDuzeyleri = useRecoilValue(referanslarState).VERI_DUZEYI
  const veriDuzeyiOption = veriDuzeyleri && veriDuzeyleri.map(duzey => ({ label: duzey.adi, value: duzey.id }))
  const verininTutulduguYerler = useRecoilValue(referanslarState).VERININ_TUTULDUGU_YER
  const veriTutulanYerOption = verininTutulduguYerler && verininTutulduguYerler.map(duzey => ({
    label: duzey.adi,
    value: duzey.id
  }))
  const transferFormatlari = useRecoilValue(referanslarState).VERI_KAYNAK_BICIMI
  const transferFormatiOption = transferFormatlari && transferFormatlari.map(duzey => ({
    label: duzey.adi,
    value: duzey.id
  }))
  const veriTalepBicimleri = useRecoilValue(referanslarState).VERI_TALEP_BICIMI
  const veriTalepBicimiOption = veriTalepBicimleri && veriTalepBicimleri.map(duzey => ({
    label: duzey.adi,
    value: duzey.id
  }))
  const kurumlar = useRecoilValue(referanslarState).KAYNAK_KURUM
  const kurumlarOption = kurumlar && kurumlar.map(duzey => ({
    label: duzey.adi,
    value: duzey.id
  }))
  const periyotlar = useRecoilValue(referanslarState).PERIYOT
  const periyotOption = periyotlar && periyotlar.map(duzey => ({ label: duzey.adi, value: duzey.id }))
  const cografiDuzeyler = useRecoilValue(referanslarState).COGRAFI_DUZEY
  const cografiDuzeyOption = cografiDuzeyler && cografiDuzeyler.map(duzey => ({
    label: duzey.adi,
    value: duzey.id
  }))
  const birimler = useRecoilValue(birimlerState)
  const birimOption = birimler.length !== 0 && birimler.map(birim => ({ label: birim.adi, value: birim.ustBirimId }))
  const reactQuillHandleChange = (name, icerik, setFieldValue) => {
    setFieldValue(name, icerik)
  }
  const dosyaYukleme = (event, name, setFieldValue) => {
    setFieldValue(name, event.target.files[0])
  }
  const seciliKayitItem = (nesne) => {
    if (seciliIdariKayit && nesne) return {
      label: nesne.adi,
      value: nesne.id
    }
    else return null
  }
  console.log(seciliIdariKayit)
  const initialValues = {
    kodu: seciliIdariKayit ? seciliIdariKayit.id : '',
    adi: seciliIdariKayit ? seciliIdariKayit.adi : '',
    veriDuzeyi: seciliKayitItem(seciliIdariKayit.veriDuzeyi) || null,
    sorumluBirim: null,
    yasalHukum:seciliIdariKayit ? seciliIdariKayit.yasalHukum  :'',
    protokol: '',
    eposta:seciliIdariKayit ? seciliIdariKayit.epostaGruplari : '',
    verininTutulduguYer: seciliKayitItem(seciliIdariKayit.verininTutulduguYer) || null,
    kisitlar:seciliIdariKayit ? seciliIdariKayit.kisitlar : '',
    kaynakKurum: null,
    kaynakBirim: null,
    transferVerisininFormati: seciliKayitItem(seciliIdariKayit.transferVerisininFormati) || null,
    transferSikligi: seciliKayitItem(seciliIdariKayit.periyot) || null,
    veriIcerigi: '',
    veriBirimDuzeyi: '',
    cografiDuzeyi: seciliKayitItem(seciliIdariKayit.cografiDuzey) || null,
    veriTalepBicimi: seciliKayitItem(seciliIdariKayit.veriTalepBicimi) || null,
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
        }) => (
          <Form onSubmit={handleSubmit}>
            {console.log(values)}
            <Container fluid>
              <Satir>
                <Col sm={5.5} md={5.5} lg={5.5}>
                  <FormGroup label="İdari Kayıt Adı:">
                    <InputGroup large name="adi" value={values.adi} onChange={handleChange}/>
                  </FormGroup>
                </Col>
                <Col/>
                <Col sm={5.5} md={5.5} lg={5.5}>
                  <FormGroup label="İdari Kayıt Kodu:">
                    <InputGroup large name="kodu" value={values.kodu} onChange={handleChange}
                                disabled={seciliIdariKayit}/>
                  </FormGroup>
                </Col>
              </Satir>
              <Satir>
                <Col sm={5.5} md={5.5} lg={5.5}>
                  <FormGroup label="Kaynak Kurum:">
                    <Field name='kaynakKurum' isClearable value={values.kaynakKurum || null}
                           options={kurumlarOption}
                           component={SelectField}/>
                  </FormGroup>
                </Col>
                <Col/>
                <Col sm={5.5} md={5.5} lg={5.5}>
                  <FormGroup label="Kaynak Birim:">
                    <Field name='kaynakBirim' isClearable value={values.kaynakBirim || null}
                           component={SelectField}/>
                  </FormGroup>
                </Col>
              </Satir>
              <Satir>
                <Col sm={5.5} md={5.5} lg={5.5}>
                  <FormGroup label="Verinin Düzeyi:">
                    <Field name='veriDuzeyi' isClearable value={values.veriDuzeyi || null}
                           options={veriDuzeyiOption}
                           component={SelectField}/>
                  </FormGroup>
                </Col>
                <Col/>
                <Col sm={5.5} md={5.5} lg={5.5}>
                  <FormGroup label="Transfer Verisinin Formatı:">
                    <Field name='transferVerisininFormati' isClearable
                           options={transferFormatiOption}
                           value={values.transferVerisininFormati || null}
                           component={SelectField}/>
                  </FormGroup>
                </Col>
              </Satir>
              <Satir>
                <Col sm={5.5} md={5.5} lg={5.5}>
                  <FormGroup label="Transferden Sorumlu Birim:">
                    <Field name='sorumluBirim' isClearable value={values.sorumluBirim || null}
                           options={birimOption}
                           component={SelectField}/>
                  </FormGroup>
                </Col>
                <Col/>
                <Col sm={5.5} md={5.5} lg={5.5}>
                  <FormGroup label="Transfer Sıklığı:">
                    <Field name='transferSikligi' isClearable value={values.transferSikligi || null}
                           options={periyotOption}
                           component={SelectField}/>
                  </FormGroup>
                </Col>
              </Satir>
              <Satir>
                <Col sm={5.5} md={5.5} lg={5.5}>
                  <FormGroup label='Yasal Hüküm:'>
                    <ReactQuill name='yasalHukum' value={values.yasalHukum}
                                onChange={(icerik) => reactQuillHandleChange('yasalHukum', icerik, setFieldValue)}/>
                    <Button style={{ float: 'right' }} intent={'primary'} text="Yasal Hükümleri Yükle"
                            rightIcon={'export'} onClick={() => handleClick(hiddenYasalHukumInput)}/>
                    <input type="file" name='yasalHukum' style={{ display: 'none' }} ref={hiddenYasalHukumInput}
                           accept=".pdf, .doc, .docx, .xls, .xlsx"
                           onChange={(event) => dosyaYukleme(event, 'yasalHukum', setFieldValue)}/>
                  </FormGroup>
                </Col>
                <Col/>
                <Col sm={5.5} md={5.5} lg={5.5}>
                  <FormGroup label='Veri İçeriği:'>
                    <ReactQuill name='veriIcerigi' value={values.veriIcerigi}
                                onChange={(icerik) => reactQuillHandleChange('veriIcerigi', icerik, setFieldValue)}/>
                  </FormGroup>
                </Col>
              </Satir>
              <Satir/>
              <Satir>
                <Col sm={5.5} md={5.5} lg={5.5}>
                  <FormGroup label="Protokol:">
                    <InputGroup value={values.protokol.name} disabled={values.protokol}/>
                    <Button style={{ float: 'right' }} intent={'primary'} text="Protokol Yükle"
                            rightIcon={'export'}
                            onClick={() => handleClick(hiddenProtokolInput)}/>
                    <input type="file" name='protokol' style={{ display: 'none' }} ref={hiddenProtokolInput}
                           accept=".pdf, .doc, .docx, .xls, .xlsx"
                           onChange={(event) => dosyaYukleme(event, 'protokol', setFieldValue)}/>
                  </FormGroup>
                </Col>
                <Col/>
              </Satir>
              <Satir>
                <Col sm={5.5} md={5.5} lg={5.5}>
                  <FormGroup label="E-Posta Grup:">
                    <InputGroup type="email" name="eposta" value={values.eposta} onChange={handleChange}/>
                  </FormGroup>
                </Col>
                <Col/>
                <Col sm={5.5} md={5.5} lg={5.5}>
                  <FormGroup label="Verinin Birim Düzeyi:">
                    <Field name='veriBirimDuzeyi' isClearable value={values.veriBirimDuzeyi || null}
                           component={SelectField}/>
                  </FormGroup>
                </Col>
              </Satir>
              <Satir>
                <Col sm={5.5} md={5.5} lg={5.5}>
                  <FormGroup label="Verinin Tutulduğu Yer:">
                    <Field name='verininTutulduguYer' isClearable value={values.verininTutulduguYer || null}
                           options={veriTutulanYerOption}
                           component={SelectField}/>
                  </FormGroup>
                </Col>
                <Col/>
                <Col sm={5.5} md={5.5} lg={5.5}>
                  <FormGroup label="Coğrafi Duzeyi:">
                    <Field name='cografiDuzeyi' isClearable value={values.cografiDuzeyi || null}
                           options={cografiDuzeyOption}
                           component={SelectField}/>
                  </FormGroup>
                </Col>
              </Satir>
              <Satir>
                <Col sm={5.5} md={5.5} lg={5.5}>
                  <FormGroup label="Kısıtlar:">
                    <TextArea fill name='kisitlar' value={values.kisitlar || null} onChange={handleChange}/>
                  </FormGroup>
                </Col>
                <Col/>
                <Col sm={5.5} md={5.5} lg={5.5}>
                  <FormGroup label="Veri Talep Biçimi:">
                    <Field name='veriTalepBicimi' isClearable value={values.veriTalepBicimi || null}
                           options={veriTalepBicimiOption}
                           component={SelectField}/>
                  </FormGroup>
                </Col>
              </Satir>
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