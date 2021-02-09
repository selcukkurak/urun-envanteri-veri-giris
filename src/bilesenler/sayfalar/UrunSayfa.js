import { Fragment } from 'react'
import { OrtaBolme, YanMenu } from '../../App'
import YanMenuItem from '../yan-menu/YanMenu'
import UrunListe from '../listeler/UrunListe'

export const UrunSayfa = () => (
  <Fragment>
    <YanMenu>
      <YanMenuItem/>
    </YanMenu>
    <OrtaBolme>
      <UrunListe/>
    </OrtaBolme>
  </Fragment>
)