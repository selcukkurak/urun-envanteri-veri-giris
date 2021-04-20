import React, { useState } from 'react'
import { useRecoilValue } from 'recoil'
import Liste from './Liste'
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
import { tekilBultenler } from '../store/selectors'
import { taslakDurumlar } from './ortak'


export default function BultenListe({match}) {
  const [aranan, setAranan] = useState("")
  const [secili, setSecili] = useState(taslakDurumlar[0])

  const [seciliBultenId, setSeciliBultenId] = useState(0)

  const bultenler = useRecoilValue(tekilBultenler)
    .filter(bulten => bulten.adi.toLowerCase().includes(aranan.toLowerCase()))
  const taslakBultenler = bultenler.filter(bulten => bulten.taslak)
  const taslakOlmayanBultenler = bultenler.filter(bulten => !bulten.taslak)

  const handleSeciliItem  = (key) => {
    seciliBultenId(key)
  }
  return(
    <WrapperListe>
      <Container fluid>
        <Row>
          <Col sm={12} md={12} lg={12}>
            <FiltreButonAlani>
              <AramaAlani>
                <Arama setAranan={setAranan} placeholder={"Bültenler İçinde Arayın...."}
                       secili={secili} setSecili={setSecili} setSeciliId={setSeciliBultenId}
                />
              </AramaAlani>
              <Link to={`${match.url}/yeni-bulten`}>
                <EklemeButton intent={'success'} text={"Yeni Haber Bülteni Ekle"}/>
              </Link>
            </FiltreButonAlani>

            <ListeBaslik>
              <SolaYasli>Haber Bültenleri</SolaYasli>
              <SagaYasli>
                <BaslikMetin>TOPLAM</BaslikMetin>
                <SayiGosterge>{secili.durum === 0 ? bultenler.length : secili.durum === 2 ? taslakOlmayanBultenler.length : taslakBultenler.length}</SayiGosterge>
              </SagaYasli>
            </ListeBaslik>
            {secili.durum === 0 ? (
              <Liste
                dizi={bultenler}
                url={match.url}
                handleSeciliItem={handleSeciliItem}
                secili={seciliBultenId}
              />
            ) : (
              secili.durum === 1 ? (
                <Liste
                  dizi={taslakBultenler}
                  url={match.url}
                  handleSeciliItem={handleSeciliItem}
                  secili={seciliBultenId}
                />
              ) : (
                <Liste
                  dizi={taslakOlmayanBultenler}
                  url={match.url}
                  handleSeciliItem={handleSeciliItem}
                  secili={seciliBultenId}
                />
              )
            )}
          </Col>
        </Row>
      </Container>
    </WrapperListe>
  )
}
