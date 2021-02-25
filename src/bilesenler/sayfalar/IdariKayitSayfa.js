import { IdariKayitListe } from '../listeler'
import { Route, Switch } from 'react-router-dom'
import IdariKayitEklemeFormu from '../form/idari-kayit/IdariKayitEklemeFormu'
import IdariKayitGuncellemeForm from '../form/idari-kayit/IdariKayitGuncellemeForm'

export const IdariKayitSayfa = ({ match }) => (
  <Switch>
    <Route path={`${match.url}/yeni-idariKayit`} component={IdariKayitEklemeFormu}/>
    <Route path={`${match.url}/guncelle/:id`} component={IdariKayitGuncellemeForm}/>
    <Route path="/idari-kayitlar" component={IdariKayitListe}/>
  </Switch>
)