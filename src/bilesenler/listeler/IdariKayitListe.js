import React, { useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { idariKayitlarState } from '../store'
import Liste from './Liste'
import { localSort } from '../util/sort'
import { Col, Container, Row } from 'react-grid-system'
import {
  AramaAlani,
  BaslikMetin, EklemeButton,
  FiltreButonAlani,
  ListeBaslik,
  SagaYasli,
  SayiGosterge,
  SolaYasli, WrapperListe
} from './ortakStyle'
import { Link } from 'react-router-dom'
import Arama from './Arama'
import { taslakDurumlar } from './ortak'
import IdariKayitAPI from '../servisler/IdariKayitAPI'



export default function IdariKayitListe ({ match }) {
  const [aranan, setAranan] = useState('')
  const [secili, setSecili] = useState(taslakDurumlar[0])
  const setIdariKayitlar = useSetRecoilState(idariKayitlarState)
  const idariKayitlar = localSort(useRecoilValue(idariKayitlarState), 'adi')
    .filter(kayit => kayit.adi.toLowerCase().includes(aranan.toLowerCase()))
  const taslakKayitlar = idariKayitlar.filter(kayit => kayit.taslak === true)
  const taslakOlmayanKayitlar = idariKayitlar.filter(kayit => !kayit.taslak)
  const [seciliKayitId, setSeciliKayitId] = useState(0)

  const handleSeciliItem = (key) => {
    setSeciliKayitId(key)
  }
  const taslagaCevirmeFunc = (id) => {
    IdariKayitAPI.kayitTaslakYap(id)
      .then(res => {
        setIdariKayitlar(res.data)
      })
  }
  return (
    <WrapperListe>
      <Container fluid>
        <Row>
          <Col sm={12} md={12} lg={12}>
            <FiltreButonAlani>
              <AramaAlani>
                <Arama setAranan={setAranan} placeholder={'İdari Kayıtlar İçinde Arayın....'}
                       secili={secili} setSecili={setSecili} setSeciliId={setSeciliKayitId}
                />
              </AramaAlani>
              <Link to={`${match.url}/yeni-idariKayit`}>
                <EklemeButton intent={'success'} text={'Yeni İdari Kayıt Ekle'}/>
              </Link>
            </FiltreButonAlani>

            <ListeBaslik>
              <SolaYasli>İdari Kayıtlar</SolaYasli>
              <SagaYasli>
                <BaslikMetin>TOPLAM</BaslikMetin>
                <SayiGosterge>{secili.durum === 0 ? idariKayitlar.length : secili.durum === 2 ? taslakOlmayanKayitlar.length : taslakKayitlar.length}</SayiGosterge>
              </SagaYasli>
            </ListeBaslik>
            {secili.durum === 0 ? (
              <Liste
                dizi={idariKayitlar}
                url={match.url}
                secili={seciliKayitId}
                handleSeciliItem={handleSeciliItem}
                taslakYapFunc={taslagaCevirmeFunc}
              />
            ) : (
              secili.durum === 1 ? (
                <Liste
                  dizi={taslakKayitlar}
                  url={match.url}
                  secili={seciliKayitId}
                  handleSeciliItem={handleSeciliItem}
                />
              ) : (
                <Liste
                  dizi={taslakOlmayanKayitlar}
                  url={match.url}
                  secili={seciliKayitId}
                  handleSeciliItem={handleSeciliItem}
                  taslakYapFunc={taslagaCevirmeFunc}
                />
              )
            )}
          </Col>
        </Row>
      </Container>
    </WrapperListe>
  )
}
