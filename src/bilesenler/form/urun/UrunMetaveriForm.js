import React  from 'react'
import { Col, Container, Row } from 'react-grid-system'
import { Button, FormGroup, InputGroup } from '@blueprintjs/core'
import styled from 'styled-components'
import MetaveriIcerikFormDialog from './MetaveriIcerikFormDialog'
import htmlParser from '../../util/htmlParser'
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel
} from 'react-accessible-accordion'

const Satir = styled(Row)`
  padding: 8px 8px;
`
const Baslik = styled.div`
  font-size: 1.3em;
  font-weight: bold;
  
  &:first-child {
    padding-top: 16px;
  }
`
const Yazi = styled.div`
  margin-top: 16px;
`
const Icerik = styled.div`
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
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
              <Accordion allowMultipleExpanded>
                <AccordionItem key={index}>
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      {metaveri.adi}
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    {metaveri.metaveriBasliklar.map((icerik, index) => (
                      <Icerik key={index}>
                        <Baslik>{icerik.baslik && icerik.baslik.label}</Baslik>
                        <Yazi>{htmlParser(`${icerik.aciklama}`)}</Yazi>
                      </Icerik>
                    ))}
                  </AccordionItemPanel>
                </AccordionItem>
              </Accordion>
            )}
          </Col>
          <Col xs={1.5} sm={2} md={2} lg={2}>
            <MetaveriIcerikFormDialog metaveriler={metaveriler} metaveri={metaveri} setFieldValue={setFieldValue}
                                      handleChange={handleChange}/>
          </Col>

        </Satir>
      ))}
    </Container>
  )

}
