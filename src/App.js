import Synth from './components/Synth';
import Heading from './components/Header';
// import SignInForm from './components/SignInForm'
import LoginProvider from './context/context';
import { Layout } from 'antd';
import "antd/dist/antd.css";
const { Header, Footer } = Layout;

function App() {
  return (
    <LoginProvider>
      <Layout>
        <Header>
          <Heading />
        </Header>
        {/* <SignInForm /> */}
        <Synth />
        <Footer>

        </Footer>
      </Layout>
    </LoginProvider>
  );
}

export default App;
