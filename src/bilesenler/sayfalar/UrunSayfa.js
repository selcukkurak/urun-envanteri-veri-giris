import UrunListe from '../listeler/UrunListe'
import { Switch, Route } from 'react-router-dom'
import UrunEklemeForm from '../form/urun/UrunEklemeForm'
import UrunGuncellemeFormu from '../form/urun/UrunGuncellemeFormu'
import UrunDetay from '../detaylar/UrunDetay'

export const UrunSayfa = ({ match }) => (
  <Switch>
    <Route path={`${match.url}/yeni-urun`} component={UrunEklemeForm}/>
    <Route path={`${match.url}/detay/:id`} component={UrunDetay}/>
    <Route path={`${match.url}/guncelle/:id`} component={UrunGuncellemeFormu}/>
    <Route path="/urunler" component={UrunListe}/>
  </Switch>
)