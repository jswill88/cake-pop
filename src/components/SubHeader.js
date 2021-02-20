
import { useContext, useState } from 'react';
import {
  Row,
  Col,
  Typography,
  Divider,
  Button,
  Popconfirm,
  Modal,
  Form,
  Input
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

  const [showSaveAsModal, setShowSaveAsModal] = useState(false)
  const [form] = Form.useForm();

  const saveAsHandler = async () => {
    const { newTitle } = await form.validateFields()
    saveSong('new', newTitle)
    closeModal()
  }

  const closeModal = () => {
    form.resetFields();
    setShowSaveAsModal(false)
  }

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
                  Save
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
                    // onClick={() => saveSong('new')}
                    onClick={() => setShowSaveAsModal(true)}
                    size="small"
                  >
                    Save As
                  </Button>
                  <Modal
                    title="Save As"
                    visible={showSaveAsModal}
                    okText="Save"
                    onCancel={() => setShowSaveAsModal(false)}
                    onOk={() => saveAsHandler()}
                  >

                    <Form
                      layout="vertical"
                      form={form}
                      preserve={false}
                    >
                      <Form.Item
                        label="Enter a new title"
                        name="newTitle"
                        rules={[
                          {
                            required: true,
                            message: 'Please enter a new title'
                          }
                        ]}
                      >
                        <Input
                        placeholder={`Copy of ${title}`}
                        />
                      </Form.Item>

                    </Form>

                  </Modal>
                  <Popconfirm
                    title="Do you want to save your current work first?"
                    placement="bottom"
                    okText="Save"
                    cancelText="Don't Save"
                    onCancel={() => newSong()}
                    onConfirm={() => {
                      saveSong('update');
                      newSong();
                    }}
                  >
                    <Button
                      size="small"
                    >
                      New
                  </Button>
                  </Popconfirm>
                  <Popconfirm
                    title="Are you sure you want to delete this loop?"
                    onConfirm={() => deleteSong()}
                    placement="bottom"
                  >
                    <Button
                      size="small"
                      icon={<DeleteOutlined />}
                      danger
                    />
                  </Popconfirm>
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