import { BultenListe } from '../listeler'
import { Switch,Route } from 'react-router-dom'

export const BultenSayfa = () => (
  <Switch>
    <Route path={"/haber-bultenleri"} component={BultenListe}/>
  </Switch>
)