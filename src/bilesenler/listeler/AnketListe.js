import React, { useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { anketlerState } from '../store'
import Liste from './Liste'
import { localSort } from '../util/sort'
import { Col, Container, Row } from 'react-grid-system'
import { Link } from 'react-router-dom'
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
import AnketAPI from '../servisler/AnketAPI'

export default function AnketListe ({ match }) {
  const [aranan, setAranan] = useState('')
  const [secili, setSecili] = useState(taslakDurumlar[0])
  const setAnketler = useSetRecoilState(anketlerState)
  const anketler = localSort(useRecoilValue(anketlerState), 'adi')
  const filtreliAnketler = anketler
    .filter(anket => anket.adi.toLowerCase().includes(aranan.toLowerCase()))
  const taslakAnketler = anketler.filter(anket => anket.taslak)
    .filter(anket => anket.adi.toLowerCase().includes(aranan.toLowerCase()))
  const taslakOlmayanAnketler = anketler.filter(anket => !anket.taslak)
    .filter(anket => anket.adi.toLowerCase().includes(aranan.toLowerCase()))
  const [seciliAnketId, setSeciliAnketId] = useState(0)
  const handleSeciliItem = (key) => {
    setSeciliAnketId(key)
  }
  const taslagaCevirmeFunc = (id) => {
    AnketAPI.anketTaslakYap(id)
      .then(res => {
        setAnketler(res.data)
      })
  }
  return (
    <WrapperListe>
      <Container fluid>
        <Row>
          <Col sm={12} md={12} lg={12}>
            <FiltreButonAlani>
              <AramaAlani>
                <Arama setAranan={setAranan} placeholder={'Anketler İçinde Arayın....'}
                       secili={secili} setSecili={setSecili} setSeciliId={setSeciliAnketId}
                />
              </AramaAlani>
              <Link to={`${match.url}/yeni-anket`}>
                <EklemeButton intent={'success'} text={'Yeni Anket Ekle'}/>
              </Link>
            </FiltreButonAlani>
            <ListeBaslik>
              <SolaYasli>Anketler</SolaYasli>
              <SagaYasli>
                <BaslikMetin>TOPLAM</BaslikMetin>
                <SayiGosterge>{secili.durum === 0 ? filtreliAnketler.length : secili.durum === 2 ? taslakOlmayanAnketler.length : taslakAnketler.length}</SayiGosterge>
              </SagaYasli>
            </ListeBaslik>
            {secili.durum === 0 && (
              <Liste
                dizi={filtreliAnketler}
                url={match.url}
                secili={seciliAnketId}
                handleSeciliItem={handleSeciliItem}
                taslakYapFunc={taslagaCevirmeFunc}
              />
            )}
            {secili.durum === 1 && (
              <Liste
                dizi={taslakAnketler}
                url={match.url}
                secili={seciliAnketId}
                handleSeciliItem={handleSeciliItem}
              />
            )}
            {secili.durum === 2 && (
              <Liste
                dizi={taslakOlmayanAnketler}
                url={match.url}
                secili={seciliAnketId}
                handleSeciliItem={handleSeciliItem}
                taslakYapFunc={taslagaCevirmeFunc}
              />
            )}
          </Col>
        </Row>
      </Container>
    </WrapperListe>
  )
}
