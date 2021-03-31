import React, { memo, useState } from 'react'
import { linkler } from './linkler'
import { Link } from 'react-router-dom'
import { MenuItemStyled, MenuStyled } from './yanMenuStyled'
import styled from 'styled-components'
import { ArayuzRenkleri } from '@tuik/renkler'
import { Colors, Icon, Tooltip } from '@blueprintjs/core'

const Wrapper = styled.div`
  padding: 90px 0 12px;
`
const YanMenu = styled.div`
  width: ${props => props.acik ? '210px' : '60px'};
  height: 100vh;
  top: 0;
  left: 0;
  position: fixed;
  overflow-y: auto;
  background-color: ${ArayuzRenkleri.yanMenu};
  border-right: 1px solid ${Colors.LIGHT_GRAY3};
  
`
const YanMenuIcon = styled.div`
  padding-top: 60px;
  left: 10%;
  position: absolute;
`

function YanMenuItem ({ acik, handleYanMenuClick, setAcik }) {
  const [seciliMenu, setSeciliMenu] = useState(null)
  const seciliMenuClick = (item) => {
    setSeciliMenu(item)
  }
  return (
    <YanMenu acik={acik} setAcik={setAcik}>
      <YanMenuIcon>
        <Tooltip>
          <Icon icon="pin" onClick={handleYanMenuClick}/>
          {acik && "Menüyü Kapatmak İçin Tıklayınız"}
        </Tooltip>
      </YanMenuIcon>
      <Wrapper>
        <MenuStyled>
          {linkler.map((item, index) => (
            <Link key={index} to={item.link}>
              <MenuItemStyled aktif={seciliMenu && seciliMenu.link === item.link} text={acik ? item.baslik : ""}
                              icon={item.icon}
                              onClick={() => seciliMenuClick(item)}>
              </MenuItemStyled>
            </Link>
          ))}
        </MenuStyled>
      </Wrapper>
    </YanMenu>
  )
}

export default memo(YanMenuItem)