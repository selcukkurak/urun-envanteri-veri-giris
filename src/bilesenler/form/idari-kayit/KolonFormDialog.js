import React from 'react'
import { Button, Classes, Dialog, FormGroup, InputGroup, Switch } from '@blueprintjs/core'
import handleModal from '../../hook/handleModal'
import { Col, Container, Row } from 'react-grid-system'

export default function KolonFormDialog({handleChange,setFieldValue, tablo}){
  const [open, handleClickOpenModal, handleClickCloseModal] = handleModal()
  const kolonAdd = () => {
      const yeniKolon = {
        id: tablo.kolonBilgileri.length,
        adi: '',
        aciklama: '',
        viewAdi: '',
        pkKontrol: false,
        iliskiTabloKolonAdi: ''
      }
      setFieldValue(`tablolar[${tablo.id}].kolonBilgileri`, [...tablo.kolonBilgileri, yeniKolon])
      handleClickOpenModal()
  }

  return(
    <di>
      <Button intent={'success'} text="Kolon Ekle" rightIcon='plus' onClick={kolonAdd}/>
      <Dialog
        onClose={handleClickCloseModal}
        title={tablo.adi}
        isOpen={open}
      >
        <div className={Classes.DIALOG_BODY}>
          {tablo.kolonBilgileri.length !== 0 && (
            <Container>
              <Row>
                <Col>
                  <FormGroup label="Kolon Adı:">
                    <InputGroup/>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup label="Açıklama:">
                    <InputGroup/>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup label="View Adı:">
                    <InputGroup/>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup inline>
                    <Switch label='Pk mı Fk mı?' alignIndicator='right'
                            onChange={handleChange}/>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup label="İlişkisel Tablo Kolon Adı:">
                    <InputGroup/>
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
    </di>
  )
}