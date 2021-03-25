import React, { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { anketlerState } from '../store'
import Liste from './Liste'
import { localSort } from '../util/sort'
import { Button} from '@blueprintjs/core'
import { Col, Container, Row } from 'react-grid-system'
import { Link } from 'react-router-dom'
import {
  AramaAlani,
  BaslikMetin,
  ButonDurumAlani,
  FiltreButonAlani,
  ListeBaslik,
  SagaYasli, SayiGosterge,
  SolaYasli,
  WrapperListe
} from './ortakStyle'
import Arama from './Arama'
import { taslakDurumlar } from './ortak'


export default function AnketListe ({ match }) {
  const [aranan, setAranan] = useState('')
  const [secili, setSecili] = useState(taslakDurumlar[0])
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

  return (
    <WrapperListe>
      <Container fluid>
        <Row>
          <Col sm={12} md={12} lg={12}>
            <FiltreButonAlani>
              <ButonDurumAlani/>
              <Link to={`${match.url}/yeni-anket`}>
                <Button intent={'success'} text={'Yeni Anket Ekle'}/>
              </Link>
            </FiltreButonAlani>
            <AramaAlani>
              <Arama setAranan={setAranan} placeholder={'Anketler İçinde Arayın....'}
                secili={secili} setSecili={setSecili} setSeciliId={setSeciliAnketId}
              />
            </AramaAlani>
            <ListeBaslik>
              <SolaYasli>Anketler</SolaYasli>
              <SagaYasli>
                <BaslikMetin>TOPLAM</BaslikMetin>
                <SayiGosterge>{anketler.length}</SayiGosterge>
              </SagaYasli>
            </ListeBaslik>
            {secili.durum === 0 && (
              <Liste
                dizi={filtreliAnketler}
                url={match.url}
                secili={seciliAnketId}
                handleSeciliItem={handleSeciliItem}
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
              />
            )}
          </Col>
        </Row>
      </Container>
    </WrapperListe>
  )
}
