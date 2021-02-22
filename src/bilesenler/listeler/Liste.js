import React from 'react'
import styled from 'styled-components'
import { Container, Row, Col } from 'react-grid-system'
import { Button, Card, Colors, HTMLTable, Tag, Tooltip } from '@blueprintjs/core'
import { AnaRenkler } from '@tuik/renkler'
import { Link } from 'react-router-dom'
import moment from 'moment'

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
  margin:24px 8px 8px;
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
const Table = styled(HTMLTable)`
  text-align: center;
  width: 100%;
  position: relative;
  border-collapse: collapse;
`
const TableHeader = styled.th`
  position: sticky;
  top: 0;
  box-shadow: 0 1px 1px -1px rgba(0, 0, 0, 0.4);
`
const Etiket = styled(Tag)`
  margin-left: 32px;
  font-size: 14px;
`

function Liste (props) {
  moment.locale('tr')
  const tarih = (tarihItem) => {
    return moment(tarihItem)
  }
  return (
    <WrapperListe>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: 'flex' }}>
              <div style={{ flex: 1 }}>
                {props.durumlar && (
                  <FiltreAlani>
                    <FiltreLabel>{props.filtreLabel}</FiltreLabel>
                    {props.durumlar.map((taslak, index) => (
                      <Button key={index} intent={'primary'}
                              minimal={!props.secili || props.secili.durum !== taslak.durum}
                              text={taslak.adi}
                              onClick={(event) => props.handleSeciliTaslak(event, taslak)}/>
                    ))}
                  </FiltreAlani>
                )}
              </div>
              <Link to={props.path}>
                <Button intent={'success'} text={props.butonText}/>
              </Link>
            </div>
            <ListeBaslik>
              <SolaYasli>{props.title}</SolaYasli>
              <SagaYasli>
                <BaslikMetin>TOPLAM</BaslikMetin>
                <SayiGosterge>{props.secili ? props.secili.durum ? props.dizi1.length : props.dizi2.length : props.dizi.length}</SayiGosterge>
              </SagaYasli>
            </ListeBaslik>
            <KartListe>
              <Table>
                <thead>
                <TableHeader>Adı</TableHeader>
                <TableHeader>Ekleyen Kişi</TableHeader>
                <TableHeader>İşlem Tarihi</TableHeader>
                <TableHeader>Eylemler</TableHeader>
                </thead>
                <tbody>
                {props.secili ? (
                  props.secili.durum ? (
                    props.dizi1.map(item => (
                      <tr key={item.id}>
                        <td>{item.adi}
                          {item.taslak && (
                            <Etiket minimal intent="danger">Taslak</Etiket>
                          )}
                        </td>
                        <td>{item.ekleyen}</td>
                        <td>{item.guncellemeTarihi && tarih(item.guncellemeTarihi).format('DD.MM.YYYY')}</td>
                        <td style={{ display: 'flex' }}>
                          <Link to={window.location.pathname + '/guncelle' + '/' + item.id}>
                            <Button style={{ flex: 1 }} minimal icon={'edit'} intent={'primary'}/>
                          </Link>
                          <Tooltip content={'Üretiliyor Durumunu Değiştir'}>
                            <Button minimal icon={'trash'} intent={'danger'}/>
                          </Tooltip>
                        </td>
                      </tr>
                    ))
                  ) : (
                    props.dizi2.map(item => (
                      <tr key={item.id}>
                        <td>{item.adi}</td>
                        <td>{item.ekleyen}</td>
                        <td>{item.guncellemeTarihi && tarih(item.guncellemeTarihi).format('DD.MM.YYYY')}</td>
                        <td style={{ display: 'flex' }}>
                          <Link to={window.location.pathname + '/guncelle' + '/' + item.id}>
                            <Button style={{ flex: 1 }} minimal icon={'edit'} intent={'primary'}/>
                          </Link>
                          <Tooltip content={'Üretiliyor Durumunu Değiştir'}>
                            <Button minimal icon={'trash'} intent={'danger'}/>
                          </Tooltip>
                        </td>
                      </tr>
                    ))
                  )
                ) : (
                  props.dizi.map(item => (
                    <tr key={item.id}>
                      <td>{item.adi}
                        {item.taslak && (
                          <Etiket minimal intent="danger">Taslak</Etiket>
                        )}
                      </td>
                      <td>{item.ekleyen}</td>
                      <td>{item.guncellemeTarihi && tarih(item.guncellemeTarihi).format('DD.MM.YYYY')}</td>
                      <td style={{ display: 'flex' }}>
                        <Link to={window.location.pathname + '/guncelle' + '/' + item.id}>
                          <Button style={{ flex: 1 }} minimal icon={'edit'} intent={'primary'}/>
                        </Link>
                        <Tooltip content={'Üretiliyor Durumunu Değiştir'}>
                          <Button minimal icon={'trash'} intent={'danger'}/>
                        </Tooltip>
                      </td>
                    </tr>
                  ))
                )
                }
                </tbody>
              </Table>
            </KartListe>
          </Col>
        </Row>
      </Container>

    </WrapperListe>
  )
}

export default React.memo(Liste)