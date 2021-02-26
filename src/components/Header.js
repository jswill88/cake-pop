import { useContext } from 'react';
import { Context } from '../context/context';
import SignInForm from './SignInForm';
import './Header.css';

import LoginOutlined from '@ant-design/icons/LoginOutlined';
import LogoutOutlined from '@ant-design/icons/LogoutOutlined';

import Row from 'antd/es/row';
import Col from 'antd/es/col';
import Button from 'antd/es/button'
import Typography from 'antd/es/typography';
const { Title } = Typography;

export default function Heading() {

  const {
    logout,
    loggedIn,
    setShowForm
  } = useContext(Context);

  return (
    <Row
      className="header"
      justify="space-between"
      align="middle"

    >
      <Col span={18}
      >
        <Title
          level={2}
          style={{
            color: '#FFFFFF',
            margin: 0,
            fontFamily: '\'Sniglet\', cursive',
            letterSpacing: '.1rem',
            // textShadow: '2px 2px 5px #24ddd8'
          }}
        >
          🎂 Cake Pop
        </Title>
      </Col>
      <>
        <Col
          span={{ xs: 6, sm: 6, md: 3, lg: 3 }}
        >
          {!loggedIn ?
            <>
              <Button
                style={{ width: '100%' }}
                type="primary"
                onClick={() => {
                  setShowForm(true)
                }}
                icon={<LoginOutlined />}
              >
                Sign In
              </Button>
              <SignInForm />
            </>
            :
            <Button
              style={{ width: '100%' }}
              type="primary"
              onClick={() => {
                logout();
              }}
              icon={<LogoutOutlined />}
            >
              Log Out
            </Button>
          }
        </Col>
      </>
    </Row>
  )
}