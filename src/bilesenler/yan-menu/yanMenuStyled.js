import styled from 'styled-components'
import { Colors, Menu, MenuItem } from '@blueprintjs/core'
import {AnaRenkler, ArayuzRenkleri} from '@tuik/renkler'

export const MenuStyled = styled(Menu)`
  padding: 0;
`
export const MenuItemStyled = styled(MenuItem)`
  align-items: center;
  padding: 8px 16px 0;
  background-color: ${props => props.aktif ? AnaRenkler.acikKirmizi : ArayuzRenkleri.yanMenu};
  height: 56px;
  width: 209px;
  color: white;
  transition: width 100ms;
  border-bottom: 1px solid rgb(170, 23, 23);
  font-size:1.1em;
  border-radius: 2px;
  &:hover {
    background-color: ${AnaRenkler.kirmizi};
    text-decoration: none;
    color: white;
  }
  
`
export const Wrapper = styled.div`
  padding: 90px 0 12px;
`
export const YanMenu = styled.div`
  width: ${props => props.acik ? '210px' : '60px'};
  overflow-x: hidden;
  height: 100vh;
  top: 0;
  left: 0;
  position: fixed;
  overflow-y: auto;
  background-color: ${ArayuzRenkleri.yanMenu};
  border-right: 1px solid ${Colors.LIGHT_GRAY3};
  
  
`
export const YanMenuIcon = styled.div`
  padding-top: 60px;
  left: 10%;
  position: absolute;
`
export const MenuBaslik = styled.div`
  font-size: 1em;
  font-weight: 600;
`


