import { useContext } from 'react';
import { Context } from '../context/context';
import SignInForm from './SignInForm';

import { Row, Col, Typography, Button } from 'antd';

const { Title } = Typography;

export default function Heading() {

  const {
    saveSong,
    logout,
    user,
    loggedIn,
    openSongId,
    newSong,
    setShowForm
  } = useContext(Context);

  return (
    <Row
      className="header"
      justify="space-between"
      align="middle"
      // style={{height: '100%'}}

    >
      <Col span={6}
        // justify="center"
        // align="middle"
      
      >
        <Title
          level={3}
          style={{ color: '#FFFFFF', margin:0 }}
        >
          🎂 Cake Mix 
        </Title>
      </Col>

      {/* <Col
      span={4}
      offset={8}
      >Next Col</Col> */}
      {loggedIn && <p>Hi {user}</p>}
      {!loggedIn ?
        <>
          <Col span={2}>
            <Button
              type="primary"
              onClick={(e) => {
                e.preventDefault()
                setShowForm(true)}
              }
            >
              Sign In
            </Button>
            <SignInForm />
          </Col>
        </>
        :
        <>
          <h1
            onClick={() => logout()}
          >Log Out</h1>
          <h1
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
          }

        </>

      }
    </Row>
  )
}