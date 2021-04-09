import React from 'react'
import { Col, Container, Row } from 'react-grid-system'
import { FormGroup, InputGroup } from '@blueprintjs/core'
import { Field } from 'formik'
import SelectField from '../SelectField'
import styled from 'styled-components'
import ReactQuill from 'react-quill'
import useSecenekler from '../useSecenekler'

const Satir = styled(Row)`
  padding: 8px 8px;
`
const QuillStyled = styled(ReactQuill)`
  background-color: white;
  height: 10vh;
  
`

export default function UrunGenelBilgiler ({ values, handleChange, setFieldValue }) {

  const {
    birimOption,
    periyotOptions,
    cografiDuzeyOptions
  } = useSecenekler();

  const reactQuillHandleChange = (name, icerik) => {
    setFieldValue(name, icerik)
  }
  return (
    <Container fluid>
      <Satir>
        <Col sm={5.5} md={5.5} lg={5.5}>
          <FormGroup label={'İstatistiki Ürün Adı:'}>
            <InputGroup large name={'adi'} value={values.adi || ''} onChange={handleChange}/>
          </FormGroup>
        </Col>
        <Col/>
        <Col sm={5.5} md={5.5} lg={5.5}>
          <FormGroup label={'İstatistiki Ürün Kodu:'}>
            <InputGroup large name={'kodu'} id="kodu" value={values.kodu || ''} onChange={handleChange}/>
          </FormGroup>
        </Col>
      </Satir>
      <Satir>
        <Col sm={5.5} md={5.5} lg={5.5}>
          <label>Sorumlu Grup Başkanlığı:</label>
          <Field name='birim' isClearable values={values.birim || null} options={birimOption}
                 component={SelectField}/>
        </Col>
        <Col/>
        <Col sm={5.5} md={5.5} lg={5.5}>
          <label>Üretim Sıklığı:</label>
          <Field name='periyot' isClearable value={values.periyot || null} options={periyotOptions}
                 component={SelectField}/>
        </Col>
      </Satir>
      <Satir>
        <Col sm={5.5} md={5.5} lg={5.5}>
          <label>Coğrafi Düzeyi:</label>
          <Field name='cografiDuzey' isClearable value={values.cografiDuzey || null} options={cografiDuzeyOptions}
                 component={SelectField}/>
        </Col>
        <Col/>
        <Col sm={5.5} md={5.5} lg={5.5}>
          <FormGroup label={'Zamanlılık(T+Süre):'}>
            <InputGroup type="number" name={'zamanlilik'} value={values.zamanlilik || ''} onChange={handleChange}/>
          </FormGroup>
        </Col>
      </Satir>
      <Satir style={{ height: '150px' }}>
        <Col sm={5.5} md={5.5} lg={5.5}>
          <FormGroup label={'Ürünün Amacı:'}>
            <QuillStyled name={'amac'} value={values.amac || ''}
                         onChange={(icerik) => reactQuillHandleChange('amac', icerik)}/>
          </FormGroup>
        </Col>
        <Col/>
        <Col sm={5.5} md={5.5} lg={5.5}>
          <FormGroup label={'Ürünün Kapsamı:'}>
            <QuillStyled name={'kapsam'} value={values.kapsam || ''}
                         onChange={(icerik) => reactQuillHandleChange('kapsam', icerik)}/>
          </FormGroup>
        </Col>
      </Satir>
      <Satir/>
      <Satir/>
      <Satir style={{ height: '150px' }}>
        <Col sm={5.5} md={5.5} lg={5.5}>
          <FormGroup label={'Ürünün Sağlayacağı Fayda:'}>
            <QuillStyled name={'fayda'} value={values.fayda || ''}
                         onChange={(icerik) => reactQuillHandleChange('fayda', icerik)}/>
          </FormGroup>
        </Col>
      </Satir>
    </Container>
  )
}