import React, { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { anketlerState } from '../store'
import Liste from './Liste'
import { localSort } from '../util/sort'
import { Button } from '@blueprintjs/core'
import { Col, Container, Row } from 'react-grid-system'
import { Link } from 'react-router-dom'
import {
  AramaAlani,
  BaslikMetin,
  ButonDurumAlani, DetayBaslik,
  FiltreButonAlani, Icerik,
  IcerikAlani,
  ListeBaslik,
  SagaYasli, SayiGosterge,
  SolaYasli,
  WrapperListe
} from './ortakStyle'
import styled from 'styled-components'
import { AnaRenkler } from '@tuik/renkler'
import Arama from './Arama'

const Baslik = styled.div`
  text-align: center;
  color: ${AnaRenkler.kirmizi};
  font-size: 1.4em;
  font-weight: bold;
  margin-top: 20px;
`
export default function AnketListe ({ match }) {
  const [aranan, setAranan] = useState("")
  const anketler = localSort(useRecoilValue(anketlerState), 'adi')
    .filter(anket => anket.adi.toLowerCase().includes(aranan.toLowerCase()))
  const [seciliAnketId, setSeciliAnketId] = useState(0)
  const handleSeciliItem = (key) => {
    setSeciliAnketId(key)
  }
  const seciliAnket = anketler.find((anket, index) => index === seciliAnketId)
  const ustDurumu = seciliAnket && seciliAnket.ustDurumu
    ? seciliAnket.ustDurumu === 1 ? 'Evet' : 'Hayır'
    : 'Belirtilmemiş'

  const harzemliDurumu = seciliAnket && seciliAnket.harzemliDurumu
    ? seciliAnket.harzemliDurumu === 1 ? 'Evet' : 'Hayır'
    : 'Belirtilmemiş'

  return (
    <WrapperListe>
      <Container>
        <Row>
          <Col sm={6} md={6} lg={6}>
            <FiltreButonAlani>
              <ButonDurumAlani/>
              <Link to={`${match.url}/yeni-anket`}>
                <Button intent={'success'} text={'Yeni Anket Ekle'}/>
              </Link>
            </FiltreButonAlani>
            <AramaAlani>
              <Arama aranan={aranan} setAranan={setAranan} placeholder={"Anketler İçinde Arayın...."}/>
            </AramaAlani>
            <ListeBaslik>
              <SolaYasli>Anketler</SolaYasli>
              <SagaYasli>
                <BaslikMetin>TOPLAM</BaslikMetin>
                <SayiGosterge>{anketler.length}</SayiGosterge>
              </SagaYasli>
            </ListeBaslik>
            <Liste
              dizi={anketler}
              url={match.url}
              secili={seciliAnketId}
              handleSeciliItem={handleSeciliItem}
            />
          </Col>
          <Col>
            {seciliAnket && (
              <div>
                <Baslik>Detaylar</Baslik>
                <div style={{ marginLeft: '10%' }}>
                  <IcerikAlani>
                    <DetayBaslik>Periyodu:</DetayBaslik>
                    <Icerik>{seciliAnket.periyot ? seciliAnket.periyot.adi : '-'}</Icerik>
                    <DetayBaslik>Veri Düzeyi:</DetayBaslik>
                    <Icerik>{seciliAnket.birimDuzeyi ? seciliAnket.birimDuzeyi.adi : '-'}</Icerik>
                  </IcerikAlani>
                  <IcerikAlani>
                    <DetayBaslik>Örneklem Boyutu:</DetayBaslik>
                    <Icerik>{seciliAnket.orneklemSayisi}</Icerik>
                    <DetayBaslik>Coğrafi Düzeyi:</DetayBaslik>
                    <Icerik>{seciliAnket.cografiDuzey ? seciliAnket.cografiDuzey.adi : '-'}</Icerik>
                  </IcerikAlani>
                  <IcerikAlani>
                    <DetayBaslik>Şeması:</DetayBaslik>
                    <Icerik>{seciliAnket.sema}</Icerik>
                    <DetayBaslik>Üst Durumu:</DetayBaslik>
                    <Icerik>{ustDurumu}</Icerik>
                  </IcerikAlani>
                  <IcerikAlani>
                    <DetayBaslik style={{ flex: '0 1 21%' }}>Harzemli Durumu:</DetayBaslik>
                    <Icerik>{harzemliDurumu}</Icerik>
                  </IcerikAlani>
                </div>

              </div>
            )}
          </Col>

        </Row>
      </Container>
    </WrapperListe>
  )
}
