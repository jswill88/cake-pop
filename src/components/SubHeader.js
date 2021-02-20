
import { useContext } from 'react';
import { Row, Col, Typography } from 'antd';
import { Context } from '../context/context';

const { Title } = Typography;

export default function SubHeader() {
  const {
    title,
    rename,
    loggedIn,
    user
  } = useContext(Context)
  return (
    <>
      <Row
        gutter={20}
      >
        <Col span={8}>
          <Title
            level={3}
            editable={{
              tooltip: false,
              onChange: rename,
            }}
            style={{
              margin: 0,
            }}
          >
            {title}
          </Title>
          {loggedIn &&
            <Typography>
              Hi, {user}
            </Typography>

          }
        </Col>
      </Row>
    </>

  );
}