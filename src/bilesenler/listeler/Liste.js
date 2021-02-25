import React from 'react'
import styled from 'styled-components'
import { Button, Card, HTMLTable, Tag, Tooltip } from '@blueprintjs/core'
import { Link } from 'react-router-dom'
import moment from 'moment'

const KartListe = styled(Card)`
  margin-left: 8px;
  padding: 0;
  height: 60vh;
  overflow-y: scroll;
`

const Table = styled(HTMLTable)`
  text-align: center;
  width: 100%;
  position: relative;
  border-collapse: collapse;
`
const TableHeader = styled.th`
  position: sticky;
  background-color: white;
  top: 0;
  box-shadow: 0 1px 1px -1px rgba(0, 0, 0, 0.4);
`
const Etiket = styled(Tag)`
  margin-left: 32px;
  font-size: 14px;
`


function Liste ({dizi, url, handleSeciliItem}) {
  moment.locale('tr')
  const tarih = (tarihItem) => {
    return moment(tarihItem)
  }
  return (
    <KartListe>
      <Table>
        <thead>
        <TableHeader>Adı</TableHeader>
        <TableHeader>Ekleyen Kişi</TableHeader>
        <TableHeader>İşlem Tarihi</TableHeader>
        <TableHeader>Eylemler</TableHeader>
        </thead>
        <tbody>
        {dizi.map((item, index) => (
          <tr key={item.id}>
            <td onClick={() => handleSeciliItem(index)}>{item.adi}
              {item.taslak && (
                <Etiket minimal intent="danger">Taslak</Etiket>
              )}
            </td>
            <td>{item.ekleyen}</td>
            <td>{item.guncellemeTarihi && tarih(item.guncellemeTarihi).format('DD.MM.YYYY')}</td>
            <td style={{ display: 'flex' }}>
              <Link to={`${url}/guncelle/${item.id}`}>
                <Button style={{ flex: 1 }} minimal icon={'edit'} intent={'primary'}/>
              </Link>
              <Tooltip content={'Üretiliyor Durumunu Değiştir'}>
                <Button minimal icon={'trash'} intent={'danger'}/>
              </Tooltip>
            </td>
          </tr>
        ))}
        </tbody>
      </Table>
    </KartListe>
  )
}

export default React.memo(Liste)