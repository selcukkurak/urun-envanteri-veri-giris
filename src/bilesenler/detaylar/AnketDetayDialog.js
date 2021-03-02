import React from "react";
import {Container, Row, Col} from 'react-grid-system'
import { Classes, Divider, Drawer } from '@blueprintjs/core'
import styled from 'styled-components'

const Icerik = styled.div`
  margin-top: 16px;
`
export const SutunBaslik = styled(Col)`
  font-size: 0.9em;
  font-weight: bold;
  color:black;
  padding-top: 10px;
`

export const SutunIcerik = styled(Col)`
  font-size: 0.9em;
  color:black;
  padding-top: 10px;
`


export default function AnketDetayDialog({anket, open, handleClickCloseModal}){

    const ustDurumu = anket && anket.ustDurumu
        ? anket.ustDurumu === 1 ? 'Evet' : 'Hayır'
        : 'Belirtilmemiş'

    const harzemliDurumu = anket && anket.harzemliDurumu
        ? anket.harzemliDurumu === 1 ? 'Evet' : 'Hayır'
        : 'Belirtilmemiş'
  if(!anket) return null
    return(
    <div>
        <Drawer
            isOpen={open}
            size={500}
            icon="info-sign"
            onClose={handleClickCloseModal}
            title={anket.adi}
        >
            <Icerik>
              <div className={Classes.DRAWER_BODY}>
                <Container>
                  <Row>
                    <SutunBaslik sm={3}>Periyodu:</SutunBaslik>
                    <SutunIcerik sm={3}>{anket.periyot ? anket.periyot.adi : '-'}</SutunIcerik>
                    <SutunBaslik sm={3}>Veri Düzeyi:</SutunBaslik>
                    <SutunIcerik sm={3}>{anket.birimDuzeyi ? anket.birimDuzeyi.adi : '-'}</SutunIcerik>
                  </Row>
                  <Row>
                    <Col sm={12}>
                      <Divider/>
                    </Col>
                  </Row>
                  <Row>
                    <SutunBaslik sm={3}>Örneklem Boyutu:</SutunBaslik>
                    <SutunIcerik sm={3}>{anket.orneklemSayisi}</SutunIcerik>
                    <SutunBaslik sm={3}>Coğrafi Düzeyi:</SutunBaslik>
                    <SutunIcerik sm={3}>{anket.cografiDuzey ? anket.cografiDuzey.adi : '-'}</SutunIcerik>
                  </Row>
                  <Row>
                    <Col sm={12}>
                      <Divider/>
                    </Col>
                  </Row>
                  <Row>
                    <SutunBaslik sm={3}>Şeması:</SutunBaslik>
                    <SutunIcerik sm={3}>{anket.sema}</SutunIcerik>
                    <SutunBaslik sm={3}>Üst Durumu:</SutunBaslik>
                    <SutunIcerik sm={3}>{ustDurumu}</SutunIcerik>
                  </Row>
                  <Row>
                    <Col sm={12}>
                      <Divider/>
                    </Col>
                  </Row>
                  <Row>
                    <SutunBaslik sm={3}>Harzemli Durumu:</SutunBaslik>
                    <SutunIcerik sm={3}>{harzemliDurumu}</SutunIcerik>
                  </Row>
                </Container>
              </div>
            </Icerik>
        </Drawer>
    </div>
    )
}