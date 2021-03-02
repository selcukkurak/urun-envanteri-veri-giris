import React from 'react'
import { Container, Row, Col } from 'react-grid-system'
import { Classes, Divider, HTMLTable, Drawer } from '@blueprintjs/core'
import { siraliKurumlar } from '../store/selectors'
import { useRecoilValue } from 'recoil'
import { SutunBaslik, SutunIcerik } from './AnketDetayDialog'

const GridDivider = () => {
  return (
    <Row>
      <Col sm={12}>
        <Divider/>
      </Col>
    </Row>
  )
}
export default function IdariKayitDialog ({ idariKayit, open, handleClickCloseModal }) {
  const kurumlar = useRecoilValue(siraliKurumlar)
  const kurum = idariKayit && kurumlar.find(k => k.kodu === idariKayit.kaynakKurumId)
  if (!idariKayit) return null
  return (
    <Drawer
      isOpen={open}
      size={500}
      icon="info-sign"
      onClose={handleClickCloseModal}
      title={idariKayit.adi}
    >
      <div className={Classes.DRAWER_BODY}>
        <Container>
          <Row>
            <SutunBaslik sm={3}>İçerik:</SutunBaslik>
            <SutunIcerik sm={9}>{idariKayit.icerik}</SutunIcerik>
          </Row>
          <GridDivider/>
          <Row>
            <SutunBaslik sm={3}>Kaynak Kurum:</SutunBaslik>
            <SutunIcerik sm={9}>{kurum && kurum.adi}</SutunIcerik>
          </Row>
          <GridDivider/>
          <Row>
            <SutunBaslik sm={3}>Kaynak Birim:</SutunBaslik>
            <SutunIcerik sm={9}>{idariKayit.kaynakBirim}</SutunIcerik>
          </Row>
          <GridDivider/>
          <Row>
            <SutunBaslik sm={3}>Yasal Hükümler:</SutunBaslik>
            <SutunIcerik sm={9}>{idariKayit.yasalHukum}</SutunIcerik>
          </Row>
          <GridDivider/>
          <Row>
            <SutunBaslik sm={3}>Veri Biçimi:</SutunBaslik>
            <SutunIcerik sm={3}>{idariKayit.bicim && idariKayit.bicim.adi}</SutunIcerik>
            <SutunBaslik sm={3}>Düzey:</SutunBaslik>
            <SutunIcerik sm={3}>{idariKayit.veriDuzeyi && idariKayit.veriDuzeyi.adi}</SutunIcerik>
          </Row>
          <GridDivider/>
          <Row>
            <SutunBaslik sm={3}>Veri Talep Biçimi:</SutunBaslik>
            <SutunIcerik sm={3}>{idariKayit.talepBicimi && idariKayit.talepBicimi.adi}</SutunIcerik>
            <SutunBaslik sm={3}>Transfer Sıklık:</SutunBaslik>
            <SutunIcerik sm={3}>{idariKayit.transferPeriyot && idariKayit.transferPeriyot.adi}</SutunIcerik>
          </Row>
          <GridDivider/>
          <Row>
            <SutunBaslik sm={3}>Aktarım Türü:</SutunBaslik>
            <SutunIcerik sm={3}>{idariKayit.aktarimTuru && idariKayit.aktarimTuru.adi}</SutunIcerik>
            <SutunBaslik sm={3}>Transfer Sorumlu Birim:</SutunBaslik>
            <SutunIcerik sm={3}>{idariKayit.transferdenSorumluBirim}</SutunIcerik>
          </Row>
          <GridDivider/>
          <Row>
            <SutunBaslik sm={3}>Hedef TÜİK Veritabanı:</SutunBaslik>
            <SutunIcerik sm={3}>{idariKayit.veritabani}</SutunIcerik>
            <SutunBaslik sm={3}>Hedef TÜİK Şema:</SutunBaslik>
            <SutunIcerik sm={3}>{idariKayit.sema}</SutunIcerik>
          </Row>
          <GridDivider/>
          <Row>
            <SutunBaslik sm={3}>İletişim E-posta Grubu:</SutunBaslik>
            <SutunIcerik sm={9}>{idariKayit.epostaGruplari}</SutunIcerik>
          </Row>
          <GridDivider/>
          <Row>
            <SutunBaslik sm={3}>İletişim:</SutunBaslik>
          </Row>
          <Row>
            <SutunIcerik sm={12}>
              <HTMLTable>
                <thead>
                <tr>
                  <td>Adı</td>
                  <td>Birim</td>
                  <td>Telefon</td>
                  <td>E-Posta</td>
                </tr>
                </thead>
                <tbody>
                {idariKayit.iletisimKisileri && idariKayit.iletisimKisileri.filter(kisi => kisi.kurumDisi).map((row) => (
                  <tr key={row.id}>
                    <td>{row.adSoyad}</td>
                    <td>{row.disBirimAdi}</td>
                    <td>{row.telefon}</td>
                    <td>{row.eposta}</td>
                  </tr>
                ))}
                </tbody>
              </HTMLTable>
            </SutunIcerik>
          </Row>
          <GridDivider/>
          <Row>
            <SutunBaslik sm={3}>Kurum İçi İletişim:</SutunBaslik>
          </Row>
          <Row>
            <SutunIcerik sm={12}>
              <HTMLTable>
                <thead>
                <tr>
                  <td>Adı</td>
                  <td>Birim</td>
                  <td>Telefon</td>
                  <td>E-Posta</td>
                </tr>
                </thead>
                <tbody>
                {idariKayit.iletisimKisileri && idariKayit.iletisimKisileri.filter(kisi => !kisi.kurumDisi).map((row) => (
                  <tr key={row.id}>
                    <td>{row.adSoyad}</td>
                    <td>{row.disBirimAdi}</td>
                    <td>{row.telefon}</td>
                    <td>{row.eposta}</td>
                  </tr>
                ))}
                </tbody>
              </HTMLTable>
            </SutunIcerik>
          </Row>
        </Container>
      </div>
    </Drawer>

  )
}