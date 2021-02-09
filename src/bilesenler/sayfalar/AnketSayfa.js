import { Fragment } from 'react'
import { OrtaBolme, YanMenu } from '../../App'
import YanMenuItem from '../yan-menu/YanMenu'
import { AnketListe } from '../listeler'

export const AnketSayfa = () => (
  <Fragment>
    <YanMenu>
      <YanMenuItem/>
    </YanMenu>
    <OrtaBolme>
      <AnketListe/>
    </OrtaBolme>
  </Fragment>
)