import React from 'react'
import logo from './images/tuik-logo.svg'
import { Alignment, Button, Classes, Menu, Navbar, Popover, Position } from '@blueprintjs/core'
import { ArayuzRenkleri } from '@tuik/renkler'
import { useKeycloak } from '@react-keycloak/web'
import styled from 'styled-components'
import useYanMenu from './yan-menu/useYanMenu'

const NavbarLoginDiv = styled(Navbar.Heading)`
  float: right;
`

export default function HeaderBar () {
  const { keycloak, initialized } = useKeycloak()
  const { boy } = useYanMenu()
  return (
    <Navbar fixedToTop style={{ backgroundColor: ArayuzRenkleri.ustMenu }} className={Classes.DARK}>
      <Navbar.Group align={Alignment.LEFT}>
        <img src={logo} width="40px" alt="banner"/>
        <Navbar.Divider/>
        <Navbar.Heading>
          <strong style={{ paddingRight: '16px' }}>İstatistiki Ürün Envanteri </strong>
          Veri Giriş Uygulaması
        </Navbar.Heading>
      </Navbar.Group>
      <Navbar.Group align='right'>
        {keycloak.idTokenParsed && initialized ? (
          <NavbarLoginDiv>
            <Popover content={
              <Menu>
                {boy < 850 && (<div style={{textAlign:'center', padding:"8px 0"}}>{ keycloak.idTokenParsed.name }</div>)}
                <Button fill icon={'log-out'} minimal text="Çıkış Yap" onClick={keycloak.logout}/>

              </Menu>
            } position={Position.BOTTOM}>
              <Button icon="person" text={boy > 850 && keycloak.idTokenParsed.name}/>

            </Popover>
          </NavbarLoginDiv>
        ) : (
          <Button minimal icon={'log-in'} text={boy > 850 && 'Giriş Yap'} onClick={keycloak.login}/>
        )}
      </Navbar.Group>
    </Navbar>
  )
}