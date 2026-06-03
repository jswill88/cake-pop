import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {
  theme,
  Layout,
  App as AntApp,
  ConfigProvider
} from 'antd';
import axios from 'axios';
import NoteColumns from './components/NoteColumns'
import Header from './components/Header';
import SubHeader from './components/SubHeader';
import Footer from './components/Footer';
import Info from './components/Info';
import useIsMobile from './hooks/useIsMobile';
import { PURPLE, CYAN, YELLOW, PINK, BLACK, WHITE } from './constants/colors'

axios.defaults.withCredentials = true;
const { Header: AntHeader, Footer: AntFooter, Content } = Layout;

function App() {
  const isMobile = useIsMobile();

  return (
    <Router>
      <ConfigProvider
        theme={{
          cssVar: { key: 'app' },
          algorithm: theme.defaultAlgorithm,
          components: {
            Layout: {
              bodyBg: PURPLE,
              headerBg: CYAN,
              footerBg: PURPLE
            },
            Button: {
              colorPrimaryBorder: '#f9d673',
              algorithm: true,
              colorBgContainer: 'transparent',
              colorTextLightSolid: PURPLE,
              yellowShadowColor: 'none',
              cyanShadowColor: 'none',
              redShadowColor: 'none',
              greenShadowColor: 'none',
              pinkShadowColor: 'none',
              dangerShadow: 'none'
            },
            Menu: {
              itemActiveBg: YELLOW,
              itemSelectedColor: BLACK,
              itemBg: CYAN,
              itemColor: BLACK,
              itemHoverColor: BLACK,
              horizontalItemSelectedBg: YELLOW,
              horizontalItemSelectedColor: BLACK,
              activeBarHeight: 0,
              linkHoverDecoration: 'underline',
              linkFocusDecoration: 'underline'
            },
            Dropdown: {
              paddingXXS: 0
            },
            Form: {
              labelColor: WHITE
            },
            Divider: {
              colorSplit: WHITE
            },
            Modal: {
              titleColor: WHITE
            },
            Card: {
              colorBgContainer: 'transparent'
            },
          },
          token: {
              colorText: WHITE,
              colorTextHeading: WHITE,
              cyan: CYAN,
              purple: PURPLE,
              pink: PINK,
              yellow: YELLOW,
              colorPrimaryBorder: '#f9d673',
          }
        }}
      >
        <AntApp>
          <Layout style={{ minHeight: '100vh', minWidth: '280px'}}>
            <AntHeader style={{ padding: 0 }}>
              <Header />
            </AntHeader>

            <Content
              style={{
                padding: isMobile ? '.5rem .5rem' : '1rem 2rem',
                width: '100%',
                maxWidth: '2000px',
                margin: '0 auto'
              }}
            >
              <Switch>
                <Route exact path="/">
                  <SubHeader />
                  <NoteColumns />
                </Route>
                <Route path="/info">
                  <Info />
                </Route>
              </Switch>
            </Content>

            <AntFooter>
              <Footer />
            </AntFooter>
          </Layout>
        </AntApp>
      </ConfigProvider>
    </Router>
  );
}

export default App;
