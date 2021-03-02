import { RecoilRoot } from 'recoil'
import UrunLoader from './bilesenler/loader/UrunLoader'
import AnketLoader from './bilesenler/loader/AnketLoader'
import BultenLoader from './bilesenler/loader/BultenLoader'
import ReferansLoader from './bilesenler/loader/ReferansLoader'
import IdariKayitLoader from './bilesenler/loader/IdariKayitLoader'
import BirimLoader from './bilesenler/loader/BirimLoader'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { Colors } from '@blueprintjs/core'
import HeaderBar from './bilesenler/HeaderBar'
import YanMenuItem from './bilesenler/yan-menu/YanMenu'
import { ArayuzRenkleri } from '@tuik/renkler'
import { IdariKayitSayfa, AnketSayfa, UrunSayfa, BultenSayfa } from './bilesenler/sayfalar'
import GlobalStyle from './bilesenler/globalStiller'
import { QueryClient, QueryClientProvider } from 'react-query'

const Wrapper = styled.div`
  padding: 0;
`
const YanMenu = styled.div`
  width: 210px;
  height: 100vh;
  top: 0;
  left: 0;
  position: fixed;
  overflow-y: auto;
  background-color: ${ArayuzRenkleri.yanMenu};
  border-right: 1px solid ${Colors.LIGHT_GRAY3};
`
const OrtaBolme = styled.div`
  margin-left: 210px;
  height: 100vh;
`

const queryClient = new QueryClient();
function App () {
  return (
    <Router>
      <RecoilRoot>
        <UrunLoader/>
        <AnketLoader/>
        <BultenLoader/>
        <ReferansLoader/>
        <IdariKayitLoader/>
        <BirimLoader/>
        <QueryClientProvider client={queryClient}>
          <Wrapper>
            <HeaderBar/>
            <GlobalStyle/>
            <YanMenu>
              <YanMenuItem/>
            </YanMenu>
            <OrtaBolme>
              <Switch>
                <Redirect exact from={'/'} to={'/urunler'}/>
                <Route path={'/urunler'} component={UrunSayfa}/>

                <Route path={'/idari-kayitlar'} component={IdariKayitSayfa}/>

                <Route path={'/haber-bultenleri'} component={BultenSayfa}/>
                <Route path={'/anketler'} component={AnketSayfa}/>
              </Switch>
            </OrtaBolme>
          </Wrapper>
        </QueryClientProvider>
      </RecoilRoot>
    </Router>
  )
}

export default App
