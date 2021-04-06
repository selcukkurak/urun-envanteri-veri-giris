import React from 'react'
import { Col, Container, Row } from 'react-grid-system'
import styled from 'styled-components'
import { Button, ButtonGroup, Card, Menu, MenuItem, Popover, Position } from '@blueprintjs/core'
import IdariKayitTabloListe from '../listeler/IdariKayitTabloListe'
import { DetayAlani, DetayBaslik, Icerik, IcerikAlani } from '../listeler/ortakStyle'
import useSayfaIciGecis from '../hook/useSayfaIciGecis'
import { useRecoilValue } from 'recoil'
import { idariKayitlarState } from '../store'
import { siraliKurumlar } from '../store/selectors'
import { Link } from 'react-router-dom'
import BreadCrumbs from '../BreadCrumbs'

const Wrapper = styled.div`
  margin: 70px 12px
`
const DetayKart = styled(Card)`
  padding: 0;
  width: 50%;
`
const ButonAlani = styled.div`
  margin: 8px 16px;
  display: flex;
`
const Alan = styled.div`
  flex:1;
`
const ButonGrup = styled(ButtonGroup)`
  flex: 1;
  max-width: 20vw;
`

export default function IdariKayitDetay ({ match }) {
  const idariKayitlar = useRecoilValue(idariKayitlarState)
  const seciliKayit = idariKayitlar.find(kayit => kayit.id === match.params.id)
  const kurumlar = useRecoilValue(siraliKurumlar)
  const kurum = seciliKayit && kurumlar.find(k => k.kodu === seciliKayit.kaynakKurumId)
  const {
    idariTablo,
    idariGenel,
    tabloIdariSayfaClick,
    genelIdariSayfaClick,
  } = useSayfaIciGecis()
  if (!seciliKayit) return null
  return (
    <Wrapper>
      <BreadCrumbs
        mevcutSayfaUrl={match.url}
        oncekiSayfaUrl="/idari-kayitlar"
        text1="İdari Kayıt Listesi"
        text2="İdari Kayıt Detayı"
      />
      <Container fluid>
        <Row>
          <Col xs={12} sm={12} md={12} lg={6.3}>
            <ButonAlani>
              <Alan>
                <ButonGrup fill>
                  <Button intent={'danger'} minimal={!idariGenel} text={'Genel Bilgiler'} onClick={genelIdariSayfaClick}/>
                  <Button intent={'danger'} minimal={!idariTablo} text={'Tablo ve Kolon Bilgileri'}
                          onClick={tabloIdariSayfaClick}/>
                </ButonGrup>
              </Alan>
              <Popover content={
                <Menu>
                  <MenuItem text={(
                    <Link to="/idari-kayitlar/yeni-idariKayit">
                      <Button minimal intent="success" text="Yeni İdari Kayıt Ekle" rightIcon={'plus'}/>
                    </Link>
                  )}/>
                  <MenuItem text={(
                    <Link to={`/idari-kayitlar/guncelle/${seciliKayit.id}`}>
                      <Button minimal intent="warning" text="Bilgileri Güncelle" rightIcon={'edit'}/>
                    </Link>
                  )}/>
                </Menu>
              } position={Position.RIGHT}>
                <Button icon="properties" text="Eylemler"/>
              </Popover>
            </ButonAlani>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            {idariGenel && (
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
            )}
            {idariTablo && (
              <IdariKayitTabloListe
                seciliKayit={seciliKayit}
              />
            )}
          </Col>
        </Row>
      </Container>

      {/*{seciliKayit && (*/}
      {/*  <div>*/}
      {/*    <IdariKayitTabloListe*/}
      {/*      match={match}*/}
      {/*      seciliKayit={seciliKayit}*/}
      {/*    />*/}


      {/*  </div>*/}
      {/*)}*/}
    </Wrapper>
  )
}