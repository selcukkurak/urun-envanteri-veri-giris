import React from 'react'
import { useRecoilValue } from 'recoil'
import { bultenlerState } from '../store'
import Liste from './Liste'
import { Col, Container, Row } from 'react-grid-system'
import {
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


export default function BultenListe({match}) {
  const bultenler = useRecoilValue(bultenlerState)

  return(
    <WrapperListe>
      <Container>
        <Row>
          <Col sm={6} md={6} lg={6}>
            <FiltreButonAlani>
              <ButonDurumAlani/>
              <Link to={`${match.url}/yeni-bulten`}>
                <Button intent={'success'} text={"Yeni Haber Bülteni Ekle"}/>
              </Link>
            </FiltreButonAlani>
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
            />
          </Col>
        </Row>
      </Container>
    </WrapperListe>
  )
}
