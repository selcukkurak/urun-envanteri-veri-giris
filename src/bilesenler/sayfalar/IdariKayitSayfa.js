import { Fragment } from 'react'
import { OrtaBolme, YanMenu } from '../../App'
import YanMenuItem from '../yan-menu/YanMenu'
import { IdariKayitListe } from '../listeler'

export const IdariKayitSayfa = () => (
  <Fragment>
    <YanMenu>
      <YanMenuItem/>
    </YanMenu>
    <OrtaBolme>
      <IdariKayitListe/>
    </OrtaBolme>
  </Fragment>
)