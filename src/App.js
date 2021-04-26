import { useContext, useEffect } from 'react';
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

import {useLoggedIn} from './context/loggedInContext/'
// import { useSongList } from './context/songListContext/'
import { SongListContext } from './context/songListContext/'
import { useCookies } from 'react-cookie';

import axios from 'axios';
axios.defaults.withCredentials = true;

const { Header, Footer, Content } = Layout;

function App() {

  const {
    isMobile
  } = useContext(Context);

  const { setUser, setLoggedIn } = useLoggedIn()
  const { setSongs } = useContext(SongListContext);
  const [cookies] = useCookies(['token']);

  
  useEffect(() => {
    const checkLoggedIn = async () => {
      console.log('cookie check in APP.js')
      const token = cookies.token
      const result = await axios({
        url: process.env.REACT_APP_URL + '/api/v1/loggedIn',
        method: 'post',
        data: { token }
      })
  
      if (result.data) {
        setSongs(result.data.songList);
        setUser(result.data.username);
        setLoggedIn(true);
      }
    }
    checkLoggedIn();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <Router>
      <Layout style={{ minHeight: '100vh', minWidth: '280px'}}>

        <Header style={{ padding: 0  }} >
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
