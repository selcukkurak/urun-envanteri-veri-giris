import React from 'react'
import { Field, Form, Formik } from 'formik'
import {Container, Row, Col} from 'react-grid-system'
import styled from 'styled-components'
import { Button, Divider, FormGroup, InputGroup, TextArea } from '@blueprintjs/core'
import SelectField from '../SelectField'
const Wrapper = styled.div`
  padding: 70px 0;
`
const Satir = styled(Row)`
  padding:8px 8px;
`

export default function IdariKayitForm({history}){
  const hiddenYasalHukumInput = React.useRef(null);
  const hiddenProtokolInput = React.useRef(null);
  const handleClick = (hiddenFile) => {
    hiddenFile.current.click();
  };
  const initialValues = {
    kodu:"",
    adi:"",
    veriDuzeyi:null,
    sorumluBirim:null,
    yasalHukum:"",
    protokol:"",
    eposta:"",
    verininTutulduguYer:"",
    kisitlar:"",
    kaynakKurum:null,
    kaynakBirim:null,
    transferVerisininFormati:"",
    transferSikligi:"",
    veriIcerigi:"",
    veriBirimDuzeyi:"",
    cografiDuzeyi:null,
    veriTalepBicimi:null,
  }
  const handleSubmit = (event) => {
    event.preventDefault()
  }
  return(
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
            <Container>
              <Satir>
                <Col>
                  <Divider/>
                </Col>
              </Satir>
              <Satir>
                <Col sm={2} md={2} lg={2}>
                  <FormGroup label={"İdari Kayıt Kodu:"}/>
                </Col>
                <Col sm={4} md={4} lg={4}>
                  <InputGroup name="kodu" value={values.kodu} onChange={handleChange}/>
                </Col>
                <Col sm={2} md={2} lg={2}>
                  <FormGroup label={"Kaynak Kurum:"}/>
                </Col>
                <Col sm={4} md={4} lg={4}>
                  <Field name='kaynakKurum' isClearable value={values.kaynakKurum || null}
                         component={SelectField}/>
                </Col>
              </Satir>
              <Satir>
                <Col sm={2} md={2} lg={2}>
                  <FormGroup label={"İdari Kayıt Adı:"}/>
                </Col>
                <Col sm={4} md={4} lg={4}>
                  <InputGroup name="adi" value={values.adi} onChange={handleChange}/>
                </Col>
                <Col sm={2} md={2} lg={2}>
                  <FormGroup label={"Kaynak Birim:"}/>
                </Col>
                <Col sm={4} md={4} lg={4}>
                  <Field name='kaynakBirim' isClearable value={values.kaynakBirim || null}
                         component={SelectField}/>
                </Col>
              </Satir>
              <Satir>
                <Col sm={2} md={2} lg={2}>
                  <FormGroup label={"Verinin Düzeyi:"}/>
                </Col>
                <Col sm={4} md={4} lg={4}>
                  <Field name='veriDuzeyi' isClearable value={values.veriDuzeyi || null}
                         component={SelectField}/>
                </Col>
                <Col sm={2} md={2} lg={2}>
                  <FormGroup label={"Transfer Verisinin Formatı:"}/>
                </Col>
                <Col sm={4} md={4} lg={4}>
                  <Field name='transferVerisininFormati' isClearable value={values.transferVerisininFormati || null}
                         component={SelectField}/>
                </Col>
              </Satir>
              <Satir>
                <Col sm={2} md={2} lg={2}>
                  <FormGroup label={"Transferden Sorumlu Birim:"}/>
                </Col>
                <Col sm={4} md={4} lg={4}>
                  <Field name='sorumluBirim' isClearable value={values.sorumluBirim || null}
                         component={SelectField}/>
                </Col>
                <Col sm={2} md={2} lg={2}>
                  <FormGroup label={"Transfer Sıklığı:"}/>
                </Col>
                <Col sm={4} md={4} lg={4}>
                  <Field name='transferSikligi' isClearable value={values.transferSikligi || null}
                         component={SelectField}/>
                </Col>
              </Satir>
              <Satir>
                <Col sm={2} md={2} lg={2}>
                  <FormGroup label={"Yasal Hüküm:"}/>
                </Col>
                <Col sm={4} md={4} lg={4}>
                  <TextArea fill name='yasalHukum' value={values.yasalHukum.name} disabled={values.yasalHukum}/>
                  <Button style={{float:'right'}} intent={'primary'} text="Yasal Hükümleri Yükle" rightIcon={'export'} onClick={() => handleClick(hiddenYasalHukumInput)}/>
                  <input type="file"  name='yasalHukum'  style={{display:'none'}} ref={hiddenYasalHukumInput}
                         accept=".pdf, .doc, .docx, .xls, .xlsx"
                              onChange={(event) => {setFieldValue('yasalHukum',
                                event.target.files[0])}}/>
                </Col>
                <Col sm={2} md={2} lg={2}>
                  <FormGroup label={"Veri İçeriği:"}/>
                </Col>
                <Col sm={4} md={4} lg={4}>
                  <TextArea fill name='veriIcerigi' value={values.veriIcerigi || null}/>
                </Col>
              </Satir>
              <Satir/>
              <Satir>
                <Col sm={2} md={2} lg={2}>
                  <FormGroup label={"Protokol:"}/>
                </Col>
                <Col sm={4} md={4} lg={4}>
                  <InputGroup value={values.protokol.name} disabled/>
                  <Button style={{float:'right'}} intent={'primary'} text="Protokol Yükle" rightIcon={'export'} onClick={() => handleClick(hiddenProtokolInput)}/>
                  <input type="file"  name='protokol'  style={{display:'none'}} ref={hiddenProtokolInput}
                         accept=".pdf, .doc, .docx, .xls, .xlsx"
                         onChange={(event) => {setFieldValue('protokol',
                           event.target.files[0])}}/>
                </Col>
              </Satir>
              <Satir>
                <Col sm={2} md={2} lg={2}>
                  <FormGroup label={"E-Posta Grup:"}/>
                </Col>
                <Col sm={4} md={4} lg={4}>
                  <InputGroup type="email" name="eposta" value={values.adi} onChange={handleChange}/>
                </Col>
                <Col sm={2} md={2} lg={2}>
                  <FormGroup label={"Verinin Birim Düzeyi:"}/>
                </Col>
                <Col sm={4} md={4} lg={4}>
                  <Field name='veriBirimDuzeyi' isClearable value={values.veriBirimDuzeyi || null}
                         component={SelectField}/>
                </Col>
              </Satir>
              <Satir>
                <Col sm={2} md={2} lg={2}>
                  <FormGroup label={"Verinin Tutulduğu Yer:"}/>
                </Col>
                <Col sm={4} md={4} lg={4}>
                  <Field name='verininTutulduguYer' isClearable value={values.verininTutulduguYer || null}
                         component={SelectField}/>
                </Col>
                <Col sm={2} md={2} lg={2}>
                  <FormGroup label={"Coğrafi Duzeyi:"}/>
                </Col>
                <Col sm={4} md={4} lg={4}>
                  <Field name='cografiDuzeyi' isClearable value={values.cografiDuzeyi || null}
                         component={SelectField}/>
                </Col>
              </Satir>
              <Satir>
                <Col sm={2} md={2} lg={2}>
                  <FormGroup label={"Kısıtlar:"}/>
                </Col>
                <Col sm={4} md={4} lg={4}>
                  <TextArea fill name='kisitlar' value={values.kisitlar || null}/>
                </Col>
                <Col sm={2} md={2} lg={2}>
                  <FormGroup label={"Veri Talep Biçimi:"}/>
                </Col>
                <Col sm={4} md={4} lg={4}>
                  <Field name='veriTalepBicimi' isClearable value={values.veriTalepBicimi || null}
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