import React, { useState } from 'react'
import { useRecoilValue } from 'recoil'
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



export default function IdariKayitListe ({ match }) {
  const [aranan, setAranan] = useState('')
  const [secili, setSecili] = useState(taslakDurumlar[0])
  const idariKayitlar = localSort(useRecoilValue(idariKayitlarState), 'adi')
    .filter(kayit => kayit.adi.toLowerCase().includes(aranan.toLowerCase()))
  const [seciliKayitId, setSeciliKayitId] = useState(0)

  const handleSeciliItem = (key) => {
    setSeciliKayitId(key)
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
        </Row>
      </Container>
    </WrapperListe>
  )
}
