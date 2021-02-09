import { OrtaBolme, YanMenu } from '../../App'
import YanMenuItem from '../yan-menu/YanMenu'
import {  BultenListe } from '../listeler'
import { Fragment } from 'react'

export const BultenSayfa = () => (
  <Fragment>
    <YanMenu>
      <YanMenuItem/>
    </YanMenu>
    <OrtaBolme>
      <BultenListe/>
    </OrtaBolme>
  </Fragment>
)