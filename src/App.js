import NoteColumns from './components/NoteColumns'
import Heading from './components/Header';
import ContextProvider from './context/context';
import SubHeader from './components/SubHeader';
import Foot from './components/Foot';
import Info from './components/Info';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


import './App.less'
import Layout from 'antd/es/layout';
const { Header, Footer, Content } = Layout;

function App() {
  return (
    <ContextProvider>
      <Router>
        <Layout style={{ minHeight: '100vh', minWidth: '280px' }}>

          <Header>
            <Heading />
          </Header>

          <Content style={{ padding: '1rem 3rem' }}>
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

          <Footer>
            <Foot />
          </Footer>

        </Layout>
      </Router>
    </ContextProvider>
  );
}

export default App;
