import React, { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { idariKayitlarState } from '../store'
import Liste from './Liste'
import { localSort } from '../util/sort'
import { AnaRenkler } from '@tuik/renkler'
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
import { Button } from '@blueprintjs/core'
import styled from 'styled-components'
import { siraliKurumlar } from '../store/selectors'
import Arama from './Arama'

const Baslik = styled.div`
  text-align: center;
  color: ${AnaRenkler.kirmizi};
  font-size: 1.4em;
  font-weight: bold;
  margin-top: 20px;
`

export default function IdariKayitListe ({ match }) {
  const [aranan, setAranan] = useState("")
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
      <Container>
        <Row>
          <Col sm={6} md={6} lg={6}>
            <FiltreButonAlani>
              <ButonDurumAlani/>
              <Link to={`${match.url}/yeni-idariKayit`}>
                <Button intent={'success'} text={'Yeni İdari Kayıt Ekle'}/>
              </Link>
            </FiltreButonAlani>
            <AramaAlani>
              <Arama aranan={aranan} setAranan={setAranan} placeholder={"İdari Kayıtlar İçinde Arayın...."}/>
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
                <Baslik>Detaylar</Baslik>
                <DetayAlani>
                  <IcerikAlani>
                    <DetayBaslik>İdari Kayıt Adı:</DetayBaslik>
                    <Icerik>{seciliKayit.adi}</Icerik>
                    <DetayBaslik>İdari Kayıt Kodu:</DetayBaslik>
                    <Icerik>{seciliKayit.id}</Icerik>
                  </IcerikAlani>
                  <IcerikAlani>
                    <DetayBaslik style={{ flex: '0 1 21.5%' }}>Kaynak Kurum:</DetayBaslik>
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
                </DetayAlani>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </WrapperListe>
  )
}
