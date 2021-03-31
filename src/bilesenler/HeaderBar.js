import React from 'react';
import logo from './images/tuik-logo.svg';
import { Alignment, Button, Classes, Navbar } from '@blueprintjs/core'
import { ArayuzRenkleri } from '@tuik/renkler'
import { useKeycloak } from '@react-keycloak/web'
import styled from 'styled-components'

const NavbarLoginDiv = styled(Navbar.Heading)`
  flex:1;
  margin:12px 32px;
`


export default function HeaderBar() {
  const { keycloak, initialized } = useKeycloak()
  return (
    <Navbar fixedToTop style={{ backgroundColor: ArayuzRenkleri.ustMenu }} className={Classes.DARK}>
      <Navbar.Group align={Alignment.LEFT}>
        <img src={logo} width="40px" alt="banner" />
        <Navbar.Divider/>
        <Navbar.Heading>
          <strong style={{paddingRight:"16px"}}>İstatistiki Ürün Envanteri   </strong>
          Veri Giriş Uygulaması
        </Navbar.Heading>
      </Navbar.Group>
      <Navbar.Group align='right'>
        {keycloak.idTokenParsed && initialized ? (
          <div style={{display:'flex'}}>
            <NavbarLoginDiv>{keycloak.idTokenParsed.name}</NavbarLoginDiv>
            <Button minimal text="Çıkış Yap" onClick={keycloak.logout}/>
          </div>
        ): (
          <Button minimal text="Giriş Yap" onClick={keycloak.login}/>
        )}
      </Navbar.Group>
    </Navbar>
  );
}