import React from 'react'
import { Colors, FormGroup, Switch } from '@blueprintjs/core'
import { Col, Container, Row } from 'react-grid-system'
import { Field } from 'formik'
import SelectField from '../SelectField'
import styled from 'styled-components'
import { localSort } from '../../util/sort'
import { useRecoilValue } from 'recoil'
import { anketlerState, idariKayitlarState, urunlerState } from '../../store'
import handleModal from '../../hook/handleModal'
import FormAnketListe from './FormAnketListe'
import FormIdariKayitListe from './FormIdariKayitListe'

const Satir = styled(Row)`
  padding: 16px 8px;
`

const CheckedSatir = styled(Row)`
  background-color:${Colors.LIGHT_GRAY4};
  padding: 16px 8px;
`

export default function UrunGirdiBilgileri ({ values, handleChange }) {
  const [seciliIdariKayit, setSeciliIdariKayit] = React.useState(null)
  const [seciliAnket, setSeciliAnket] = React.useState(null)

  const [open, handleClickOpenModal, handleClickCloseModal] = handleModal()

  const urunler = localSort(useRecoilValue(urunlerState), 'adi')
  const urunOption = urunler.map(urun => ({ label: urun.adi, value: urun.id }))

  const anketler = localSort(useRecoilValue(anketlerState), 'adi')
  const anketOption = anketler.map(anket => ({ label: anket.adi, value: anket.id }))

  const idariKayitlar = localSort(useRecoilValue(idariKayitlarState), 'adi')
  const kayitOption = idariKayitlar.map(kayit => ({ label: kayit.adi, value: kayit.id }))

  const handleAnketItem = (item) => {
    setSeciliAnket(item)
    handleClickOpenModal()
  }
  const handleKayitItem = (item) => {
    setSeciliIdariKayit(item)
    handleClickOpenModal()
  }
  const seciliAnketItem = seciliAnket && anketler.find(anket => anket.id === seciliAnket.value)
  const seciliIdariKayitItem = seciliIdariKayit && idariKayitlar.find(kayit => kayit.id === seciliIdariKayit.value)

  return (
    <Container>
      <CheckedSatir>
        <Col sm={6} md={6} lg={6}>
          <FormGroup inline>
            <Switch name="urunDurum" label="Başka Bir İstatistiki Ürün Verisi Kullanıyor mu? (Ara Ürün)" alignIndicator='right'
                    checked={values.urunDurum} onChange={handleChange}/>
          </FormGroup>
        </Col>
      </CheckedSatir>
      {values.urunDurum === true && (
        <Satir>
          <Col sm={6} md={6} lg={6}>
            <Field name='bagliUrunler' isClearable isMulti placeholder={'Ürün Seçiniz...'}
                   value={values.bagliUrunler}
                   options={urunOption}
                   component={SelectField}/>
          </Col>
        </Satir>
      )}
      <Satir/>
      <CheckedSatir>
        <Col sm={6} md={6} lg={6}>
          <FormGroup inline>
            <Switch name="anketDurum" label='Anket Verisi Kullanıyor mu?' alignIndicator='right'
                    checked={values.anketDurum} onChange={handleChange}/>
          </FormGroup>
        </Col>
      </CheckedSatir>
      {values.anketDurum === true && (
        <div>
          <Satir>
            <Col sm={6} md={6} lg={6}>
              <Field name='anketler' isClearable isMulti placeholder={'Anket Seçiniz...'}
                     value={values.anketler}
                     options={anketOption}
                     component={SelectField}/>
            </Col>
          </Satir>
          <FormAnketListe
            anketler={values.anketler}
            seciliAnketItem={seciliAnketItem}
            open={open}
            handleClickCloseModal={handleClickCloseModal}
            handleAnketItem={handleAnketItem}
          />
        </div>
      )}
      <Satir/>
      <CheckedSatir>
        <Col sm={6} md={6} lg={6}>
          <FormGroup inline>
            <Switch name="kayitDurum" label='İdari Kayit Verisi Kullanıyor mu?' alignIndicator='right'
                    checked={values.kayitDurum} onChange={handleChange}/>
          </FormGroup>
        </Col>
      </CheckedSatir>
      {values.kayitDurum === true &&  (
        <div>
          <Satir>
            <Col sm={6} md={6} lg={6}>
              <Field name='idariKayitlar' isClearable isMulti placeholder={'İdari Kayıt Seçiniz...'}
                     value={values.idariKayitlar}
                     options={kayitOption}
                     component={SelectField}/>
            </Col>
          </Satir>
          <FormIdariKayitListe
            idariKayitlar={values.idariKayitlar}
            handleKayitItem={handleKayitItem}
            seciliIdariKayitItem={seciliIdariKayitItem}
            open={open}
            handleClickCloseModal={handleClickCloseModal}
          />
        </div>
      )}
    </Container>
  )
}
