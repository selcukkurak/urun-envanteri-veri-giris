import React  from 'react'
import { Col, Container, Row } from 'react-grid-system'
import { FormGroup, InputGroup } from '@blueprintjs/core'
import { Field } from 'formik'
import SelectField from './SelectField'
import styled from 'styled-components'
import { useRecoilValue } from 'recoil'
import { birimlerState, referanslarState } from '../store'
import ReactQuill from 'react-quill'

const Satir = styled(Row)`
  padding: 16px 8px;
`


export default function UrunGenelBilgiler({values, handleChange, setFieldValue}){

  const periyotlar = useRecoilValue(referanslarState).PERIYOT
  const periyotOptions = periyotlar && periyotlar.length !== 0 && periyotlar.map(periyot => ({
    label: periyot.adi,
    value: periyot.id
  }))

  const cografiDuzeyler = useRecoilValue(referanslarState).COGRAFI_DUZEY
  const cografiDuzeyOptions = cografiDuzeyler && cografiDuzeyler.map(duzey => ({ label: duzey.adi, value: duzey.id }))

  const birimler = useRecoilValue(birimlerState)
  const birimOption = birimler.length !== 0 && birimler.map(birim => ({ label: birim.adi, value: birim.ustBirimId }))

  return(
    <Container>
      <Satir>
        <Col sm={3} md={3} lg={3}>
          <FormGroup label={"İstatistiki Ürün Adı:"}/>
        </Col>
        <Col sm={6} md={6} lg={6}>
          <InputGroup name={"adi"} value={values.adi || ""} onChange={handleChange}/>
        </Col>
      </Satir>
      <Satir>
        <Col sm={3} md={3} lg={3}>
          <FormGroup label={"İstatistiki Ürün Kodu:"}/>
        </Col>
        <Col sm={6} md={6} lg={6}>
          <InputGroup name={"kodu"} value={values.kodu || ""} onChange={handleChange}/>
        </Col>
      </Satir>
      <Satir>
        <Col sm={3} md={3} lg={3}>
          <FormGroup label={'Sorumlu Grup Başkanlığı:'}/>
        </Col>
        <Col sm={6} md={6} lg={6}>
          <Field name='birim' isClearable values={values.birim || null} options={birimOption}
                 component={SelectField}/>
        </Col>
      </Satir>
      <Satir>
        <Col sm={3} md={3} lg={3}>
          <FormGroup label={"Üretim Sıklığı:"}/>
        </Col>
        <Col sm={6} md={6} lg={6}>
          <Field name='periyot' isClearable value={values.periyot || null} options={periyotOptions}
                 component={SelectField}/>
        </Col>
      </Satir>
      <Satir>
        <Col sm={3} md={3} lg={3}>
          <FormGroup label={"Coğrafi Düzeyi:"}/>
        </Col>
        <Col sm={6} md={6} lg={6}>
          <Field name='cografiDuzey' isClearable value={values.cografiDuzey || null} options={cografiDuzeyOptions}
                 component={SelectField}/>
        </Col>
      </Satir>
      <Satir>
        <Col sm={3} md={3} lg={3}>
          <FormGroup label={'Ürünün Amacı:'}/>
        </Col>
        <Col>
          <ReactQuill style={{backgroundColor:"white"}} name={'amac'} value={values.amac || ''} onChange={(e) => setFieldValue('amac', e)}/>
        </Col>
      </Satir>
      <Satir>
        <Col sm={3} md={3} lg={3}>
          <FormGroup label={'Ürünün Kapsamı:'}/>
        </Col>
        <Col>
          <ReactQuill style={{backgroundColor:"white"}} name={'kapsam'} value={values.kapsam || ''} onChange={(e) => setFieldValue('kapsam', e)}/>
        </Col>
      </Satir>
      <Satir>
        <Col sm={3} md={3} lg={3}>
          <FormGroup label={'Ürünün Yayınlanmasının Sağlayacağı Fayda:'}/>
        </Col>
        <Col>
          <ReactQuill style={{backgroundColor:"white"}} name={'fayda'} value={values.fayda || ''} onChange={(e) => setFieldValue('fayda', e)}/>
        </Col>
      </Satir>
      <Satir>
        <Col sm={3} md={3} lg={3}>
          <FormGroup label={"Zamanlılık(T+Süre):"}/>
        </Col>
        <Col sm={6} md={6} lg={6}>
          <InputGroup name={"zamanlilik"} value={values.zamanlilik || ""} onChange={handleChange}/>
        </Col>
      </Satir>
    </Container>
  )
}