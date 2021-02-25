import { useContext } from 'react';
import { Context } from '../context/context';
import SignInForm from './SignInForm';
import './Header.css'

import Row from 'antd/es/row';
import Col from 'antd/es/col';
import Typography from 'antd/es/typography';
import Button from 'antd/es/button'
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
              }
              }
            >
              Log Out
            </Button>
          }
        </Col>
      </>
    </Row>
  )
}