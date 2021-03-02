import React, { useState } from 'react'
import { localSort } from '../util/sort'
import { useRecoilValue } from 'recoil'
import { birimlerState, tumUrunlerState, urunlerState } from '../store'
import { Container, Row, Col } from 'react-grid-system'
import { Button, ButtonGroup, Card, HTMLTable, Menu, Tag} from '@blueprintjs/core'
import { Link } from 'react-router-dom'
import Liste from './Liste'
import {
  AramaAlani,
  BaslikMetin,
  ButonDurumAlani, DetayAlani, DetayBaslik,
  FiltreButonAlani, Icerik, IcerikAlani,
  ListeBaslik,
  SagaYasli, SayiGosterge,
  SolaYasli,
  WrapperListe
} from './ortakStyle'
import useUrunDetay from '../hook/useUrunDetay'
import styled from 'styled-components'
import useSayfaIciGecis from '../hook/useSayfaIciGecis'
import { keyBy, uniqBy } from 'lodash'
import htmlParser from '../util/htmlParser'
import { tekilBultenler } from '../store/selectors'
import Arama from './Arama'

const ButonAlani = styled.div`
  width: 20vw;
  position: relative;
  margin: auto;
  display: flex;
`
const ButonGrup = styled(ButtonGroup)`
  flex: 1;
  max-width: 35vw;
  width: 35vw;
`

const Kart = styled(Card)`
  padding: 0;
  width: 100%;
`

const KartDetay = styled.div`
  padding-top: 4px;
`
const taslakDurumlar = [
  { adi: 'Hepsi', durum: 0 },
  { adi: 'Taslak', durum: 1 },
  { adi: 'Onaylanmış', durum: 2 }
]


export default function UrunListe ({ match }) {
  const [secili, setSecili] = useState(taslakDurumlar[0])
  const [aranan, setAranan] = useState("")
  const [
    genel,
    cikti,
    girdi,
    genelSayfaClick,
    ciktiSayfaClick,
    girdiSayfaClick,
  ] = useSayfaIciGecis()

  const urunler = localSort(useRecoilValue(urunlerState), 'adi')
    .filter(urun => urun.adi.toLowerCase().includes(aranan.toLowerCase()))
  const tumUrunler = localSort(useRecoilValue(tumUrunlerState), 'adi')
    .filter(urun => urun.adi.toLowerCase().includes(aranan.toLowerCase()))
  const taslakUrunler = tumUrunler.filter(urun => urun.taslak)
    .filter(urun => urun.adi.toLowerCase().includes(aranan.toLowerCase()))

  const birimler = keyBy(useRecoilValue(birimlerState), 'id')
  const bultenler = useRecoilValue(tekilBultenler)

  const [seciliUrunId, setSeciliUrunId] = useState(0)
  const findIndex = () => {
    if(secili.durum === 0 && tumUrunler.length !== 0 ) return tumUrunler.find((item, index) => index === seciliUrunId)
    else if(secili.durum === 1 && taslakUrunler.length !== 0) return taslakUrunler.find((item, index) => index === seciliUrunId)
    else return urunler.find((item, index) => index === seciliUrunId)
  }

  const {
    data,
    isLoading,
    error
  } = useUrunDetay((findIndex() && findIndex().id))
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

  const handleSeciliItem = (key) => {
    setSeciliUrunId(key)
  }
  const handleSeciliTaslak = (event, secenek) => {
    setSecili(secenek)
    setSeciliUrunId(0)
  }


  return (
    <WrapperListe>
      <Container>
        <Row>
          <Col sm={6} md={6} lg={6}>
            <FiltreButonAlani>
              <ButonDurumAlani>
                {taslakDurumlar.map((taslak, index) => (
                  <Button key={index} intent={'primary'}
                          minimal={secili.durum !== taslak.durum}
                          text={taslak.adi}
                          onClick={(event) => handleSeciliTaslak(event, taslak)}/>
                ))}
              </ButonDurumAlani>
              <Link to={`${match.url}/yeni-urun`}>
                <Button intent={'success'} text={'Yeni Ürün Ekle'}/>
              </Link>
            </FiltreButonAlani>
            <AramaAlani>
              <Arama aranan={aranan} setAranan={setAranan} placeholder={"Ürünler İçinde Arayın...."}/>
            </AramaAlani>
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
          <Col sm={5} md={5} lg={5}>
            {isLoading && "Loading..."}
            {error && error.message}
            {seciliUrun && (
              <div>
                <ButonAlani>
                  <ButonGrup fill>
                    <Button intent={'danger'} minimal={!genel} text={'Genel Bilgiler'} onClick={genelSayfaClick}/>
                    <Button intent={'danger'} minimal={!girdi} text={'Girdi Bilgileri'} onClick={girdiSayfaClick}/>
                    <Button intent={'danger'} minimal={!cikti} text={'Çıktı Bilgileri'} onClick={ciktiSayfaClick}/>
                  </ButonGrup>
                </ButonAlani>
                {genel && (
                  <DetayAlani>
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
                      <Icerik>{seciliUrun.periyot ? seciliUrun.periyot.adi : "-"}</Icerik>
                    </IcerikAlani>
                    <IcerikAlani>
                      <DetayBaslik>Coğrafi Düzeyi:</DetayBaslik>
                      <Icerik>{seciliUrun.cografiDuzey ? seciliUrun.cografiDuzey.adi : "-"}</Icerik>
                    </IcerikAlani>
                    <IcerikAlani>
                      <DetayBaslik>Sorumlu Grup Başkanlığı:</DetayBaslik>
                      <Icerik>{birim && birim.adi}</Icerik>
                    </IcerikAlani>
                    <IcerikAlani>
                      <DetayBaslik>Ürünün Amacı:</DetayBaslik>
                      <Icerik>{seciliUrun.amac ? htmlParser(`${seciliUrun.amac}`) :"-"}</Icerik>
                    </IcerikAlani>
                    <IcerikAlani>
                      <DetayBaslik>Ürünün Kapsamı:</DetayBaslik>
                      <Icerik>{seciliUrun.kapsam ? htmlParser(`${seciliUrun.kapsam}`) : "-"}</Icerik>
                    </IcerikAlani>
                    <IcerikAlani>
                      <DetayBaslik>Ürünün Sağlayacağı Fayda:</DetayBaslik>
                      <Icerik>{seciliUrun.fayda ? htmlParser(`${seciliUrun.fayda}`) : "-"}</Icerik>
                    </IcerikAlani>
                  </DetayAlani>
                )}
                {girdi && (
                  <DetayAlani>
                    {seciliUrun.anketler.length !== 0 && (
                      <IcerikAlani>
                        <DetayBaslik style={{flex:"1 1 30%"}}>Anketler:</DetayBaslik>
                        <Icerik>
                          <Kart>
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
                        <DetayBaslik style={{flex:"1 1 30%"}}>Bağlı Ürünler:</DetayBaslik>
                        <Icerik>
                          <Kart>
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
                        <DetayBaslik style={{flex:"1 1 30%"}}>İdari Kayıtlar:</DetayBaslik>
                        <Icerik>
                          <Kart>
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
                        <DetayBaslik style={{flex:"1 1 30%"}}>Haber Bülteni:</DetayBaslik>
                        <Kart>
                          {urunBultenleri.map(bulten => (
                            <Icerik style={{padding:"8px"}}>
                              <a href={`https://data.tuik.gov.tr/Bulten/Index?p=${bulten.sonYayin.id}`} target='_blank'
                                 rel="noreferrer">{bulten.adi}</a>
                            </Icerik>
                          ))}
                        </Kart>
                      </IcerikAlani>
                    )}
                    {seciliUrun.paylasimlar.length !== 0 && (
                      <IcerikAlani>
                        <DetayBaslik style={{flex:"1 1 30%"}}>Paylaşımlar:</DetayBaslik>
                        <Kart>
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
    </WrapperListe>
  )
}
