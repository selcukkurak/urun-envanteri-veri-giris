import React from 'react'
import {Card, HTMLTable } from '@blueprintjs/core'
import styled from 'styled-components'

const Kart = styled(Card)`
  padding: 0;
  height: 400px;
  overflow-y: auto;
`

export default function KolonListesi ({ seciliTablo }) {
  console.log("seciliTablo", seciliTablo.kolonBilgileri)
  if (!seciliTablo || !seciliTablo.kolonBilgileri) return null
  return (
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
        {seciliTablo.kolonBilgileri && seciliTablo.kolonBilgileri.map((kolon) => (
          <tr key={kolon.id}>
            <td>{kolon.adi}</td>
            <td>{kolon.aciklama}</td>
          </tr>
        ))}
        </tbody>
      </HTMLTable>
    </Kart>
  )
}