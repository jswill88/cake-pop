import { useContext } from 'react';
import { Context } from '../context/context';
import SignInForm from './SignInForm';
import './Header.css'

import { Row, Col, Typography, Button } from 'antd';

const { Title } = Typography;

export default function Heading() {

  const {
    // saveSong,
    logout,
    // user,
    loggedIn,
    // openSongId,
    // newSong,
    setShowForm
  } = useContext(Context);

  return (
    <Row
      className="header"
      justify="space-between"
      align="middle"
    >
      <Col span={6}
      >
        <Title
          level={2}
          style={{
            color: '#FFFFFF',
            margin: 0,
            fontFamily: '\'Sniglet\', cursive'
          }}
        >
          🎂 Cake Mix
        </Title>
      </Col>

      {/* <Col
      span={4}
      offset={8}
      >Next Col</Col> */}
      {/* {loggedIn && <p>Hi {user}</p>} */}
      <>
        <Col
        span={3}
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
      <>
        {/* <h1
          onClick={() => logout()}
        >Log Out</h1> */}
        {/* <h1
            onClick={() => saveSong('new')}
          >Save{openSongId && ' As'}</h1>
          {openSongId &&
            <>
              <h1
                onClick={() => saveSong('update')}
              >Save Changes</h1>
              <h1
                onClick={() => newSong()}
              >Start New Song</h1>
            </>
          } */}

      </>

      {/* } */}
    </Row>
  )
}