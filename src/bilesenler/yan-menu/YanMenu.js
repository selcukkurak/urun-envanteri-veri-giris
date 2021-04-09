import React, { memo, useState } from 'react'
import { linkler } from './linkler'
import { Link } from 'react-router-dom'
import { MenuBaslik, MenuItemStyled, MenuStyled, Wrapper, YanMenu, YanMenuIcon } from './yanMenuStyled'
import { Icon, Tooltip } from '@blueprintjs/core'


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
              <MenuItemStyled aktif={seciliMenu && seciliMenu.link === item.link} text={acik ? (<MenuBaslik>{item.baslik}</MenuBaslik>) : ""}
                              icon={(
                                <Icon style={{color:'white'}} icon={item.icon}/>
                              )}
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