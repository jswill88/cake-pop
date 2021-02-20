import Synth from './components/Synth';
import Heading from './components/Header';

import LoginProvider from './context/context';
import { Layout } from 'antd';
import "antd/dist/antd.css";
import SubHeader from './components/SubHeader';
const { Header, Footer, Content } = Layout;

function App() {
  return (
    <LoginProvider>
      <Layout>
        <Header>
          <Heading />
        </Header>
        <Content
          style={{padding: '1rem 3rem'}}
        >
          <SubHeader />
          <Synth />
        </Content>

        <Footer>

        </Footer>
      </Layout>
    </LoginProvider>
  );
}

export default App;
