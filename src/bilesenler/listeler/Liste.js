import React from 'react'
import styled from 'styled-components'
import { Container, Row, Col } from 'react-grid-system'
import { Button, Card, Colors, HTMLTable, Icon} from '@blueprintjs/core'
import { AnaRenkler } from '@tuik/renkler'

const WrapperListe = styled.div`
  padding: 70px 16px 0;
`

const KartListe = styled(Card)`
  margin-left: 8px;
  padding: 0;
  height: 60vh;
  overflow-y: scroll;
`
const ListeBaslik = styled.div`
  display: flex;
  align-items: baseline;
  padding-top: 24px;
  padding-left: 8px;
`

const SolaYasli = styled.div`
  flex: 1;
  font-weight: bold;
  color: ${AnaRenkler.koyuKirmizi};
`

const SagaYasli = styled.div`

`
const BaslikMetin = styled.div`
  display: inline-block;
  font-size: 0.9em;
  font-weight: 600;
  color: ${Colors.GRAY3};
  margin-right: 8px;
`
const SayiGosterge = styled.div`
  display: inline-block;
  color: ${AnaRenkler.koyuKirmizi};
  font-weight: 600;
  font-size: 1.2em;
  margin-left: 4px;
  margin-right: 8px;

  &:last-child {
    margin-right: 0;
  }
`
const FiltreAlani = styled.div`
  flex: 1;
`

const FiltreLabel = styled.label`
  padding: 4px 8px;
  font-weight: 600;
  color: ${Colors.DARK_GRAY5};
  font-size: 1.2em;
`

function Liste (props) {

  return (
    <WrapperListe>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: 'flex' }}>
              <div style={{ flex: 1 }}>
                {props.durumlar && (
                  <FiltreAlani>
                    <FiltreLabel>Taslak:</FiltreLabel>
                    {props.durumlar.map((taslak, index) => (
                      <Button key={index} intent={'primary'} minimal={!props.secili || props.secili.durum !== taslak.durum}
                              text={taslak.adi}
                              onClick={(event) => props.handleSeciliTaslak(event, taslak)}/>
                    ))}
                  </FiltreAlani>
                )}
              </div>
              <Button intent={'success'} text={props.butonText} onClick={props.handleEklemeSayfasiGecis}/>
            </div>
            <ListeBaslik>
              <SolaYasli>{props.title}</SolaYasli>
              <SagaYasli>
                <BaslikMetin>TOPLAM</BaslikMetin>
                <SayiGosterge>{props.secili ? (props.secili === null ? props.dizi.length : (props.secili.durum ? props.dizi2.length : props.dizi1.length)) : props.dizi.length}</SayiGosterge>
              </SagaYasli>
            </ListeBaslik>
            <KartListe>
              <HTMLTable style={{width:"100%"}}>
                <thead>
                  <th>Adı</th>
                  <th>Ekleyen Kişi</th>
                  <th>Güncelleme Tarihi</th>
                </thead>
                <tbody>
                {props.secili ? (
                  props.secili === null ? (
                    props.dizi.map(item => (
                      <tr key={item.id}>
                        <td>{item.adi}</td>
                        <td>{item.ekleyen}</td>
                        <td>{item.guncellemeTarihi}</td>
                        <td><Icon icon={"refresh"} intent={'primary'} iconSize={"20"}/></td>
                        <td><Icon icon={"trash"} intent={'danger'} iconSize={"20"}/></td>
                      </tr>
                    ))
                  ) :(
                  props.secili.durum ? (
                    props.dizi2.map(item =>(
                      <tr key={item.id}>
                        <td>{item.adi}</td>
                        <td>{item.ekleyen}</td>
                        <td>{item.guncellemeTarihi}</td>
                        <td><Icon icon={"refresh"} intent={'primary'} iconSize={"20"}/></td>
                        <td><Icon icon={"trash"} intent={'danger'} iconSize={"20"}/></td>
                      </tr>
                    ))
                  ) : (
                    props.dizi1.map(item => (
                      <tr key={item.id}>
                        <td>{item.adi}</td>
                        <td>{item.ekleyen}</td>
                        <td>{item.guncellemeTarihi}</td>
                        <td><Icon icon={"refresh"} intent={'primary'} iconSize={"20"}/></td>
                        <td><Icon icon={"trash"} intent={'danger'} iconSize={"20"}/></td>
                      </tr>
                    ))
                  )
                  )
                ): (
                  props.dizi.map(item => (
                    <tr key={item.id}>
                      <td>{item.adi}</td>
                      <td>{item.ekleyen}</td>
                      <td>{item.guncellemeTarihi}</td>
                      <td><Icon icon={"refresh"} intent={'primary'} iconSize={"20"}/></td>
                      <td><Icon icon={"trash"} intent={'danger'} iconSize={"20"}/></td>
                    </tr>
                  ))
                )}
                </tbody>
              </HTMLTable>
            </KartListe>
          </Col>
        </Row>
      </Container>

    </WrapperListe>
  )
}

export default React.memo(Liste)