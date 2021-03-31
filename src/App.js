import { RecoilRoot } from 'recoil'
import UrunLoader from './bilesenler/loader/UrunLoader'
import AnketLoader from './bilesenler/loader/AnketLoader'
import BultenLoader from './bilesenler/loader/BultenLoader'
import ReferansLoader from './bilesenler/loader/ReferansLoader'
import IdariKayitLoader from './bilesenler/loader/IdariKayitLoader'
import BirimLoader from './bilesenler/loader/BirimLoader'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import HeaderBar from './bilesenler/HeaderBar'
import YanMenuItem from './bilesenler/yan-menu/YanMenu'
import { IdariKayitSayfa, AnketSayfa, UrunSayfa, BultenSayfa } from './bilesenler/sayfalar'
import GlobalStyle from './bilesenler/globalStiller'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactKeycloakProvider } from '@react-keycloak/web'
import keycloak from './keycloak'
import useYanMenu from './bilesenler/yan-menu/useYanMenu'

const Wrapper = styled.div`
  padding: 0;
`

const OrtaBolme = styled.div`
  margin-left: ${props => props.acik ? "210px" : "60px"};
  height: 100vh;
`

const queryClient = new QueryClient()

function App () {

  const {
    acik,
    setAcik,
    handleYanMenuClick
  } = useYanMenu()
  return (
    <ReactKeycloakProvider
      authClient={keycloak}
    >
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
              <HeaderBar acik={acik} handleYanMenuClick={handleYanMenuClick}/>
              <GlobalStyle/>
              <YanMenuItem setAcik={setAcik} acik={acik} handleYanMenuClick={handleYanMenuClick}/>
              <OrtaBolme acik={acik}>
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
    </ReactKeycloakProvider>
  )
}

export default App
