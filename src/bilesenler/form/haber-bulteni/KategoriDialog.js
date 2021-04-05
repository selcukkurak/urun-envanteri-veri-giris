import React, { useState } from 'react'
import { Button, Classes, Dialog, FormGroup, InputGroup } from '@blueprintjs/core'
import handleModal from '../../hook/handleModal'
import { Col, Container, Row } from 'react-grid-system'


export default function KategoriDialog({handleChange, kategoriler, setFieldValue, seciliBulten}){
  const [open, handleClickOpenModal, handleClickCloseModal] = handleModal()
  const [seciliKategori, setSeciliKategori] = useState(null)
  const handleAddNewKategori = () => {
    const yeniKategori = {
      id:kategoriler.length,
      adi: '',
      bultenId:seciliBulten
    }
    setFieldValue('kategoriler', [...kategoriler, yeniKategori])
    seciliItem(yeniKategori)
    handleClickOpenModal()
  }
  const seciliItem = (item) => {
    setSeciliKategori(item)
  }
  return(
    <div>
      <Button intent={'success'} text={'Yeni Kategori Ekle'} onClick={handleAddNewKategori}/>
      <Dialog
        onClose={handleClickCloseModal}
        title='Kategori Ekle'
        isOpen={open}
      >
        <div className={Classes.DIALOG_BODY}>
          {kategoriler && kategoriler.length !== 0 && seciliKategori && (
            <Container>
              <Row>
                <Col>
                  <FormGroup label="Kategori Adı:">
                    <InputGroup name={`kategoriler[${seciliKategori.id}].adi`}
                                value={kategoriler[seciliKategori.id].adi || ''} onChange={handleChange}/>
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