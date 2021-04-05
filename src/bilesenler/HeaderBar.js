import React from 'react';
import logo from './images/tuik-logo.svg';
import { Alignment, Button, Classes, Menu, Navbar, Popover, Position } from '@blueprintjs/core'
import { ArayuzRenkleri } from '@tuik/renkler'
import { useKeycloak } from '@react-keycloak/web'
import styled from 'styled-components'

const NavbarLoginDiv = styled(Navbar.Heading)`
  margin:12px 12px;
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
          <NavbarLoginDiv>
            <Popover content={
              <Menu>
                  <Button fill minimal text="Çıkış Yap" onClick={keycloak.logout}/>
              </Menu>
            } position={Position.BOTTOM}>
              <Button icon="person" text={keycloak.idTokenParsed.name} />
            </Popover>
          </NavbarLoginDiv>
        ): (
          <Button minimal text="Giriş Yap" onClick={keycloak.login}/>
        )}
      </Navbar.Group>
    </Navbar>
  );
}