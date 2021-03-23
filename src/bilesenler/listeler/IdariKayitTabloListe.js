import React, { useState } from 'react'
import { Button, Card, Colors, HTMLTable, Icon} from '@blueprintjs/core'
import { AnaRenkler } from '@tuik/renkler'
import styled from 'styled-components'
import useIdariKayitTabloBilgileri from '../hook/useIdariKayitTabloBilgileri'

const Kart = styled(Card)`
  padding: 0;
`
const Baslik = styled.div`
  font-size: 1.1em;
  font-weight: 600;
  color: ${Colors.DARK_GRAY4};
`
const KayitBaslik = styled.div`
  flex: 1;
  font-size: 0.9em;
  padding:2px 12px;
  font-weight: 600;
  color: ${AnaRenkler.kirmizi};
  width: 50px;
  height: 50px;
`
const UstAlan = styled.div`
  display: flex;
`

export default function IdariKayitTabloListe ({ match, seciliKayit }) {
  const {
    data
  } = useIdariKayitTabloBilgileri(seciliKayit)

  const [, setSeciliTablo] = useState(null)


  const seciliTabloClick = (item) => {
    setSeciliTablo(item)
  }
  return (
    <div>
      <UstAlan>
        <Baslik>İdari Kayıt Adı:</Baslik>
        <KayitBaslik>
          {seciliKayit.adi}
        </KayitBaslik>
        <Link to={`${match.url}/yeni-tablo`}>
          <Button intent={'success'} text={'Yeni Tablo Ekle'}/>
        </Link>
      </UstAlan>
      <Kart>
        <HTMLTable>
          <thead>
          <tr>
            <th>Adı</th>
            <th>Açıklama</th>
            <th>Eylemler</th>
          </tr>
          </thead>
          <tbody>
          {data !== undefined ? data.map(tablo => (
            <tr key={data.id} onClick={() => seciliTabloClick(tablo)}>
              <td>{tablo.adi}</td>
              <td>{tablo.aciklama}</td>
              <td style={{ display: 'flex' }}>
                <Button style={{ flex: 1 }} minimal icon={'edit'} text="Düzenle" intent={'primary'}/>
                <Button minimal intent={'primary'} text="Kolon Ekle"/>
              </td>
            </tr>
          )) : (
            <div align="center" style={{marginTop:'50px'}}>
              <Icon icon={'info-sign'} iconSize={30}/>
              <div style={{fontSize:"1em"}}>
                Bu İdari Kayıta Ait Tablo Yok
              </div>
            </div>
          )}
          </tbody>
        </HTMLTable>
      </Kart>
    </div>
  )
}