import { useContext, useState } from 'react';
import { Context } from '../context/context';
import SignInForm from './SignInForm';

import { Row, Col, Typography, Layout, Button } from 'antd';

// const { Header } = Layout;
const { Title } = Typography;

const styles = {
  border: '2px solid black',
  width: '200px',
  fontSize: '1em',
  textAlign: 'center'
}

export default function Heading() {
  // const [showForm, setShowForm] = useState(false);
  const {
    saveSong,
    logout,
    user,
    loggedIn,
    title,
    openSongId,
    newSong,
    showForm,
    setShowForm
  } = useContext(Context);

  return (
    <Row
      className="header"
      justify="space-between"
      align="middle"

    >
      <Col span={4}>
        <Title
          level={4}
          style={{ color: '#FFFFFF' }}
        >
          32 Beat Processor

        </Title>
      </Col>

      {/* <Col
      span={4}
      offset={8}
      >Next Col</Col> */}
      {loggedIn && <p>hi {user}</p>}
      {!loggedIn ?
        <>
          {/* <h1
            onClick={() => {
              // signUp({ test: 'ing' });
            }}
            style={{ ...styles, color: 'black' }}
          >Sign Up
          </h1> */}
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
          {/* {!showForm ?
            <h1
              onClick={() => setShowForm(true)}
              style={{ ...styles, color: 'black' }}
            >Sign In
         </h1> :
            <SignInForm setShowForm={setShowForm} />
          } */}
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