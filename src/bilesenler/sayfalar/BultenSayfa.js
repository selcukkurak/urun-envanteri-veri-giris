import { BultenListe } from '../listeler'
import { Switch,Route } from 'react-router-dom'
import HaberBulteniEklemeForm from '../form/haber-bulteni/HaberBulteniEklemeForm'
import HaberBulteniGuncelleForm from '../form/haber-bulteni/HaberBulteniGuncelleForm'

export const BultenSayfa = ({match}) => (
  <Switch>
    <Route path={`${match.url}/guncelle/:id`} component={HaberBulteniGuncelleForm}/>
    <Route path={`${match.url}/yeni-bulten`} component={HaberBulteniEklemeForm}/>
    <Route path={"/haber-bultenleri"} component={BultenListe}/>
  </Switch>
)