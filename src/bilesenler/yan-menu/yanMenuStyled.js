import styled from 'styled-components'
import {Menu, MenuItem } from '@blueprintjs/core'
import {AnaRenkler, ArayuzRenkleri} from '@tuik/renkler'

export const MenuStyled = styled(Menu)`
  padding: 0;
`
export const MenuItemStyled = styled(MenuItem)`
  align-items: center;
  padding: 8px 16px 0;
  background-color: ${ArayuzRenkleri.yanMenu};
  height: 56px;
  width: 279px;
  color: white;
  border-bottom: 1px solid rgb(170, 23, 23);
  font-size:1.1em;
  border-radius: 2px;
  &:hover {
    background-color: ${AnaRenkler.acikKirmizi};
    text-decoration: none;
    color: white;
  }
  
`


