import React, { useState } from 'react'
import { localSort } from '../util/sort'
import { useRecoilValue } from 'recoil'
import {  tumUrunlerState, urunlerState } from '../store'
import { Container, Row, Col } from 'react-grid-system'
import { Link } from 'react-router-dom'
import Liste from './Liste'
import {
  AramaAlani,
  BaslikMetin, EklemeButton,
  FiltreButonAlani,
  ListeBaslik,
  SagaYasli, SayiGosterge,
  SolaYasli,
  WrapperListe
} from './ortakStyle'
import Arama from './Arama'
import { taslakDurumlar } from './ortak'
import useYanMenu from '../yan-menu/useYanMenu'




export default function UrunListe ({ match }) {
  const {boy} = useYanMenu()
  const [secili, setSecili] = useState(taslakDurumlar[0])
  const [aranan, setAranan] = useState("")

  const urunler = localSort(useRecoilValue(urunlerState), 'adi')
    .filter(urun => urun.adi.toLowerCase().includes(aranan.toLowerCase()))
  const tumUrunler = localSort(useRecoilValue(tumUrunlerState), 'adi')
    .filter(urun => urun.adi.toLowerCase().includes(aranan.toLowerCase()))
  const taslakUrunler = tumUrunler.filter(urun => urun.taslak)
    .filter(urun => urun.adi.toLowerCase().includes(aranan.toLowerCase()))

  const [seciliUrunId, setSeciliUrunId] = useState(0)

  const handleSeciliItem = (key) => {
    setSeciliUrunId(key)
  }

  return (
    <WrapperListe>
      <Container fluid>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <FiltreButonAlani boy={boy}>
              <AramaAlani>
                <Arama setAranan={setAranan} placeholder={"Ürünler İçinde Arayın...."}
                       secili={secili} setSecili={setSecili} setSeciliId={setSeciliUrunId}
                />
              </AramaAlani>
              <Link to={`${match.url}/yeni-urun`}>
                <EklemeButton intent={'success'} text={'Yeni Ürün Ekle'}/>
              </Link>
            </FiltreButonAlani>

            <ListeBaslik>
              <SolaYasli>İstatistiki Ürünler</SolaYasli>
              <SagaYasli>
                <BaslikMetin>TOPLAM</BaslikMetin>
                <SayiGosterge>{secili.durum === 0 ? tumUrunler.length : secili.durum === 2 ? urunler.length : taslakUrunler.length}</SayiGosterge>
              </SagaYasli>
            </ListeBaslik>
            {secili.durum === 0 ? (
              <Liste
                dizi={tumUrunler}
                url={match.url}
                secili={seciliUrunId}
                handleSeciliItem={handleSeciliItem}
              />
            ) : (
              secili.durum === 1 ? (
                <Liste
                  dizi={taslakUrunler}
                  url={match.url}
                  secili={seciliUrunId}
                  handleSeciliItem={handleSeciliItem}
                />
              ) : (
                <Liste
                  dizi={urunler}
                  url={match.url}
                  secili={seciliUrunId}
                  handleSeciliItem={handleSeciliItem}
                />
              )
            )}
          </Col>
        </Row>
      </Container>
    </WrapperListe>
  )
}
