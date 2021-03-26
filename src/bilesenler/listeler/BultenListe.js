import React, { useState } from 'react'
import { useRecoilValue } from 'recoil'
import Liste from './Liste'
import { Col, Container, Row } from 'react-grid-system'
import {
  AramaAlani,
  BaslikMetin,
  ButonDurumAlani,
  FiltreButonAlani,
  ListeBaslik,
  SagaYasli,
  SayiGosterge,
  SolaYasli, WrapperListe
} from './ortakStyle'
import { Link } from 'react-router-dom'
import { Button } from '@blueprintjs/core'
import Arama from './Arama'
import { tekilBultenler } from '../store/selectors'


export default function BultenListe({match}) {
  const [aranan, setAranan] = useState("")
  const [seciliBulten, setSeciliBulten] = useState(0)
  const bultenler = useRecoilValue(tekilBultenler)
    .filter(bulten => bulten.adi.toLowerCase().includes(aranan.toLowerCase()))

  const handleSeciliItem  = (item) => {
    setSeciliBulten(item)
  }
  return(
    <WrapperListe>
      <Container fluid>
        <Row>
          <Col sm={12} md={12} lg={12}>
            <FiltreButonAlani>
              <ButonDurumAlani/>
              <Link to={`${match.url}/yeni-bulten`}>
                <Button intent={'success'} text={"Yeni Haber Bülteni Ekle"}/>
              </Link>
            </FiltreButonAlani>
            <AramaAlani>
              <Arama setAranan={setAranan} placeholder={"Bültenler İçinde Arayın...."}/>
            </AramaAlani>
            <ListeBaslik>
              <SolaYasli>Haber Bültenleri</SolaYasli>
              <SagaYasli>
                <BaslikMetin>TOPLAM</BaslikMetin>
                <SayiGosterge>{bultenler.length}</SayiGosterge>
              </SagaYasli>
            </ListeBaslik>
            <Liste
              dizi={bultenler}
              url={match.url}
              handleSeciliItem={handleSeciliItem}
              secili={seciliBulten}
            />
          </Col>
        </Row>
      </Container>
    </WrapperListe>
  )
}
