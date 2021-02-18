import React  from 'react'
import styled from 'styled-components'
import { useRecoilValue } from 'recoil'
import {birimlerState} from '../../store'
import { Button, ButtonGroup, Colors, Divider } from '@blueprintjs/core'
import useSayfaIciGecis from '../../hook/useSayfaIciGecis'
import { Container, Row, Col } from 'react-grid-system'
import { Form, Formik } from 'formik'
import UrunGenelBilgiler from './UrunGenelBilgiler'
import UrunGirdiBilgileri from './UrunGirdiBilgileri'
import UrunCiktiBilgileri from './UrunCiktiBilgileri'
import { durumlar } from '../../hook/ortak'

const Wrapper = styled.div`
  padding: 64px 0;
`
const ButonAlani = styled.div`
  margin: 4px 64px;
  width: 35vw;
`
const Baslik = styled.div`
  font-size: 1em;
  font-weight: 600;
  color: ${Colors.GRAY2};
  padding: 2px 64px;
`
const Satir = styled(Row)`
  padding-left:8px;
`
export default function UrunForm ({seciliUrun, history}) {


  const birimler = useRecoilValue(birimlerState)
  const [
    genel,
    cikti,
    girdi,
    genelSayfaClick,
    ciktiSayfaClick,
    girdiSayfaClick,
  ] = useSayfaIciGecis()

  const seciliUrunBagliUrunler = () => {
    if (seciliUrun && seciliUrun.urunler.length !== 0) {
      return seciliUrun.urunler.map(urun => ({ label: urun.adi, value: urun.id }))
    } else return []
  }

  const seciliUrunAnketler = () => {
    if (seciliUrun && seciliUrun.anketler.length !== 0) {
      return seciliUrun.anketler.map(anket => ({ label: anket.adi, value: anket.id }))
    } else return []
  }
  const seciliUrunIdariKayitlar = () => {
    if (seciliUrun && seciliUrun.idariKayitlar.length !== 0) {
      return seciliUrun.idariKayitlar.map(kayit => ({ label: kayit.adi, value: kayit.id }))
    } else return []
  }

  const seciliUrunCografiDuzey = () => {
    if (seciliUrun && seciliUrun.cografiDuzey) return {
      label: seciliUrun.cografiDuzey.adi,
      value: seciliUrun.cografiDuzey.id
    }
    else return null
  }
  const seciliUrunPeriyot = () => {
    if (seciliUrun && seciliUrun.periyot) return {
      label: seciliUrun.periyot.adi,
      value: seciliUrun.periyot.id
    }
    else return null
  }
  const seciliGrupBaskanligi = () => {
    if(seciliUrun && seciliUrun.birimId !== null && birimler.length !== 0) {
      const seciliBirim = birimler.find(birim => birim.id === seciliUrun.birimId)
      return {label: seciliBirim.adi, value:seciliBirim.id}
    }
    else return null
  }

  const durumBelirleme = (seciliUrun, dizi, nesne1, nesne2) => {
    if(seciliUrun && Array.isArray(dizi) && dizi.length !== 0)
      return nesne1
    else return nesne2
  }

  const initialValues = {
    adi: seciliUrun ? seciliUrun.adi : '',
    kodu: seciliUrun ? seciliUrun.kodu : '',
    periyot: seciliUrunPeriyot() || null,
    cografiDuzey: seciliUrunCografiDuzey() || null,
    zamanlilik: '',
    amac: seciliUrun ? seciliUrun.amac : '',
    kapsam: seciliUrun ? seciliUrun.kapsam : '',
    fayda: seciliUrun ? seciliUrun.fayda : '',
    urunDurum: seciliUrun ? durumBelirleme(seciliUrun, seciliUrun.bagliUrunler, durumlar[0], durumlar[1]):durumlar[1],
    anketDurum:seciliUrun ? durumBelirleme(seciliUrun, seciliUrun.anketler, durumlar[0], durumlar[1]):durumlar[1],
    kayitDurum:seciliUrun ?durumBelirleme(seciliUrun, seciliUrun.idariKayitlar, durumlar[0], durumlar[1]):durumlar[1],
    bultenDurum:seciliUrun ?durumBelirleme(seciliUrun, seciliUrun.bultenler, durumlar[0], durumlar[1]):durumlar[1],
    paylasimDurum:seciliUrun ?durumBelirleme(seciliUrun, seciliUrun.paylasimlar, durumlar[0], durumlar[1]):durumlar[1] ,
    bagliUrunler: seciliUrunBagliUrunler() || [],
    anketler: seciliUrunAnketler() || [],
    idariKayitlar:seciliUrunIdariKayitlar() ||[],
    bultenler:null,
    paylasimlar:[{
      adi:"",
      kurulus:null,
      arac:null,
      periyot:null
    }],
    birim: seciliGrupBaskanligi() ||  null
  }
  const handleSubmit = (event) => {
    event.preventDefault()
  }
  console.debug("initial",initialValues)
  return (
    <Wrapper>
      {seciliUrun && (
        <Baslik> ÜRÜN: {seciliUrun.adi}</Baslik>
      )}
      <ButonAlani>
        <ButtonGroup fill>
          <Button intent={'danger'} minimal={!genel} text={'Genel Bilgiler'} onClick={genelSayfaClick}/>
          <Button intent={'danger'} minimal={!girdi} text={'Girdi Bilgileri'} onClick={girdiSayfaClick}/>
          <Button intent={'danger'} minimal={!cikti} text={'Çıktı Bilgileri'} onClick={ciktiSayfaClick}/>
        </ButtonGroup>
      </ButonAlani>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({
          values,
          handleReset,
          handleChange,
          handleSubmit,
          setFieldValue
        }) =>  (
          <Form onSubmit={handleSubmit}>
            <Container fluid>
              <Row>
                <Col sm={10} md={10} lg={10}/>
                <Col>
                  <Button fill minimal intent={'primary'} text={'İçeriği Temizle'} onClick={handleReset}/>
                </Col>
              </Row>
              <Row>
                <Col><Divider/></Col>
              </Row>
            </Container>
            {genel && (
              <UrunGenelBilgiler
                values={values}
                seciliUrun={seciliUrun}
                handleChange={handleChange}
                setFieldValue={setFieldValue}
              />
            )}
            {girdi && (
              <UrunGirdiBilgileri
                values={values}
              />
            )}
            {cikti && (
              <UrunCiktiBilgileri
                formBultenler={values.bultenler}
                bultenDurum={values.bultenDurum}
                paylasimDurum={values.paylasimDurum}
                paylasimlar={values.paylasimlar}
                handleChange={handleChange}
                setFieldValue={setFieldValue}
              />
            )}
            <Satir>
              <Col sm={10} md={10} lg={10}/>
              <Col>
                <Button intent='danger' text={"Geri Dön"} onClick={history.goBack}/>
              </Col>
              <Col>
                <Button intent='success' text={"Kaydet"}/>
              </Col>
            </Satir>
          </Form>
        )}
      </Formik>
    </Wrapper>
  )
}