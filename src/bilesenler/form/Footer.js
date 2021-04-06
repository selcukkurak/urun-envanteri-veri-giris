import React from 'react'
import useYanMenu from '../yan-menu/useYanMenu'
import styled from 'styled-components'
import {Row} from 'react-grid-system'
import { Colors } from '@blueprintjs/core'

const FooterAlani = styled(Row)`
  margin-top: 1rem;
  padding: 1rem;
  background-color: ${Colors.LIGHT_GRAY5};
  position: fixed;
  bottom: 0;
  right: 0;
  width: ${props => props.acik ? `${props.boy-211}px` : `${props.boy-61}px`};
`
export default function Footer(props){
  const {boy, acik} = useYanMenu()

  return(
    <FooterAlani boy={boy} acik={acik}>
      {props.children}
    </FooterAlani>
  )
}