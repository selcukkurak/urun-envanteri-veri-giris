import React from 'react'
import { Formik, Form, Field } from 'formik'
import { Row, Container, Col } from 'react-grid-system'
import styled from 'styled-components'
import { AnaRenkler } from '@tuik/renkler'
import { anketlerState, birimlerState, idariKayitlarState, referanslarState } from '../store'
import { useRecoilValue } from 'recoil'
import { localSort } from '../util/sort'
import { Button, Divider, FormGroup, InputGroup, TextArea } from '@blueprintjs/core'
import handleModal from '../hook/handleModal'
import SelectField from './SelectField'
import { uniqBy } from 'lodash'
import FormAnketListe from './FormAnketListe'
import FormIdariKayitListe from './FormIdariKayitListe'
import Axios from 'axios'

const Wrapper = styled.div`
  padding: 64px 0;
`
const Baslik = styled.div`
  font-size: 1.1em;
  color: ${AnaRenkler.kirmizi};
  padding: 8px 64px;
  font-weight: 600;
`
const Satir = styled(Row)`
  padding-top: 16px;
`

const durumlar = [
  { label: 'Evet', value: true },
  { label: 'Hayır', value: false }
]
function UrunEklemeForm (props) {
  const periyotlar = useRecoilValue(referanslarState).PERIYOT
  const periyotOption = periyotlar.map(periyot => ({label:periyot.adi, value:periyot.id}))
  const anketler = localSort(useRecoilValue(anketlerState), 'adi')
  const anketOption = anketler.length !== 0 && anketler.map(anket => ({ label: anket.adi, value: anket.id }))
  const idariKayitlar = uniqBy(localSort(useRecoilValue(idariKayitlarState), 'adi'), 'adi')
  const kayitOption = idariKayitlar.length !== 0 &&  idariKayitlar.map(kayit => ({
    label: kayit.adi,
    value: kayit.id
  }))
  const birimler = useRecoilValue(birimlerState).map(birim => ({ label: birim.adi, value: birim.ustBirimId }))
  const [seciliIdariKayit, setSeciliIdariKayit] = React.useState(null)
  const [seciliAnket, setSeciliAnket] = React.useState(null)
  const [open, handleClickOpenModal, handleClickCloseModal] = handleModal()

  const seciliAnketItem = seciliAnket && anketler.find(anket => anket.id === seciliAnket.value)
  const seciliIdariKayitItem = seciliIdariKayit && idariKayitlar.find(kayit => kayit.id === seciliIdariKayit.value)

  const handleAnketItem = (item) => {
    setSeciliAnket(item)
    handleClickOpenModal()
  }
  const handleKayitItem = (item) => {
    setSeciliIdariKayit(item)
    handleClickOpenModal()
  }

  const urunEkle =  (values) => {
    const seciliPeriyot = periyotlar.find(periyot => periyot.id === values.periyot.value)
    const urun = {
      adi: values.urunAdi,
      birimId:values.birim.value,
      amac: values.amac,
      periyot:seciliPeriyot,
      kapsam: values.kapsam,
      fayda: values.fayda,
      uretiliyor:false,
      taslak:true
    }
    Axios.post('api/urunler/yetkisiz', urun)
      .then(res => {
        console.debug("Ekleme Başarılı:"+ res.data)
      })
      .catch(err => {
        console.error(err)
      })
    props.handleListeSayfaGecis();
  }

  return (
    <Formik
      initialValues={{
        birim: null,
        urunAdi: '',
        periyot: null,
        amac: '',
        kapsam: '',
        fayda: '',
        anketDurum: false,
        anketler: [],
        kayitDurum: false,
        idariKayitlar: []
      }}
      onSubmit={urunEkle}
    >
      {({
        values,
        resetForm,
        handleChange,
        handleSubmit,
      }) => (
        <Wrapper>
          <Form onSubmit={handleSubmit}>
            <Baslik>Yeni İstatistiki Ürün Girişi</Baslik>
            <Container>
              <Row>
                <Col sm={10} md={10} lg={10}></Col>
                <Col>
                  <Button fill minimal intent={'primary'} text={'İçeriği Temizle'} onClick={resetForm}/>
                </Col>
              </Row>
              <Satir>
                <Col sm={12} md={12} lg={12}>
                  <Divider/>
                </Col>
              </Satir>

              <Satir>
                <Col sm={3} md={3} lg={3}>
                  <FormGroup label={'Sorumlu Grup Başkanlığı:'}/>
                </Col>
                <Col sm={3} md={3} lg={3}>
                  <Field name='birim' isClearable values={values.birim || null} options={birimler}
                         component={SelectField}/>
                </Col>
              </Satir>
              <Satir>
                <Col sm={3} md={3} lg={3}>
                  <FormGroup label={'Talep Edilen İstatistiki Ürün Adı:'}/>
                </Col>
                <Col>
                  <InputGroup type="text" name="urunAdi" value={values.urunAdi || ''} onChange={handleChange}/>
                </Col>
              </Satir>
              <Satir>
                <Col sm={3} md={3} lg={3}>
                  <FormGroup label={'Planlanan Üretim Sıklığı:'}/>
                </Col>
                <Col sm={3} md={3} lg={3}>
                  <Field name='periyot' isClearable values={values.periyot || null} options={periyotOption}
                         component={SelectField}/>
                </Col>
              </Satir>
              <Satir>
                <Col sm={3} md={3} lg={3}>
                  <FormGroup label={'Ürünün Amacı:'}/>
                </Col>
                <Col>
                  <TextArea fill name={'amac'} value={values.amac || ''} onChange={handleChange}/>
                </Col>
              </Satir>
              <Satir>
                <Col sm={3} md={3} lg={3}>
                  <FormGroup label={'Ürünün Kapsamı:'}/>
                </Col>
                <Col>
                  <TextArea fill name={'kapsam'} value={values.kapsam || ''} onChange={handleChange}/>
                </Col>
              </Satir>
              <Satir>
                <Col sm={3} md={3} lg={3}>
                  <FormGroup label={'Ürünün Yayınlanmasının Sağlayacağı Fayda:'}/>
                </Col>
                <Col>
                  <TextArea fill name={'fayda'} value={values.fayda || ''} onChange={handleChange}/>
                </Col>
              </Satir>
              <Satir>
                <Col sm={3} md={3} lg={3}>
                  <FormGroup label={'Anket Çalışması Kullanılacak mı?'}/>
                </Col>
                <Col sm={3} md={3} lg={3}>
                  <Field name='anketDurum' isClearable value={values.anketDurum} options={durumlar}
                         component={SelectField}/>
                </Col>
              </Satir>
              {values.anketDurum && (
                <div>
                  <Satir>
                    <Col sm={3} md={3} lg={3}>
                      <FormGroup label={'Anket Seçiniz:'}/>
                    </Col>
                    <Col>
                      <Field
                        name='anketler'
                        isMulti
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
              <Satir>
                <Col sm={3} md={3} lg={3}>
                  <FormGroup label={'İdari Kayıt Verisi Kullanılacak mı?'}/>
                </Col>
                <Col sm={3} md={3} lg={3}>
                  <Field name='kayitDurum' isClearable value={values.kayitDurum} options={durumlar}
                         component={SelectField}/>
                </Col>
              </Satir>
              {values.kayitDurum && (
                <div>
                  <Satir>
                    <Col sm={3} md={3} lg={3}>
                      <FormGroup label={'İdari Kayıt Seçiniz:'}/>
                    </Col>
                    <Col>
                      <Field
                        name='idariKayitlar'
                        isMulti
                        options={kayitOption}
                        value={values.idariKayitlar}
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
              <Satir>
                <Col md={4}></Col>
                <Col md={4}></Col>
                <Col>
                  <Button intent={'danger'} text={'Geri Dön'} fill onClick={props.handleListeSayfaGecis}/>
                </Col>
                <Col>
                  <Button fill intent={'success'} text={'Ürün Talebi Oluştur'} onClick={() => urunEkle(values)} />
                </Col>
              </Satir>
            </Container>
          </Form>
        </Wrapper>
      )}
    </Formik>
  )
}

export default React.memo(UrunEklemeForm)