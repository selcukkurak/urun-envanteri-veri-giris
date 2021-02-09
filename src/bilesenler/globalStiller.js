import { createGlobalStyle } from 'styled-components'
import { Colors } from '@blueprintjs/core'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${Colors.LIGHT_GRAY5};
  }
`

export default GlobalStyle
