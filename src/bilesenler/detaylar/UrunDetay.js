import React from 'react'
import {
  Button,
  ButtonGroup,
  Card,
  HTMLTable,
  Menu,
  MenuItem,
  Popover,
  Position,
  Spinner,
  Tag
} from '@blueprintjs/core'
import { DetayAlani, DetayBaslik, Icerik, IcerikAlani } from '../listeler/ortakStyle'
import htmlParser from '../util/htmlParser'
import { Container, Row, Col } from 'react-grid-system'
import useSayfaIciGecis from '../hook/useSayfaIciGecis'
import styled from 'styled-components'
import { uniqBy } from 'lodash'
import useUrunDetay from '../hook/useUrunDetay'
import { useRecoilValue } from 'recoil'
import { tekilBultenler } from '../store/selectors'
import { birimlerState } from '../store'
import BreadCrumbs from '../BreadCrumbs'
import { Link } from 'react-router-dom'

const Wrapper = styled.div`
  margin: 70px 12px
`
const ButonAlani = styled.div`
  margin: 12px;
  display: flex;
`
const Alan = styled.div`
  flex:1;
`
const ButonGrup = styled(ButtonGroup)`
  max-width: 20vw;
`

const Kart = styled(Card)`
  padding: 0;
  width: 100%;
`

const KartDetay = styled.div`
  padding-top: 4px;
  font-size: 1em;
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
  const {
    genel,
    cikti,
    girdi,
    genelSayfaClick,
    ciktiSayfaClick,
    girdiSayfaClick,
  } = useSayfaIciGecis()

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
        <Row>
          <Col sm={12} md={12} lg={12}>
            {isLoading && (
              <div style={{ paddingTop: '300px' }}>
                <Spinner size={50}/>
              </div>
            )}
            {error && error.message}
            {seciliUrun && (
              <div>
                <ButonAlani>
                  <Alan>
                    <ButonGrup fill>
                      <Button intent={'danger'} minimal={!genel} text={'Genel Bilgiler'} onClick={genelSayfaClick}/>
                      <Button intent={'danger'} minimal={!girdi} text={'Girdi Bilgileri'} onClick={girdiSayfaClick}/>
                      <Button intent={'danger'} minimal={!cikti} text={'Çıktı Bilgileri'} onClick={ciktiSayfaClick}/>
                    </ButonGrup>
                  </Alan>
                  <Popover content={
                    <Menu>
                      <MenuItem text={(
                        <Link to="/urunler/yeni-urun">
                          <Button minimal intent="success" text="Yeni Ürün Ekle" rightIcon={'plus'}/>
                        </Link>
                      )}/>
                      <MenuItem text={(
                        <Link to={`/urunler/guncelle/${seciliUrun.id}`}>
                          <Button minimal intent="warning" text="Bilgileri Güncelle" rightIcon={'edit'}/>
                        </Link>
                      )}/>
                    </Menu>
                  } position={Position.RIGHT}>
                    <Button icon="properties" intent="warning" minimal text="Eylemler"/>
                  </Popover>
                </ButonAlani>
                {genel && (
                  <DetayAlani>
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
                {girdi && (
                  <DetayAlani>
                    {seciliUrun.anketler.length !== 0 && (
                      <IcerikAlani>
                        <Icerik>
                          <Kart>
                            <DetayBaslik style={{ flex: '1 1 30%' }}>Anketler</DetayBaslik>
                            <Menu>
                              {seciliUrun.anketler.map(anket => (
                                <KartDetay key={anket.id}>- {anket.adi}</KartDetay>
                              ))}
                            </Menu>
                          </Kart>
                        </Icerik>
                      </IcerikAlani>
                    )}
                    {seciliUrun.urunler.length !== 0 && (
                      <IcerikAlani>
                        <Icerik>
                          <Kart>
                            <DetayBaslik style={{ flex: '1 1 30%' }}>Bağlı Ürünler:</DetayBaslik>
                            <Menu>
                              {seciliUrun.urunler.map(urun => (
                                <KartDetay key={urun.id}>- {urun.adi}</KartDetay>
                              ))}
                            </Menu>
                          </Kart>
                        </Icerik>
                      </IcerikAlani>
                    )}
                    {seciliUrun.idariKayitlar.length !== 0 && (
                      <IcerikAlani>
                        <Icerik>
                          <Kart>
                            <DetayBaslik style={{ flex: '1 1 30%' }}>İdari Kayıtlar</DetayBaslik>
                            <Menu>
                              {seciliUrun.idariKayitlar.map(kayit => (
                                <KartDetay key={kayit.id}>- {kayit.adi}</KartDetay>
                              ))}
                            </Menu>
                          </Kart>
                        </Icerik>
                      </IcerikAlani>
                    )}
                  </DetayAlani>
                )}
                {cikti && (
                  <DetayAlani>
                    {urunBultenleri.length !== 0 && (
                      <IcerikAlani>
                        <Kart>
                          <DetayBaslik style={{ flex: '1 1 30%' }}>Haber Bülteni:</DetayBaslik>
                          {urunBultenleri.map(bulten => (
                            <Icerik style={{ padding: '8px' }}>
                              <a href={`https://data.tuik.gov.tr/Bulten/Index?p=${bulten.sonYayin.id}`} target='_blank'
                                 rel="noreferrer">{bulten.adi}</a>
                            </Icerik>
                          ))}
                        </Kart>
                      </IcerikAlani>
                    )}
                    {seciliUrun.paylasimlar.length !== 0 && (
                      <IcerikAlani>
                        <Kart>
                          <DetayBaslik style={{ flex: '1 1 30%' }}>Paylaşımlar:</DetayBaslik>
                          <Icerik>
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
                          </Icerik>
                        </Kart>
                      </IcerikAlani>
                    )}
                  </DetayAlani>
                )}
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </Wrapper>
  )
}