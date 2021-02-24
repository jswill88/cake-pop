import NoteColumns from './components/NoteColumns'
import Heading from './components/Header';
import ContextProvider from './context/context';
import SubHeader from './components/SubHeader';

import './App.css'
import Layout from 'antd/es/layout';
const { Header, Footer, Content } = Layout;

function App() {
  return (
    <ContextProvider>
      <Layout style={{minHeight: '100vh'}}>

        <Header>
          <Heading />
        </Header>

        <Content style={{padding: '1rem 3rem'}}>
          <SubHeader />
          <NoteColumns />
        </Content>

        <Footer>
          &copy; 2021 Josh Williams
        </Footer>

      </Layout>
    </ContextProvider>
  );
}

export default App;
