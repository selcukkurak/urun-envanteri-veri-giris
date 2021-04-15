import React from 'react'
import handleModal from '../hook/handleModal'
import { Classes, Drawer, HTMLTable } from '@blueprintjs/core'

export default function KolonBilgileriDrawer ({ tablo }) {
  const [
    open,
    handleClickOpenModal,
    handleClickCloseModal
  ] = handleModal()
  return (
    <div>
      <td width={'30%'} style={{cursor:'default'}} onClick={handleClickOpenModal}>{tablo.adi}</td>
      <Drawer
        isOpen={open}
        size={750}
        onClose={handleClickCloseModal}
        title={`${tablo.adi} Kolon Bilgileri`}
        position={'right'}
        icon={'info-sign'}
      >
        <div className={Classes.DRAWER_BODY}>
          {tablo.kolonBilgileri && (
            <HTMLTable striped width={'100%'}>
              <thead>
              <tr>
                <th>Kolon Adı</th>
                <th>Kolon Açıklaması</th>
                <th>İlişkisel Tablo Adı</th>
                <th>View Kolon Adı</th>
              </tr>
              </thead>
              <tbody>
              {tablo.kolonBilgileri.map(kolon => (
                <tr key={kolon.id}>
                  <td width={'25%'}>{kolon.adi}</td>
                  <td width={'25%'}>{kolon.aciklama}</td>
                  <td width={'25%'}>{kolon.iliskiliTabloKolonAdi}</td>
                  <td width={'25%'}>{kolon.viewKolonAdi}</td>
                </tr>
              ))}
              </tbody>
            </HTMLTable>
          )}
        </div>
      </Drawer>
    </div>
  )
}