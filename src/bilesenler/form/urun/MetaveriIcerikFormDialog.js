import React from 'react'
import { Button, Dialog, Classes, FormGroup } from '@blueprintjs/core'
import handleModal from '../../hook/handleModal'
import { Field } from 'formik'
import styled from 'styled-components'
import ReactQuill from 'react-quill'
import SelectField from '../SelectField'
import useMetaveriler from '../../hook/useMetaveriler'

const QuillStyled = styled(ReactQuill)`
  background-color: white;
`

const ButonStyled = styled(Button)`
  margin-top: 22px;
`

export default function MetaveriIcerikFormDialog ({ metaveri, setFieldValue, metaveriler }) {
  const [open, handleClickOpenModal, handleClickCloseModal] = handleModal()

  const {metaveriBasliklar} = useMetaveriler()
  const basliklar = metaveriBasliklar && metaveriBasliklar.map(baslik => ({label:baslik.adi, value:baslik.id}))

  const seciliBaslikIdler = metaveri.metaveriBasliklar.map(icerik => icerik.baslik && icerik.baslik.value)
  const filtreliBasliklar = basliklar.filter(baslik => !seciliBaslikIdler.includes(baslik.value))


  const reactQuillHandleChange = (name, icerik) => {
    setFieldValue(name, icerik)
  }

  const baslikAdd = () => {
    const yeniBaslik = {
      id: metaveri.metaveriBasliklar.length,
      baslik: null,
      aciklama: '',
    }
    setFieldValue(`metaveriler[${metaveri.id}].metaveriBasliklar`, [...metaveriler[metaveri.id].metaveriBasliklar, yeniBaslik])

    handleClickOpenModal()
  }


  return (
    <div>
      <ButonStyled fill intent={'success'} text="İçerik Ekle" onClick={() => baslikAdd()}/>
      <Dialog
        onClose={handleClickCloseModal}
        title={metaveri.adi}
        isOpen={open}
      >
        <div className={Classes.DIALOG_BODY}>
          {metaveri.metaveriBasliklar.length !== 0 && (
            <div>
              <label>Metaveri Başlığı:</label>
              <Field name={`metaveriler[${metaveri.id}].metaveriBasliklar[${metaveri.metaveriBasliklar.length - 1}].baslik`}
                     isClearable
                     value={metaveri.metaveriBasliklar[metaveri.metaveriBasliklar.length - 1].baslik || null}
                     options={filtreliBasliklar}
                     component={SelectField}/>
              <FormGroup label={'İçerik:'}>
                <QuillStyled name={`metaveriler[${metaveri.id}].metaveriBasliklar[${metaveri.metaveriBasliklar.length - 1}].aciklama`}
                             value={metaveri.metaveriBasliklar[metaveri.metaveriBasliklar.length - 1].aciklama || ''}
                             onChange={(icerik) => reactQuillHandleChange(`metaveriler[${metaveri.id}].metaveriBasliklar[${metaveri.metaveriBasliklar.length - 1}].aciklama`, icerik)}/>
              </FormGroup>
            </div>
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