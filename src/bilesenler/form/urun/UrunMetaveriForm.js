import React from 'react'
import { Col, Container, Row } from 'react-grid-system'
import { Button, Card, FormGroup, HTMLTable, InputGroup } from '@blueprintjs/core'
import styled from 'styled-components'
import MetaveriIcerikFormDialog from './MetaveriIcerikFormDialog'
import htmlParser from '../../util/htmlParser'

const Satir = styled(Row)`
  padding: 8px 8px;
`


export default function UrunMetaveriForm ({ handleChange, metaveriler, setFieldValue }) {


  const konuAdd = () => {
    const yeniKonu = {
      id: metaveriler.length,
      adi: '',
      metaveriBasliklar: []
    }

    setFieldValue('metaveriler', [...metaveriler, yeniKonu])
  }

  return (
    <Container fluid>
      <Satir>
        <Col xs={1.5} sm={2} md={2} lg={2}>
          <Button fill intent={'success'} text="Konu Ekle" rightIcon={'plus'} onClick={() => konuAdd()}/>
        </Col>
      </Satir>

      {metaveriler.length !== 0 && metaveriler.map((metaveri, index) => (
        <Satir>
          <Col xs={8} sm={8} md={8} lg={8}>
            <FormGroup label={'Metaveri Konusu:'}>
              <InputGroup name={`metaveriler[${index}].adi`} value={metaveri.adi || ''} onChange={handleChange}/>
            </FormGroup>
            {metaveri.metaveriBasliklar.length !== 0 && (
              <Card style={{padding:0}}>
                <HTMLTable striped style={{width:"100%"}}>
                  <thead>
                  <tr>
                    <th>Başlık</th>
                    <th>Açıklama</th>
                  </tr>
                  </thead>
                  {metaveri.metaveriBasliklar.map(icerik => (
                    <tbody key={icerik.id}>
                      <tr>
                        <td>{icerik.baslik && icerik.baslik.label}</td>
                        <td>{htmlParser(`${icerik.aciklama}`)}</td>
                      </tr>
                    </tbody>
                  ))}

                </HTMLTable>

              </Card>
            ) }
          </Col>
          <Col xs={1.5} sm={2} md={2} lg={2}>
            <MetaveriIcerikFormDialog metaveriler={metaveriler} metaveri={metaveri} setFieldValue={setFieldValue} handleChange={handleChange}/>
          </Col>

        </Satir>
      ))}
    </Container>
  )
}
