import React, { useState } from 'react'
import { Button, Classes, Dialog, FormGroup, InputGroup } from '@blueprintjs/core'
import handleModal from '../../hook/handleModal'
import { Container, Row, Col } from 'react-grid-system'

export default function TabloFormDialog ({ tablolar, setFieldValue, handleChange, seciliKayit}) {
  const [open, handleClickOpenModal, handleClickCloseModal] = handleModal()
  const [seciliTablo, setSeciliTablo] = useState(null)

  const tabloAdd = () => {
    const yenitablo = {
      id: tablolar.length,
      adi: '',
      aciklama: '',
      viewAdi: '',
      idariKayitId:seciliKayit

    }
    setFieldValue('tablolar', [...tablolar, yenitablo])
    seciliItem(yenitablo)
    handleClickOpenModal()
  }

  const seciliItem = (item) => {
    setSeciliTablo(item)
  }

  return (
    <div>
      <Button style={{ marginBottom: '8px' }} intent={'success'} text="Tablo Ekle" rightIcon={'plus'}
              onClick={tabloAdd}/>
      <Dialog
        onClose={handleClickCloseModal}
        title='Tablo Ekle'
        isOpen={open}
      >
        <div className={Classes.DIALOG_BODY}>
          {tablolar && tablolar.length !== 0 && seciliTablo && (
            <Container>
              <Row>
                <Col>
                  <FormGroup label="Tablo Adı:">
                    <InputGroup name={`tablolar[${seciliTablo.id}].adi`}
                                value={tablolar[seciliTablo.id].adi || ''} onChange={handleChange}/>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup label="Tablo Açıklaması:">
                    <InputGroup name={`tablolar[${seciliTablo.id}].aciklama`}
                                value={tablolar[seciliTablo.id].aciklama || ''}
                                onChange={handleChange}/>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup label="Tablo View Adı:">
                    <InputGroup name={`tablolar[${seciliTablo.id}].viewAdi`}
                                value={tablolar[seciliTablo.id].viewAdi || ''} onChange={handleChange}/>
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