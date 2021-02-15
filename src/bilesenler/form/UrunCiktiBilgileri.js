import React from 'react'
import { useRecoilValue } from 'recoil'
import { tekilBultenler } from '../store/selectors'
import { Col, Container, Row } from 'react-grid-system'
import styled from 'styled-components'
import { Colors, FormGroup } from '@blueprintjs/core'
import { Field } from 'formik'
import { durumlar } from '../hook/ortak'
import SelectField from './SelectField'

const Satir = styled(Row)`
  padding: 16px 8px;
`
function UrunCiktiBilgileri({values}){
  const bultenler = useRecoilValue(tekilBultenler)
  const bultenOption = bultenler.map(bulten => ({label:bulten.adi, value:bulten.id}))
  return(
    <Container>
      <Satir style={{ backgroundColor: Colors.LIGHT_GRAY4 }}>
        <Col sm={3} md={3} lg={3}><FormGroup
          label={'Haber Bülteni Var mı?'}/></Col>
        <Col sm={3} md={3} lg={3}>
          <Field name='bultenDurum' isClearable value={values.bultenDurum || null} options={durumlar}
                 component={SelectField}/>
        </Col>
      </Satir>
      {values.bultenDurum && values.bultenDurum.value && (
        <Satir>
          <Col sm={6} md={6} lg={6}>
            <Field name='bagliUrunler' isClearable placeholder={'Bülten Seçiniz...'}
                   value={values.bultenler}
                   options={bultenOption}
                   component={SelectField}/>
          </Col>
        </Satir>
      )}
    </Container>
  )
}
export default React.memo(UrunCiktiBilgileri)