import React, { memo, useState } from 'react'
import { linkler } from './linkler'
import { Link } from 'react-router-dom'
import { MenuItemStyled, MenuStyled } from './yanMenuStyled'
import styled from 'styled-components'

const Wrapper = styled.div`
  padding: 70px 0 12px;
`

function YanMenuItem () {
  const [seciliMenu, setSeciliMenu] = useState(null)
  const seciliMenuClick = (item) => {
    setSeciliMenu(item)
  }
  return(
    <Wrapper>
      <MenuStyled>
        {linkler.map((item, index) => (
            <Link key={index} to={item.link}>
              <MenuItemStyled aktif={seciliMenu && seciliMenu.link === item.link} text={item.baslik} onClick={() => seciliMenuClick(item)}/>
            </Link>
        ))}
      </MenuStyled>
    </Wrapper>
  )
}
export default memo(YanMenuItem)