
import { useContext } from 'react';
import {
  Row,
  Col,
  Typography,
  Divider,
  Button,
} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { Context } from '../context/context';
import SongDropDown from './SongDropDown';

const { Title, Paragraph } = Typography;

export default function SubHeader() {
  const {
    title,
    rename,
    loggedIn,
    user,
    openSongId,
    saveSong,
    newSong,
    deleteSong
  } = useContext(Context)
  return (
    <>
      <Row
        gutter={8}
      >
        <Col
          span={8}
        >
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
            <>
              <Paragraph>
                Hi, {user}
              </Paragraph>
              <SongDropDown />
              {!openSongId ?
                <Button
                  onClick={() => saveSong('new')}
                  size="small"
                >
                  Save {openSongId && ' As'}
                </Button>
                :
                <>
                  <Button
                    onClick={() => saveSong('update')}
                    size="small"
                  >
                    Save
                  </Button>
                  <Button
                    onClick={() => saveSong('new')}
                    size="small"
                  >
                    Save As
                  </Button>
                  <Button
                    onClick={() => newSong()}
                    size="small"
                  >
                    New
                  </Button>
                  <Button
                    onClick={() => deleteSong()}
                    size="small"
                    icon={<DeleteOutlined />}
                    danger
                  />
                </>
              }
            </>
          }
        </Col>
      </Row>
      <Divider />
    </>

  );
}