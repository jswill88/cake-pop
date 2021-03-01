import { useContext } from 'react';
import { Context } from '../context/context';
import PrimaryButtons from './PrimaryButtons';
import Controls from './Controls';
import SongTitle from './SongTitle';
import UserGreeting from './UserGreeting';
import File from './File';
import Reset from './Reset'

import Row from 'antd/es/row';
import Col from 'antd/es/col';
import Divider from 'antd/es/divider';

export default function SubHeader() {
  const {
    loggedIn,
  } = useContext(Context)

  return (
    <>
      <Row
        align="middle"
        justify="space-between"
      >
        <Col
          span={8}
        >
          <SongTitle />
        </Col>
        <Col
          span={8}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <PrimaryButtons />
        </Col>
        <Col
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}
          span={8}
        >
          <UserGreeting />
        </Col>
      </Row>

      <Row
        justify="space-between"
      >
        <Col>
          {loggedIn && <File />}
        </Col>
      </Row>


      <Row
      justify="space-between"
      style={{ marginTop: '1rem' }}
    >
      <Col
        span={10}
        style={{ display: 'flex', alignItems: 'center' }}
      >
      <Controls />

      </Col>
      <Col>
        <Reset />
      </Col>

    </Row>
      <Divider />
    </>
  );
}