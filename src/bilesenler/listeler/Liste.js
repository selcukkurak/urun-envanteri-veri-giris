import React from 'react'
import styled from 'styled-components'
import { Button, Card, HTMLTable, Tag } from '@blueprintjs/core'
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
  width: 500px;
  min-width: 200px;
  background-color: white;
  top: 0;
  box-shadow: 0 1px 1px -1px rgba(0, 0, 0, 0.4);

  &:first-child {
    width: 60%;
  }
  &:last-child {
    width: 50px;
    min-width: 50px;
  }
`
const Etiket = styled(Tag)`
  margin-left: 32px;
  font-size: 14px;
`
const AktifSatir = styled.tr`
  cursor: default;
`

function Liste ({ dizi, url, handleSeciliItem, secili, taslakYapFunc }) {
  moment.locale('tr')
  const tarih = (tarihItem) => {
    return moment(tarihItem)
  }
  return (
    <KartListe>
      <Table>
        <thead>
        <tr>
          <TableHeader>Adı</TableHeader>
          <TableHeader>Güncelleyen Kişi</TableHeader>
          <TableHeader>Güncelleme Tarihi</TableHeader>
          <TableHeader>Eylemler</TableHeader>
        </tr>
        </thead>
        <tbody>
        {dizi.map((item, index) => (
          <AktifSatir index={index} secili={secili} className="active" key={item.id}>
            <td style={{width:"60%"}} onClick={() => handleSeciliItem(index)}>
              <Link to={`${url}/detay/${item.id}`}>
                {item.adi}
                {item.taslak && (
                  <Etiket minimal intent="danger">Taslak</Etiket>
                )}
              </Link>
            </td>
            <td>{item.guncelleyen}</td>
            <td>{item.guncellemeTarihi && tarih(item.guncellemeTarihi).format('DD.MM.YYYY')}</td>
            <td style={{ display: 'flex' }}>
              <Link to={`${url}/guncelle/${item.id}`}>
                <Button style={{ flex: 1 }} minimal icon={'edit'} intent={'primary'}/>
              </Link>
              <Button minimal icon={'trash'} intent={'danger'} onClick={() => !item.taslak && taslakYapFunc(item.id)}/>
            </td>
          </AktifSatir>
        ))}
        </tbody>
      </Table>
    </KartListe>
  )
}

export default React.memo(Liste)