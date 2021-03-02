import { useContext } from 'react';
import { Context } from '../context/context';
import SignInForm from './SignInForm';
import Hamburger from './Hamburger';
import './Header.css';
import colors from '../colors';

import { Link } from 'react-router-dom';

import LoginOutlined from '@ant-design/icons/LoginOutlined';
import LogoutOutlined from '@ant-design/icons/LogoutOutlined';
import HomeOutlined from '@ant-design/icons/HomeOutlined'
import InfoCircleOutlined from '@ant-design/icons/InfoCircleOutlined'


import Row from 'antd/es/row';
import Col from 'antd/es/col';
import Button from 'antd/es/button'
import Typography from 'antd/es/typography';
import Menu from 'antd/es/menu'

const { Title } = Typography;

export default function Heading() {

  const {
    logout,
    loggedIn,
    setShowForm,
    screenSize,
    isMobile
  } = useContext(Context);

  return (
    <Row
      style={{padding: !screenSize.every(val => val === 'xs') ? '0 2rem 0 1rem' : '0 1rem'}}
      className="header"
      align="middle"
    >
      {isMobile && <Hamburger />}
      <Col
        flex={1}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <Title
          style={{ margin: '0 1rem 0 0' }}
        >🎂</Title>
        {!isMobile &&
          <>
            <Title
              level={2}
              style={{
                color: '#000',
                margin: '0 1rem 0 0',
                fontFamily: "'Varela Round', sans-serif",
                letterSpacing: '.1rem',
              }}
            >
              Cake Pop
        </Title>
            <Menu
              mode="horizontal"
              theme="dark"
              defaultActiveFirst={['1']}
            >
              <Menu.Item
                key="1"
                icon={<HomeOutlined />}
              >
                <Link to="/">
                  Looper
                </Link>
              </Menu.Item>
              <Menu.Item
                key="2"
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
            size="large"
          >
            {!isMobile && 'Log Out'}
          </Button>
        }
      </Col>
    </Row>
  )
}