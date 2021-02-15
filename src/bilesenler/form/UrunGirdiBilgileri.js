import React from 'react'
import { Colors, FormGroup } from '@blueprintjs/core'
import { Col, Container, Row } from 'react-grid-system'
import { Field } from 'formik'
import { durumlar } from '../hook/ortak'
import SelectField from './SelectField'
import styled from 'styled-components'
import { localSort } from '../util/sort'
import { useRecoilValue } from 'recoil'
import { anketlerState, idariKayitlarState, urunlerState } from '../store'
import handleModal from '../hook/handleModal'
import FormAnketListe from './FormAnketListe'
import FormIdariKayitListe from './FormIdariKayitListe'

const Satir = styled(Row)`
  padding: 16px 8px;
`
function UrunGirdiBilgileri({values, seciliUrun}){
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

  const seciliAnketDurum = () => {
    if(seciliUrun && seciliUrun.anketler.length !==0 ) return durumlar[0]
    else return values.anketDurum
  }
  const seciliBagliUrunDurum = () => {
    if(seciliUrun && seciliUrun.bagliUrunler.length !== 0) return durumlar[0]
    else return values.urunDurum
  }

  return (
    <Container>
      <Satir style={{ backgroundColor: Colors.LIGHT_GRAY4 }}>
        <Col sm={3} md={3} lg={3}><FormGroup
          label={'Başka Bir İstatistiki Ürün Verisi Kullanıyor mu? (Ara Ürün)'}/></Col>
        <Col sm={3} md={3} lg={3}>
          <Field name='urunDurum' isClearable  value={seciliBagliUrunDurum} options={durumlar}
                 component={SelectField}/>
        </Col>
      </Satir>
      {values.urunDurum && values.urunDurum.value && (
        <Satir>
          <Col sm={6} md={6} lg={6}>
            <Field name='bagliUrunler' isClearable isMulti placeholder={'Ürün Seçiniz...'}
                   value={values.bagliUrunler}
                   options={urunOption}
                   component={SelectField}/>
          </Col>
        </Satir>
      )}
      <Satir></Satir>
      <Satir style={{ backgroundColor: Colors.LIGHT_GRAY4 }}>
        <Col sm={3} md={3} lg={3}><FormGroup
          label={'Anket Verisi Kullanıyor mu?'}/></Col>
        <Col sm={3} md={3} lg={3}>
          <Field name='anketDurum' isClearable value={seciliAnketDurum} options={durumlar}
                 component={SelectField}/>
        </Col>
      </Satir>
      {values.anketDurum && values.anketDurum.value &&  (
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
      <Satir></Satir>
      <Satir style={{ backgroundColor: Colors.LIGHT_GRAY4 }}>
        <Col sm={3} md={3} lg={3}><FormGroup
          label={'İdari Kayit Verisi Kullanıyor mu?'}/></Col>
        <Col sm={3} md={3} lg={3}>
          <Field name='kayitDurum' isClearable value={values.kayitDurum} options={durumlar}
                 component={SelectField}/>
        </Col>
      </Satir>
      {values.kayitDurum && values.kayitDurum.value && (
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
export default React.memo(UrunGirdiBilgileri)