import { AnketListe } from '../listeler'
import { Route, Switch } from 'react-router-dom'
import AnketEklemeForm from '../form/anket/AnketEklemeForm'
import AnketGuncellemeForm from '../form/anket/AnketGuncellemeForm'
import AnketDetay from '../detaylar/AnketDetay'

export const AnketSayfa = ({ match }) => (
  <Switch>
    <Route path={`${match.url}/guncelle/:id`} component={AnketGuncellemeForm}/>
    <Route path={`${match.url}/detay/:id`} component={AnketDetay}/>
    <Route path={`${match.url}/yeni-anket`} component={AnketEklemeForm}/>
    <Route path="/anketler" component={AnketListe}/>
  </Switch>
)