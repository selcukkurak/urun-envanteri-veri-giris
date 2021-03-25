import React from 'react'
import styled from 'styled-components'
import { Button, Classes, Dialog, FormGroup, InputGroup } from '@blueprintjs/core'
import handleModal from '../../hook/handleModal'
import { Col, Container, Row } from 'react-grid-system'
import { Form, Formik } from 'formik'

const Buton = styled(Button)`
  height: 20px;
`

export default function HaberBulteniTabloDialog ({ bulten }) {
  const [open, handleClickOpenModal, handleClickCloseModal] = handleModal()

  const initialValues = {
    tabloAdi: '',
    veritabaniTabloAdi: '',
    aciklama: ''
  }
  const handleSubmit = (event) => {
    event.preventDefault()
  }
  return (
    <div>
      <Buton intent={'success'} text={'Yeni Tablo Ekle'} onClick={handleClickOpenModal}/>
      <Dialog
        onClose={handleClickCloseModal}
        title={bulten && bulten.adi}
        isOpen={open}
      >
        <div className={Classes.DIALOG_BODY}>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({
              values,
              handleChange,
              dirty,
              resetForm,
            }) => (
              <Form>
                <Container>
                  <Row>
                    <Col xs={9} sm={10} md={10} lg={10}/>
                    <Col>
                      {dirty && (
                        <Button minimal intent="danger" rightIcon={'cross'} text="İçeriği Temizle" onClick={resetForm}/>
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup label="Tablo Adı:">
                        <InputGroup name="tabloAdi" value={values.tabloAdi || ""} onChange={handleChange}/>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup label="Veritabanı Tablo Adı:">
                        <InputGroup name="veritabaniTabloAdi" value={values.veritabaniTabloAdi || ""} onChange={handleChange}/>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup label="Açıklama:">
                        <InputGroup name="aciklama" value={values.veritabaniTabloAdi ||  ""} onChange={handleChange}/>
                      </FormGroup>
                    </Col>
                  </Row>
                </Container>
              </Form>
            )}
          </Formik>

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