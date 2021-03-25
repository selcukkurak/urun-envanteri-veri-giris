import React, { useState } from 'react'
import { Card, Colors, HTMLTable } from '@blueprintjs/core'
import { AnaRenkler } from '@tuik/renkler'
import styled from 'styled-components'
import useIdariKayitTabloBilgileri from '../hook/useIdariKayitTabloBilgileri'
import {Container, Row, Col} from 'react-grid-system'
import KolonListesi from './KolonListesi'

const Kart = styled(Card)`
  padding: 0;
  height: 400px;
  overflow-y: auto;
`
const Baslik = styled.div`
  font-size: 1.1em;
  font-weight: 600;
  color: ${Colors.DARK_GRAY4};
  padding: 4px 8px;
`
const KayitBaslik = styled.div`
  flex: 1;
  font-size: 0.9em;
  padding: 6px 12px;
  font-weight: 600;
  color: ${AnaRenkler.kirmizi};
  width: 50px;
  height: 50px;
`
const UstAlan = styled.div`
  display: flex;
`
const AktifSatir = styled.tr`
  cursor: default;

  &.active {
    background-color: ${props =>
  props.secili !== props.index ? 'white' : Colors.LIGHT_GRAY4
}
  }
`
export default function IdariKayitTabloListe ({ seciliKayit }) {
  const [seciliTabloId, setSeciliTabloId] = useState(0)
  const {
    data
  } = useIdariKayitTabloBilgileri(seciliKayit)
  const seciliTablo = data && data.find((tablo, index) => index === seciliTabloId )
  console.log("seciliTablo", seciliTablo)
  const seciliTabloClick = (key) => {
    setSeciliTabloId(key)
  }
  return (
    <div>
      <UstAlan>
        <Baslik>İdari Kayıt Adı:</Baslik>
        <KayitBaslik>
          {seciliKayit.adi}
        </KayitBaslik>
      </UstAlan>
      <Container fluid>
        <Row>
          <Col>
            <Kart>
              {data && (
                <HTMLTable>
                  <thead>
                  <tr>
                    <th>Adı</th>
                    <th>Açıklama</th>
                  </tr>
                  </thead>
                  <tbody>
                  {data.map((tablo, index) => (
                    <AktifSatir secili={seciliTabloId} index={index} className="active"
                                key={data.id} onClick={() => seciliTabloClick(index)}>
                      <td>{tablo.adi}</td>
                      <td>{tablo.aciklama}</td>
                    </AktifSatir>
                  ))}
                  </tbody>
                </HTMLTable>
              ) }
            </Kart>
          </Col>
          <Col>
            <KolonListesi
              seciliTablo={seciliTablo}
            />
          </Col>
        </Row>
      </Container>

    </div>
  )
}