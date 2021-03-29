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
  width: ${props => props.acik  ? '210px' : '0px' };
  height: 100vh;
  top: 0;
  left: 0;
  position: fixed;
  overflow-y: auto;
  background-color: ${ArayuzRenkleri.yanMenu};
  border-right: 1px solid ${Colors.LIGHT_GRAY3};
`
const YanMenuIcon = styled.div`
  padding-top:60px;
  left: 10%;
  position: absolute;
`

function YanMenuItem ({ acik, handleYanMenuClick }) {
  const [seciliMenu, setSeciliMenu] = useState(null)
  const seciliMenuClick = (item) => {
    setSeciliMenu(item)
  }
  return (
    <YanMenu acik={acik}>
      {acik && (
        <YanMenuIcon>
          <Tooltip>
            <Icon icon={'cross'} iconSize={30} onClick={handleYanMenuClick}/>
            Menüyü Kapatmak İçin Tıklayınız
          </Tooltip>
        </YanMenuIcon>
      )}
      <Wrapper>
        <MenuStyled>
          {linkler.map((item, index) => (
            <Link key={index} to={item.link}>
              <MenuItemStyled aktif={seciliMenu && seciliMenu.link === item.link} text={item.baslik}
                              onClick={() => seciliMenuClick(item)}/>
            </Link>
          ))}
        </MenuStyled>
      </Wrapper>
    </YanMenu>
  )
}

export default memo(YanMenuItem)