import { RecoilRoot } from 'recoil'
import UrunLoader from './bilesenler/loader/UrunLoader'
import AnketLoader from './bilesenler/loader/AnketLoader'
import BultenLoader from './bilesenler/loader/BultenLoader'
import ReferansLoader from './bilesenler/loader/ReferansLoader'
import IdariKayitLoader from './bilesenler/loader/IdariKayitLoader'
import BirimLoader from './bilesenler/loader/BirimLoader'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import styled from 'styled-components'
import { Colors } from '@blueprintjs/core'
import HeaderBar from './bilesenler/HeaderBar'
import YanMenuItem from './bilesenler/yan-menu/YanMenu'
import {ArayuzRenkleri} from '@tuik/renkler'
import { IdariKayitSayfa, AnketSayfa, UrunSayfa , BultenSayfa} from './bilesenler/sayfalar'
import GlobalStyle from './bilesenler/globalStiller'
import { Fragment } from 'react'
const Wrapper = styled.div`
    padding: 0;
`
export const YanMenu = styled.div`
  width: 280px;
  height: 100vh;
  top:0;
  left:0;
  position: fixed;
  overflow-y: auto;
  background-color: ${ArayuzRenkleri.yanMenu};
  border-right: 1px solid ${Colors.LIGHT_GRAY3};
`
export const OrtaBolme = styled.div`
  margin-left: 280px;
  height: 100vh;
`
function App() {
  return (
    <Router>
      <RecoilRoot>
        <UrunLoader/>
        <AnketLoader/>
        <BultenLoader/>
        <ReferansLoader/>
        <IdariKayitLoader/>
        <BirimLoader/>
        <Wrapper>
          <HeaderBar/>
          <GlobalStyle/>
          <Switch>
            <Route path={"/urun"} component={UrunSayfa}/>
            <Route path={"/idari-kayit"} component={IdariKayitSayfa}/>
            <Route path={"/haber-bulteni"} component={BultenSayfa}/>
            <Route path={"/anket"} component={AnketSayfa}/>
            <Route exact path={"/"} component={Anasayfa}/>
          </Switch>
        </Wrapper>
      </RecoilRoot>
    </Router>
  );
}

const Anasayfa = () => (
  <Fragment>
    <YanMenu>
      <YanMenuItem/>
    </YanMenu>
    <OrtaBolme>
      <div style={{marginTop:"200px"}}>Yapım Aşamasında</div>
    </OrtaBolme>
  </Fragment>

)

export default App;
