import React from 'react'
import styled from 'styled-components'
import { useRecoilValue } from 'recoil'
import { birimlerState, bultenlerState } from '../../store'
import { Button, ButtonGroup, Divider } from '@blueprintjs/core'
import useSayfaIciGecis from '../../hook/useSayfaIciGecis'
import { Container, Row, Col } from 'react-grid-system'
import { Form, Formik } from 'formik'
import UrunGenelBilgiler from './UrunGenelBilgiler'
import UrunGirdiBilgileri from './UrunGirdiBilgileri'
import UrunCiktiBilgileri from './UrunCiktiBilgileri'
import UrunMetaveriForm from './UrunMetaveriForm'
import { PersistFormikValues } from 'formik-persist-values'
import { deleteLocalStorage } from '../ortak'
import Footer from '../Footer'
import UrunAPI from '../../servisler/UrunAPI'
import useYanMenu from '../../yan-menu/useYanMenu'

const Wrapper = styled.div`
  padding: 64px 16px;
`

const ButonGrup = styled(ButtonGroup)`
  margin: 4px 16px;
  display: grid;
  grid-template-columns: ${props => props.boy <750  ? "auto auto auto auto" : "15% 15% 15% 15%"};
`

export default function UrunForm ({ seciliUrun, history }) {
  const { boy } = useYanMenu()
  // const setUrunler = useSetRecoilState(urunlerState)
  const birimler = useRecoilValue(birimlerState)
  const bultenler = useRecoilValue(bultenlerState)
  const {
    genel,
    cikti,
    girdi,
    metaveriSayfa,
    metaveriSayfaClick,
    genelSayfaClick,
    ciktiSayfaClick,
    girdiSayfaClick,
  } = useSayfaIciGecis()

  const seciliUrunItems = (dizi) => {
    if (seciliUrun && dizi && dizi.length !== 0) {
      return dizi.map(item => ({ label: item.adi, value: item.id }))
    } else return []
  }

  const seciliUrunHaberBulteni = () => {
    if (seciliUrun) {
      return seciliUrun.bultenler
        .map(b => bultenler.find(bulten => bulten.id === b.bultenId))
        .filter(bulten => !!bulten)
        .map(bulten => ({ label: bulten.adi, value: bulten.id }))
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
    if (seciliUrun && seciliUrun.birimId !== null && birimler.length !== 0) {
      const seciliBirim = birimler.find(birim => birim.id === seciliUrun.birimId)
      return { label: seciliBirim.adi, value: seciliBirim.id }
    } else return null
  }

  const initialValues = {
    adi: seciliUrun ? seciliUrun.adi : '',
    kodu: seciliUrun ? seciliUrun.kodu : '',
    periyot: seciliUrunPeriyot() || null,
    cografiDuzey: seciliUrunCografiDuzey() || null,
    zamanlilik: seciliUrun ? seciliUrun.zamanlilik : '',
    amac: seciliUrun ? seciliUrun.amac : '',
    kapsam: seciliUrun ? seciliUrun.kapsam : '',
    fayda: seciliUrun ? seciliUrun.fayda : '',
    urunDurum: seciliUrun ? seciliUrun.urunler !== 0 : false,
    anketDurum: seciliUrun ? seciliUrun.anketler.length !== 0 : false,
    kayitDurum: seciliUrun ? seciliUrun.idariKayitlar.length !== 0 : false,
    bultenDurum: seciliUrun ? seciliUrun.bultenler.length !== 0 : false,
    paylasimDurum: seciliUrun ? seciliUrun.paylasimlar.length !== 0 : false,
    bagliUrunler: seciliUrun ? seciliUrunItems(seciliUrun.urunler) : [],
    anketler: seciliUrun ? seciliUrunItems(seciliUrun.anketler) : [],
    idariKayitlar: seciliUrun ? seciliUrunItems(seciliUrun.idariKayitlar) : [],
    bultenler: seciliUrunHaberBulteni() || [],
    paylasimlar:
      seciliUrun ? seciliUrun.paylasimlar.map(item => ({
        id: item.id,
        adi: item.adi,
        kurulus: { label: item.kurulus.adi, value: item.kurulus.id },
        arac: { label: item.arac.adi, value: item.arac.id },
        gonderilmePeriyodu: { label: item.periyot.adi, value: item.periyot.id },
      })) : [{
        id: 0,
        adi: '',
        kurulus: null,
        arac: null,
        gonderilmePeriyodu: null
      }],
    birim: seciliGrupBaskanligi() || null,
    metaveriler: []
  }

  const urunEkle = (values) => {
    const yeniUrun = {
      adi: values.adi,
      kodu: values.kodu,
      periyot: values.periyot,
      cografiDuzey: values.cografiDuzey,
      zamanlilik: values.zamanlilik,
      amac: values.amac,
      kapsam: values.kapsam,
      fayda: values.fayda,
      birim: values.birim && values.birim.value,
    }

    console.log('ürün', values)

    const response = UrunAPI.urunEklemeIstek(yeniUrun)
    console.log('response', response)

    // if(response.data.success){
    //   setUrunler(response.data)
    //   history.goBack()
    //   return (
    //     basariMesajiYayinla("Ekleme İşlemi Başarılı!")
    //   )
    // }
  }
  const handleSubmit = (event) => {
    event.preventDefault()
  }
  console.debug('initial', initialValues)
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      {({
        values,
        handleChange,
        handleSubmit,
        setFieldValue,
      }) => (
        <Wrapper>
          <Form onSubmit={handleSubmit}>
            <ButonGrup boy={boy}>
              <Button intent={'danger'} minimal={!genel} text={'Genel Bilgiler'} onClick={genelSayfaClick}/>
              <Button intent={'danger'} minimal={!metaveriSayfa} text={'Metaveri Bilgileri'}
                      onClick={metaveriSayfaClick}/>
              <Button intent={'danger'} minimal={!girdi} text={'Girdi Bilgileri'} onClick={girdiSayfaClick}/>
              <Button intent={'danger'} minimal={!cikti} text={'Çıktı Bilgileri'} onClick={ciktiSayfaClick}/>
            </ButonGrup>
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
            {metaveriSayfa && (
              <UrunMetaveriForm
                metaveriler={values.metaveriler}
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
            <Footer>
              <Col sm={0} md={0} lg={7}/>
              <Col>
                <Button fill intent='danger' text={'Geri Dön'} onClick={() => deleteLocalStorage(history)}/>
              </Col>
              <Col>
                <Button fill intent='success' text={seciliUrun ? 'Güncelle' : 'Kaydet'}
                        onClick={() => urunEkle(values)}/>
              </Col>
            </Footer>
            <PersistFormikValues name="urun-form" persistInvalid hashInitials/>
          </Form>
        </Wrapper>
      )}
    </Formik>
  )
}