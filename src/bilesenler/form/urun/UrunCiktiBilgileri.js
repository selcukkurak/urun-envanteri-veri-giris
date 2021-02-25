import React from 'react'
import { useRecoilValue } from 'recoil'
import { tekilBultenler } from '../../store/selectors'
import { Col, Container, Row } from 'react-grid-system'
import styled from 'styled-components'
import { Button, Colors, FormGroup, HTMLTable, InputGroup, Switch } from '@blueprintjs/core'
import { Field } from 'formik'
import SelectField from '../SelectField'
import { localSort } from '../../util/sort'
import { referanslarState } from '../../store'

const Satir = styled(Row)`
  padding: 16px 8px;
`
const CheckedSatir = styled(Row)`
  background-color:${Colors.LIGHT_GRAY4};
  padding: 16px 8px;
`

function UrunCiktiBilgileri ({ bultenDurum, formBultenler, paylasimDurum, paylasimlar, handleChange, setFieldValue }) {
  const bultenler = useRecoilValue(tekilBultenler)
  const bultenOption = bultenler.map(bulten => ({ label: bulten.adi, value: bulten.id }))

  const kuruluslar = localSort(useRecoilValue(referanslarState).KURULUS, 'adi')
  const kurulusOption = kuruluslar.map(kurulus => ({ label: kurulus.adi, value: kurulus.id }))

  const araclar = useRecoilValue(referanslarState).ARAC
  const aracOption = araclar.map(arac => ({ label: arac.adi, value: arac.id }))

  const periyotlar = useRecoilValue(referanslarState).PERIYOT
  const periyotOption = periyotlar.map(periyot => ({ label: periyot.adi, value: periyot.id }))

  const handleAddNewRow = () => {
    const yeniPaylasim = {
      adi: "",
      kurulus: null,
      arac:null,
      gonderilmePeriyodu: null
    }
    setFieldValue('paylasimlar', [...paylasimlar, yeniPaylasim])
  }
  const handleRemoveRow = (key) => {
    const yeniPaylasimlar = paylasimlar.filter((item, index) => index !==key)
    setFieldValue('paylasimlar', yeniPaylasimlar)
  }
  return (
    <Container>
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
            <Field name='bagliUrunler' isClearable placeholder={'Bülten Seçiniz...'}
                   value={formBultenler}
                   options={bultenOption}
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
            <HTMLTable striped style={{ width: '100%' }}>
              <thead>
              <tr>
                <th><Button icon={'plus'} onClick={() => handleAddNewRow()}/></th>
                <th style={{width:"80px"}}>Sıra No</th>
                <th>Paylaşım Adı</th>
                <th>Çıktıların Paylaşıldığı Kurum & Kuruluşlar</th>
                <th>Gönderilme Aracı</th>
                <th>Gönderilme Periyodu</th>
              </tr>
              </thead>
              <tbody>
              {paylasimlar.map((value, index) => (
                <tr key={index} style={{alignItems:"center"}}>
                  <td style={{width:"80px"}}><Button icon={'minus'} onClick={() => handleRemoveRow(index)} /></td>
                  <td style={{fontWeight:"600", textAlign:"center"}}>{index+1}</td>
                  <td><InputGroup large name={`${value}.adi`} value={value.adi || ''} onChange={handleChange}/></td>
                  <td><Field name={`${value}.kurulus`} isClearable values={value.kurulus || null} options={kurulusOption}
                             component={SelectField}/></td>
                  <td><Field name={`${value}.arac`} isClearable values={value.arac || null} options={aracOption}
                             component={SelectField}/></td>
                  <td><Field name={`${value}.periyot`} isClearable values={value.periyot || null}
                             options={periyotOption}
                             component={SelectField}/></td>
                </tr>
              ))}
              </tbody>
            </HTMLTable>
          </Col>
        </Satir>
      )}
    </Container>
  )
}

export default React.memo(UrunCiktiBilgileri)