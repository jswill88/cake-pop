import { useContext } from 'react';
import { Context } from '../context/context';
import { useLoggedIn } from '../context/LoggedInContext/';

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
  const { isMobile } = useContext(Context)

  const { loggedIn } = useLoggedIn()

  return (
    <>
      <Row
        align="middle"
        justify="space-between"
        style={{ marginBottom: '1rem' }}
      >
        <Col
          xs={{ span: 24 }}
          sm={{ span: 8 }}
        >
          <SongTitle />
        </Col>
        {!isMobile &&
          <>
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
          </>
        }
      </Row>
      {isMobile &&
        <Row
          align="middle"
          justify="space-between"
          style={{ margin: '.5rem 0' }}
        >
          <Col
            // span={7}
            style={{ display: 'flex', justifyContent: 'flex-start', marginRight: '.5rem' }}
          >
            <PrimaryButtons />

          </Col>
          <Col>
            <UserGreeting />
          </Col>
        </Row>
      }

      <Row
        justify="space-between"
        style={{ margin: '1rem 0' }}
      >
        <Col>
          {loggedIn && <File />}
        </Col>
      </Row>

      {isMobile ?
        <Controls />
        :
        <Row
          justify="space-between"
          align="middle"
        >
          <Col
            span={{ sm: 16, md: 10 }}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <Controls />

          </Col>
          <Col>
            <Reset />
          </Col>

        </Row>
      }
      <Divider
        style={{ margin: isMobile && '6px 0' }}
      />
    </>
  );
}