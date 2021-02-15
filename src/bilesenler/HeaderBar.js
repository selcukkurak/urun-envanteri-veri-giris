import React from 'react';
import logo from './images/tuik-logo.svg';
import { Alignment, Classes, Navbar } from '@blueprintjs/core'
import { ArayuzRenkleri } from '@tuik/renkler'

export default function HeaderBar() {
  return (
    <Navbar fixedToTop style={{ backgroundColor: ArayuzRenkleri.ustMenu }} className={Classes.DARK}>
      <Navbar.Group align={Alignment.LEFT}>
        <img src={logo} width="40px" alt="banner" />
        <Navbar.Divider/>
        <Navbar.Heading>İstatistiki Ürün Envanteri Veri Giriş Uygulaması</Navbar.Heading>
      </Navbar.Group>
    </Navbar>
  );
}