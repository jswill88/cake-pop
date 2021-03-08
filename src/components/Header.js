import { useContext } from 'react';
import { Context } from '../context/context';
import SignInForm from './SignInForm';
import Hamburger from './Hamburger';
import './Header.css';
import Logo from '../images/cake-pop.jpg';

import { Link } from 'react-router-dom';

import LoginOutlined from '@ant-design/icons/LoginOutlined';
import LogoutOutlined from '@ant-design/icons/LogoutOutlined';
import HomeOutlined from '@ant-design/icons/HomeOutlined'
import InfoCircleOutlined from '@ant-design/icons/InfoCircleOutlined'


import Row from 'antd/es/row';
import Col from 'antd/es/col';
import Button from 'antd/es/button'
import Typography from 'antd/es/typography';
import Menu from 'antd/es/menu';
import Image from 'antd/es/image';

const { Title } = Typography;

export default function Heading() {

  const {
    logout,
    loggedIn,
    setShowForm,
    screenSize,
    isMobile,
    selectedMenuItem
  } = useContext(Context);

  return (
    <Row
      style={{padding: !screenSize.every(val => val === 'xs') ? '0 2rem 0 1rem' : '0 1rem',  maxWidth: '2000px', margin: '0 auto'}}
      className="header"
      align="middle"
    >
      {isMobile && <Hamburger />}
      <Col
        flex={1}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <Image
        src={Logo}
        alt="Logo"
        width={38}
        />
            <Title
              level={isMobile ? 5 : 2}
              style={{
                color: '#000',
                margin: '0 1rem 0 .5rem',
                fontFamily: "'Varela Round', sans-serif",
                letterSpacing: '.1rem',
              }}
            >
              Cake Pop
        </Title>
              {!isMobile &&
                <>
            <Menu
              mode="horizontal"
              theme="dark"
              defaultSelectedKeys={[selectedMenuItem]}
            >
              <Menu.Item
                key="home"
                icon={<HomeOutlined />}
              >
                <Link to="/">
                  Home
                </Link>
              </Menu.Item>
              <Menu.Item
                key="info"
                icon={<InfoCircleOutlined />}
              >
                <Link to="/info">
                  Info
                </Link>
              </Menu.Item>

            </Menu>
          </>
        }
      </Col>
      <Col>
        {!loggedIn ?
          <>
            <Button
              style={{ minWidth: '100%' }}
              type="primary"
              onClick={() => {
                setShowForm(true)
              }}
              icon={<LoginOutlined />}
              size="large"
            >
              {!isMobile && 'Sign In'}
            </Button>
            <SignInForm />
          </>
          :
          <Button
            style={{ minWidth: '100%' }}
            type="primary"
            onClick={() => {
              logout();
            }}
            icon={<LogoutOutlined />}
            size="middle"
          >
            {!isMobile && 'Log Out'}
          </Button>
        }
      </Col>
    </Row>
  )
}