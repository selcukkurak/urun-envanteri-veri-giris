import React, { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { idariKayitlarState } from '../store'
import Liste from './Liste'
import { localSort } from '../util/sort'
import { Col, Container, Row } from 'react-grid-system'
import {
  AramaAlani,
  BaslikMetin,
  ButonDurumAlani, DetayAlani, DetayBaslik,
  FiltreButonAlani, Icerik, IcerikAlani,
  ListeBaslik,
  SagaYasli,
  SayiGosterge,
  SolaYasli, WrapperListe
} from './ortakStyle'
import { Link } from 'react-router-dom'
import { Button, Card } from '@blueprintjs/core'
import styled from 'styled-components'
import { siraliKurumlar } from '../store/selectors'
import Arama from './Arama'
import IdariKayitTabloListe from './IdariKayitTabloListe'


const DetayKart = styled(Card)`
  padding: 0;

`

export default function IdariKayitListe ({ match }) {
  const [aranan, setAranan] = useState('')
  const idariKayitlar = localSort(useRecoilValue(idariKayitlarState), 'adi')
    .filter(kayit => kayit.adi.toLowerCase().includes(aranan.toLowerCase()))
  const [seciliKayitId, setSeciliKayitId] = useState(0)

  const seciliKayit = idariKayitlar.find((kayit, index) => index === seciliKayitId)


  const kurumlar = useRecoilValue(siraliKurumlar)
  const kurum = seciliKayit && kurumlar.find(k => k.kodu === seciliKayit.kaynakKurumId)

  const handleSeciliItem = (key) => {
    setSeciliKayitId(key)
  }
  return (
    <WrapperListe>
      <Container fluid>
        <Row>
          <Col sm={12} md={12} lg={6}>
            <FiltreButonAlani>
              <ButonDurumAlani/>
              <Link to={`${match.url}/yeni-idariKayit`}>
                <Button intent={'success'} text={'Yeni İdari Kayıt Ekle'}/>
              </Link>
            </FiltreButonAlani>
            <AramaAlani>
              <Arama aranan={aranan} setAranan={setAranan} placeholder={'İdari Kayıtlar İçinde Arayın....'}/>
            </AramaAlani>
            <ListeBaslik>
              <SolaYasli>İdari Kayıtlar</SolaYasli>
              <SagaYasli>
                <BaslikMetin>TOPLAM</BaslikMetin>
                <SayiGosterge>{idariKayitlar.length}</SayiGosterge>
              </SagaYasli>
            </ListeBaslik>
            <Liste
              dizi={idariKayitlar}
              url={match.url}
              secili={seciliKayitId}
              handleSeciliItem={handleSeciliItem}
            />
          </Col>
          <Col>
            {seciliKayit && (
              <div>
                <IdariKayitTabloListe
                  match={match}
                  seciliKayit={seciliKayit}
                />
                <DetayAlani>
                  <DetayKart>
                    <IcerikAlani>
                      <DetayBaslik>İdari Kayıt Kodu:</DetayBaslik>
                      <Icerik>{seciliKayit.id}</Icerik>
                      <DetayBaslik>Kaynak Kurum:</DetayBaslik>
                      <Icerik>{kurum && kurum.adi}</Icerik>
                    </IcerikAlani>
                    <IcerikAlani>
                      <DetayBaslik>Kaynak Birim:</DetayBaslik>
                      <Icerik>{seciliKayit.kaynakBirim}</Icerik>
                    </IcerikAlani>
                    <IcerikAlani>
                      <DetayBaslik style={{ flex: '0 1 22%' }}>Yasal Hükümler:</DetayBaslik>
                      <Icerik>{seciliKayit.yasalHukum}</Icerik>
                    </IcerikAlani>
                    <IcerikAlani>
                      <DetayBaslik>Veri Biçimi:</DetayBaslik>
                      <Icerik>{seciliKayit.bicim && seciliKayit.bicim.adi}</Icerik>
                      <DetayBaslik>Düzey:</DetayBaslik>
                      <Icerik>{seciliKayit.veriDuzeyi && seciliKayit.veriDuzeyi.adi}</Icerik>
                    </IcerikAlani>
                    <IcerikAlani>
                      <DetayBaslik>Veri Talep Biçimi:</DetayBaslik>
                      <Icerik>{seciliKayit.talepBicimi && seciliKayit.talepBicimi.adi}</Icerik>
                      <DetayBaslik>Transfer Sıklık:</DetayBaslik>
                      <Icerik>{seciliKayit.transferPeriyot && seciliKayit.transferPeriyot.adi}</Icerik>
                    </IcerikAlani>
                    <IcerikAlani>
                      <DetayBaslik>Aktarım Türü:</DetayBaslik>
                      <Icerik>{seciliKayit.aktarimTuru && seciliKayit.aktarimTuru.adi}</Icerik>
                      <DetayBaslik>Transfer Sorumlu Birim:</DetayBaslik>
                      <Icerik>{seciliKayit.transferdenSorumluBirim}</Icerik>
                    </IcerikAlani>
                    <IcerikAlani>
                      <DetayBaslik>Hedef TÜİK Veritabanı:</DetayBaslik>
                      <Icerik>{seciliKayit.veritabani}</Icerik>
                      <DetayBaslik>Hedef TÜİK Şema:</DetayBaslik>
                      <Icerik>{seciliKayit.sema}</Icerik>
                    </IcerikAlani>
                    <IcerikAlani>
                      <DetayBaslik style={{ flex: '0 1 22%' }}>İletişim E-posta Grubu:</DetayBaslik>
                      <Icerik>{seciliKayit.epostaGruplari}</Icerik>
                    </IcerikAlani>
                  </DetayKart>
                </DetayAlani>

              </div>
            )}
          </Col>
        </Row>
      </Container>
    </WrapperListe>
  )
}
