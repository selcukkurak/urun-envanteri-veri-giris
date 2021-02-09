import React, {memo} from 'react'
import { linkler } from './linkler'
import { Link } from 'react-router-dom'
import { MenuItemStyled, MenuStyled } from './yanMenuStyled'
import styled from 'styled-components'

const Wrapper = styled.div`
  padding: 70px 0 12px;
`

function YanMenuItem () {
  return(
    <Wrapper>
      <MenuStyled>
        {linkler.map((item, index) => (
            <Link key={index} to={item.link}>
              <MenuItemStyled  text={item.baslik}/>
            </Link>
        ))}
      </MenuStyled>
    </Wrapper>
  )
}
export default memo(YanMenuItem)