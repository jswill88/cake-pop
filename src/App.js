import Synth from './components/Synth';
import Heading from './components/Header';
import './App.css'
import ContextProvider from './context/context';
import { Layout } from 'antd';
import "antd/dist/antd.css";
import SubHeader from './components/SubHeader';
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
          <Synth />
        </Content>

        <Footer>
          &copy; 2021 Josh Williams
        </Footer>

      </Layout>
    </ContextProvider>
  );
}

export default App;
