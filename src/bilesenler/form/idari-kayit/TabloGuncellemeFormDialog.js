import React from 'react'
import { Button, Classes, Dialog, FormGroup, InputGroup } from '@blueprintjs/core'
import { Col, Container, Row } from 'react-grid-system'
import handleModal from '../../hook/handleModal'


export default function TabloGuncellemeFormDialog({tablo, handleChange}){
  const [open, handleClickOpenModal, handleClickCloseModal] = handleModal()

  return(
    <div>
      <Button minimal rightIcon={'edit'} intent={'primary'} text="Düzenle" onClick={handleClickOpenModal}/>
      <Dialog
        onClose={handleClickCloseModal}
        title={"Tablo Güncelle"}
        isOpen={open}
      >
        <div className={Classes.DIALOG_BODY}>
          {tablo && (
            <Container>
              <Row>
                <Col>
                  <FormGroup label="Tablo Adı:">
                    <InputGroup name={`tablolar[${tablo.id}].adi`}
                                value={tablo.adi || ''} onChange={handleChange}/>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup label="Tablo Açıklaması:">
                    <InputGroup name={`tablolar[${tablo.id}].aciklama`}
                                value={tablo.aciklama || ''}
                                onChange={handleChange}/>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup label="Tablo View Adı:">
                    <InputGroup name={`tablolar[${tablo.id}].viewAdi`}
                                value={tablo.viewAdi || ''} onChange={handleChange}/>
                  </FormGroup>
                </Col>
              </Row>
            </Container>
          )}
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button text="Kapat" intent="danger" onClick={handleClickCloseModal}/>
            <Button text="Kaydet" intent="success" onClick={handleClickCloseModal}/>
          </div>
        </div>
      </Dialog>
    </div>
  )
}