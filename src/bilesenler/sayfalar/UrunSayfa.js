import UrunListe from '../listeler/UrunListe'
import { Switch, Route } from 'react-router-dom'
import UrunEklemeForm from '../form/urun/UrunEklemeForm'
import UrunGuncellemeFormu from '../form/urun/UrunGuncellemeFormu'

export const UrunSayfa = ({ match }) => (
  <Switch>
    <Route path={`${match.url}/yeni-urun`} component={UrunEklemeForm}/>
    <Route path={`${match.url}/guncelle/:id`} component={UrunGuncellemeFormu}/>
    <Route path="/urunler" component={UrunListe}/>
  </Switch>
)