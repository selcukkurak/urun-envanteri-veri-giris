import React  from 'react'
import styled from 'styled-components'
import { useRecoilValue } from 'recoil'
import { birimlerState } from '../../store'
import { Button, ButtonGroup, Colors, Divider } from '@blueprintjs/core'
import useSayfaIciGecis from '../../hook/useSayfaIciGecis'
import { Container, Row, Col } from 'react-grid-system'
import { Form, Formik } from 'formik'
import UrunGenelBilgiler from './UrunGenelBilgiler'
import UrunGirdiBilgileri from './UrunGirdiBilgileri'
import UrunCiktiBilgileri from './UrunCiktiBilgileri'

const Wrapper = styled.div`
  padding: 64px 4px;
`
const ButonAlani = styled.div`
  margin: 4px 64px;
  width: 85vw;
  display: flex;
`
const Baslik = styled.div`
  font-size: 1em;
  font-weight: 600;
  color: ${Colors.GRAY2};
  padding: 2px 64px;
`
const Satir = styled(Row)`
  margin:16px 8px;
`
const ButonGrup = styled(ButtonGroup)`
  flex:1;
  max-width: 35vw;
  width: 35vw;
`
const IcerikTemizleButon = styled(Button)`
  margin-left: 40%;
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


  const seciliUrunItems = (dizi) => {
    if (seciliUrun && dizi  && dizi.length !== 0) {
      return dizi.map(item => ({ label: item.adi, value: item.id }))
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


  const initialValues = {
    adi: seciliUrun ? seciliUrun.adi : '',
    kodu: seciliUrun ? seciliUrun.kodu : '',
    periyot: seciliUrunPeriyot() || null,
    cografiDuzey: seciliUrunCografiDuzey() || null,
    zamanlilik: '',
    amac: seciliUrun ? seciliUrun.amac : '',
    kapsam: seciliUrun ? seciliUrun.kapsam : '',
    fayda: seciliUrun ? seciliUrun.fayda : '',
    urunDurum: seciliUrun ? (!!seciliUrun.bagliUrunler) : false,
    anketDurum:seciliUrun ? seciliUrun.anketler.length !== 0 : false,
    kayitDurum:seciliUrun ? seciliUrun.idariKayitlar.length !== 0 : false,
    bultenDurum:seciliUrun ? seciliUrun.bultenler.length !== 0 : false,
    paylasimDurum:seciliUrun ? seciliUrun.paylasimlar.length !== 0 : false,
    bagliUrunler:seciliUrun ? seciliUrunItems(seciliUrun.bagliUrunler) : [],
    anketler: seciliUrun ?  seciliUrunItems(seciliUrun.anketler) : [],
    idariKayitlar: seciliUrun ? seciliUrunItems(seciliUrun.idariKayitlar) :[],
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
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({
          values,
          resetForm,
          handleChange,
          handleSubmit,
          setFieldValue
        }) =>  (
          <Form onSubmit={handleSubmit}>
            {console.log(values)}
            <ButonAlani>
              <ButonGrup fill>
                <Button intent={'danger'} minimal={!genel} text={'Genel Bilgiler'} onClick={genelSayfaClick}/>
                <Button intent={'danger'} minimal={!girdi} text={'Girdi Bilgileri'} onClick={girdiSayfaClick}/>
                <Button intent={'danger'} minimal={!cikti} text={'Çıktı Bilgileri'} onClick={ciktiSayfaClick}/>
              </ButonGrup>
              <IcerikTemizleButon minimal intent={'primary'} text={'İçeriği Temizle'} onClick={resetForm}/>
            </ButonAlani>
            <Container fluid>
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
                handleChange={handleChange}
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
              <Col sm={8} md={8} lg={8}/>
              <Col>
                <Button fill intent='danger' text={"Geri Dön"} onClick={history.goBack}/>
              </Col>
              <Col>
                <Button fill intent='success' text={"Kaydet"}/>
              </Col>
            </Satir>
          </Form>
        )}
      </Formik>
    </Wrapper>
  )
}