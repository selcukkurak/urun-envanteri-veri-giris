import { Fragment } from 'react'
import { OrtaBolme } from '../../App'
import { IdariKayitListe } from '../listeler'
import { Route, Switch } from 'react-router-dom'
import IdariKayitEklemeFormu from '../form/idari-kayit/IdariKayitEklemeFormu'

export const IdariKayitSayfa = ({match}) => (
  <Fragment>
    <Switch>
      <Route path={`${match.url}/yeni-idariKayit`} component={IdariKayitEklemeFormu}/>
      <Route path="/idari-kayitlar" component={IdariKayitListe}/>
    </Switch>
  </Fragment>
)