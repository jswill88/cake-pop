import { useContext } from 'react';
import { Context } from './context/context';
import NoteColumns from './components/NoteColumns'
import Heading from './components/Header';
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

import axios from 'axios';
axios.defaults.withCredentials = true;

const { Header, Footer, Content } = Layout;

function App() {

  const {
    isMobile
  } = useContext(Context);
  return (
    <Router>
      <Layout style={{ minHeight: '100vh', minWidth: '280px' }}>

        <Header style={{ padding: 0 }} >
          <Heading />
        </Header>

        <Content
          style={{
            padding: isMobile ? '.5rem .5rem' : '1rem 2rem',
            width: '100%',
            maxWidth: '2000px',
            margin: '0 auto'
          }}>
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
  );
}

export default App;
