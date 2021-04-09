import React from 'react'
import {
  Button,
  Card,
  HTMLTable,
  Menu,
  Spinner,
  Tag
} from '@blueprintjs/core'
import { DetayAlani, DetayBaslik, Icerik, IcerikAlani } from '../listeler/ortakStyle'
import htmlParser from '../util/htmlParser'
import { Container, Row, Col } from 'react-grid-system'
import styled from 'styled-components'
import { uniqBy } from 'lodash'
import useUrunDetay from '../hook/useUrunDetay'
import { useRecoilValue } from 'recoil'
import { tekilBultenler } from '../store/selectors'
import { birimlerState } from '../store'
import BreadCrumbs from '../BreadCrumbs'
import { Link } from 'react-router-dom'
import { AnaRenkler } from '@tuik/renkler'

const Wrapper = styled.div`
  margin: 70px 12px
`
const ButonAlani = styled.div`
  margin: 12px;
  display: flex;
`
const Alan = styled.div`
  flex: 1;
`

const Kart = styled(Card)`
  padding: 0;
  width: 100%;
  
  &:last-child {
    margin-top: 16px;
  }
`

const KartDetay = styled.div`
  padding-top: 4px;
  font-size: 1em;
`

const Baslik = styled.div`
  font-size: 1.3em;
  font-weight: 600;
  color: ${AnaRenkler.kirmizi};
  padding-bottom: 8px;
`

export default function UrunDetay ({ match }) {
  const bultenler = useRecoilValue(tekilBultenler)
  const birimler = useRecoilValue(birimlerState)
  const {
    isLoading,
    error,
    data,
  } = useUrunDetay(Number(match.params.id))
  const seciliUrun = data

  const urunBultenleri = seciliUrun && seciliUrun.bultenler
    .map(b => bultenler.find(bulten => bulten.id === b.bultenId))
    .filter(bulten => !!bulten)
  const birim = seciliUrun && birimler[seciliUrun.birimId]
  const periyotlar = seciliUrun && uniqBy(seciliUrun.paylasimlar.flatMap(paylasim => paylasim.periyot), 'id')
  const araclar = seciliUrun && uniqBy(seciliUrun.paylasimlar.flatMap(paylasim => paylasim.arac), 'id')
  const kuruluslar = seciliUrun && uniqBy(seciliUrun.paylasimlar.flatMap(paylasim => paylasim.kurulus), 'id')

  const joinPeriyot = periyotlar && periyotlar.map(p => p.adi).join(', ')
  const joinArac = araclar && araclar.map(a => a.adi).join(', ')

  return (
    <Wrapper>
      <Container fluid>
        <Row>
          <Col>
            <BreadCrumbs
              mevcutSayfaUrl={match.url}
              oncekiSayfaUrl="/urunler"
              text1="Ürün Listesi"
              text2="Ürün Detayı"
            />
          </Col>
        </Row>
        <Col>
          <ButonAlani>
            <Alan/>
            <Link to={`/urunler/guncelle/${seciliUrun.id}`}>
              <Button minimal intent="warning" text="Bilgileri Güncelle" rightIcon={'edit'}/>
            </Link>
          </ButonAlani>
        </Col>
        <Row>
          <Col sm={12} md={12} lg={4}>
            {isLoading && (
              <div style={{ paddingTop: '300px' }}>
                <Spinner size={50}/>
              </div>
            )}
            {error && error.message}
            {seciliUrun && (
              <DetayAlani>
                <Baslik>Genel Bilgiler</Baslik>
                <Card style={{ width: '100%', padding: 0 }}>
                  <IcerikAlani>
                    <DetayBaslik>İstatistiki Ürün Adı:</DetayBaslik>
                    <Icerik>{seciliUrun.adi}</Icerik>
                  </IcerikAlani>
                  <IcerikAlani>
                    <DetayBaslik>İstatistiki Ürün Kodu:</DetayBaslik>
                    <Icerik>{seciliUrun.kodu}</Icerik>
                  </IcerikAlani>
                  <IcerikAlani>
                    <DetayBaslik>Üretim Sıklığı:</DetayBaslik>
                    <Icerik>{seciliUrun.periyot ? seciliUrun.periyot.adi : '-'}</Icerik>
                  </IcerikAlani>
                  <IcerikAlani>
                    <DetayBaslik>Coğrafi Düzeyi:</DetayBaslik>
                    <Icerik>{seciliUrun.cografiDuzey ? seciliUrun.cografiDuzey.adi : '-'}</Icerik>
                  </IcerikAlani>
                  <IcerikAlani>
                    <DetayBaslik>Sorumlu Grup Başkanlığı:</DetayBaslik>
                    <Icerik>{birim && birim.adi}</Icerik>
                  </IcerikAlani>
                  <IcerikAlani>
                    <DetayBaslik>Ürünün Amacı:</DetayBaslik>
                    <Icerik>{seciliUrun.amac ? htmlParser(`${seciliUrun.amac}`) : '-'}</Icerik>
                  </IcerikAlani>
                  <IcerikAlani>
                    <DetayBaslik>Ürünün Kapsamı:</DetayBaslik>
                    <Icerik>{seciliUrun.kapsam ? htmlParser(`${seciliUrun.kapsam}`) : '-'}</Icerik>
                  </IcerikAlani>
                  <IcerikAlani>
                    <DetayBaslik>Ürünün Sağlayacağı Fayda:</DetayBaslik>
                    <Icerik>{seciliUrun.fayda ? htmlParser(`${seciliUrun.fayda}`) : '-'}</Icerik>
                  </IcerikAlani>
                </Card>
              </DetayAlani>
            )}
          </Col>
          <Col sm={12} md={12} lg={4}>
            {isLoading && (
              <div style={{ paddingTop: '300px' }}>
                <Spinner size={50}/>
              </div>
            )}
            {error && error.message}
            {seciliUrun && (
              <DetayAlani>
                <Baslik>Girdi Bilgileri</Baslik>
                {seciliUrun.anketler.length !== 0 && (
                  <Kart>
                    <DetayBaslik style={{ flex: '1 1 30%' }}>Anketler</DetayBaslik>
                    <Menu>
                      {seciliUrun.anketler.map(anket => (
                        <Link to={`/anketler/detay/${anket.id}`}>
                          <KartDetay key={anket.id}>- {anket.adi}</KartDetay>
                        </Link>
                      ))}
                    </Menu>
                  </Kart>
                )}
                {seciliUrun.urunler.length !== 0 && (
                  <Kart>
                    <DetayBaslik style={{ flex: '1 1 30%' }}>Bağlı Ürünler:</DetayBaslik>
                    <Menu>
                      {seciliUrun.urunler.map(urun => (
                        <Link to={`/urunler/detay/${urun.id}`}>
                          <KartDetay key={urun.id}>- {urun.adi}</KartDetay>
                        </Link>
                      ))}
                    </Menu>
                  </Kart>
                )}
                {seciliUrun.idariKayitlar.length !== 0 && (
                  <Kart>
                    <DetayBaslik style={{ flex: '1 1 30%' }}>İdari Kayıtlar</DetayBaslik>
                    <Menu>
                      {seciliUrun.idariKayitlar.map(kayit => (
                        <Link to={`/idari-kayitlar/detay/${kayit.id}`}>
                          <KartDetay key={kayit.id}>- {kayit.adi}</KartDetay>
                        </Link>
                      ))}
                    </Menu>
                  </Kart>
                )}
              </DetayAlani>
            )}
          </Col>
          <Col sm={12} md={12} lg={4}>
            {isLoading && (
              <div style={{ paddingTop: '300px' }}>
                <Spinner size={50}/>
              </div>
            )}
            {error && error.message}
            {seciliUrun && (

              <DetayAlani>
                <Baslik>Çıktı bilgileri</Baslik>
                {urunBultenleri.length !== 0 && (
                    <Kart>
                      <DetayBaslik style={{ flex: '1 1 30%' }}>Haber Bülteni:</DetayBaslik>
                      {urunBultenleri.map(bulten => (
                        <Icerik style={{ padding: '8px' }}>
                          <a href={`https://data.tuik.gov.tr/Bulten/Index?p=${bulten.sonYayin.id}`} target='_blank'
                             rel="noreferrer">{bulten.adi}</a>
                        </Icerik>
                      ))}
                    </Kart>
                )}
                {seciliUrun.paylasimlar.length !== 0 && (
                    <Kart>
                      <DetayBaslik style={{ flex: '1 1 30%' }}>Paylaşımlar:</DetayBaslik>
                        <HTMLTable>
                          <thead>
                          <tr>
                            <td>Paylaşılan Kuruluş</td>
                            <td>Kullanılan Araç</td>
                            <td>Gönderi Sıklığı</td>
                          </tr>
                          </thead>
                          <tbody>
                          {kuruluslar.map(kurulus => (
                            <tr key={kurulus.id}>
                              <td>{kurulus.adi}</td>
                              <td><Tag minimal>{joinArac}</Tag></td>
                              <td><Tag minimal>{joinPeriyot}</Tag></td>
                            </tr>
                          ))}
                          </tbody>
                        </HTMLTable>
                    </Kart>
                )}
              </DetayAlani>
            )}
          </Col>
        </Row>
      </Container>
    </Wrapper>
  )
}