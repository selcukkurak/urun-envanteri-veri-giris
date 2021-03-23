import React from 'react'
import { Col, Container, Row } from 'react-grid-system'
import styled from 'styled-components'
import { Button, Card, Colors, FormGroup, HTMLTable, InputGroup, Switch } from '@blueprintjs/core'
import { Field } from 'formik'
import SelectField from '../SelectField'
import useSecenekler from '../useSecenekler'

const Satir = styled(Row)`
  padding: 16px 8px;
`
const CheckedSatir = styled(Row)`
  background-color: ${Colors.LIGHT_GRAY4};
  padding: 16px 8px;
`
const Kart = styled(Card)`
  max-height: ${props => props.boy > 3  && "450px" };
  overflow-y: ${props => props.boy > 4 && 'scroll'};
`

function UrunCiktiBilgileri ({ bultenDurum, formBultenler, paylasimDurum, paylasimlar, handleChange, setFieldValue }) {

  const {
    periyotOptions,
    bultenOption,
    kurulusOption,
    aracOption
  } = useSecenekler()


  const handleAddNewRow = () => {
    const yeniPaylasim = {
      id: paylasimlar.length + 1,
      adi: '',
      kurulus: null,
      arac: null,
      gonderilmePeriyodu: null
    }
    setFieldValue('paylasimlar', [...paylasimlar, yeniPaylasim])
  }
  const handleRemoveRow = (key) => {
    const yeniPaylasimlar = paylasimlar.filter((item, index) => index !== key)
    setFieldValue('paylasimlar', yeniPaylasimlar)
  }
  return (
    <Container fluid>
      <CheckedSatir>
        <Col sm={6} md={6} lg={6}>
          <FormGroup inline>
            <Switch name="bultenDurum" label="Haber Bülteni Var mı?" alignIndicator='right'
                    checked={bultenDurum} onChange={handleChange}/>
          </FormGroup>
        </Col>
      </CheckedSatir>
      {bultenDurum && (
        <Satir>
          <Col sm={6} md={6} lg={6}>
            <Field name='bultenler' isClearable placeholder={'Bülten Seçiniz...'}
                   isMulti
                   options={bultenOption}
                   value={formBultenler || null}
                   component={SelectField}/>
          </Col>
        </Satir>
      )}
      <Satir/>
      <CheckedSatir>
        <Col sm={6} md={6} lg={6}>
          <FormGroup inline>
            <Switch name="paylasimDurum" label="Kurum Dışına Gönderiliyor mu?" alignIndicator='right'
                    checked={paylasimDurum} onChange={handleChange}/>
          </FormGroup>
        </Col>
      </CheckedSatir>
      {paylasimDurum &&
      (
        <Satir>
          <Col sm={12} md={12} lg={12}>
            <Kart boy={paylasimlar.length}>
              <HTMLTable striped style={{ width: '100%' }}>
                <thead>
                <tr>
                  <th/>
                  <th><Button icon={'plus'} onClick={() => handleAddNewRow()}/></th>
                  <th>Paylaşım Adı</th>
                  <th>Çıktıların Paylaşıldığı Kurum & Kuruluşlar</th>
                  <th>Gönderilme Aracı</th>
                  <th>Gönderilme Periyodu</th>
                </tr>
                </thead>
                <tbody>
                {paylasimlar.map((value, index) => (
                  <tr key={index}>
                    <td>#{index+1}</td>
                    <td><Button icon={'minus'} onClick={() => handleRemoveRow(index)}/></td>
                    <td><InputGroup large name={`paylasimlar[${index}].adi`} value={value.adi || ''}
                                    onChange={handleChange}/></td>
                    <td><Field name={`paylasimlar[${index}].kurulus`} isClearable value={value.kurulus || null}
                               options={kurulusOption} component={SelectField}/></td>
                    <td><Field name={`paylasimlar[${index}].arac`} isClearable value={value.arac || null}
                               options={aracOption} component={SelectField}/></td>
                    <td><Field name={`paylasimlar[${index}].gonderilmePeriyodu`} isClearable value={value.gonderilmePeriyodu || null}
                               options={periyotOptions}
                               component={SelectField}/></td>
                  </tr>
                ))}
                </tbody>
              </HTMLTable>
            </Kart>
          </Col>
        </Satir>
      )}
    </Container>
  )
}

export default React.memo(UrunCiktiBilgileri)