import { useContext, useState } from 'react';
import { Context } from '../context/context';
import SongDropDown from './SongDropDown';
import PrimaryButtons from './PrimaryButtons';
import Controls from './Controls';

import Row from 'antd/es/row';
import Col from 'antd/es/col';
import Typography from 'antd/es/typography';
import Divider from 'antd/es/divider';
import Button from 'antd/es/button';
import Popconfirm from 'antd/es/popconfirm';
import Modal from 'antd/es/modal';
import Form from 'antd/es/form';
import Input from 'antd/es/input';

import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import Tooltip from 'antd/es/tooltip';

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
        // gutter={8}
        align="middle"
        justify="space-between"
      >
        <Col
          // pan={{xs: 20, sm: 17, md: 16, lg: 10}} 
          // style={{backgroundColor: 'lightblue'}}
          span={8}
        >
          <Title
            level={2}
            editable={{
              tooltip: false,
              onChange: rename,
            }}
            style={{
              margin: 0,
            }}
            ellipsis
          >
            {title}
          </Title>
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

          <Paragraph
            style={{ fontSize: '14px' }}
            ellipsis
          >
            {loggedIn ? `🎵 Hi, ${user}! 🎵` : 'Sign in to save'}
          </Paragraph>
        </Col>
      </Row>
      <Row
        justify="space-between"
      >


        <Col>
          {loggedIn &&
            <>
              <SongDropDown />
              {!openSongId ?
                <Button
                  onClick={() => saveSong('new')}
                  size="large"
                  type="link"
                >
                  Save
                </Button>
                :
                <>
                  <Button
                    onClick={() => saveSong('update')}
                    size="large"
                    type="link"
                  >
                    Save
                  </Button>
                  <Button
                    onClick={() => {
                      // if the title typed in matches the title of the song as currently saved
                      // title, openSongId, songs
                      setShowSaveAsModal(true)
                    }}
                    size="large"
                    type="link"
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
                      size="large"
                      type="link"
                    >
                      New
                  </Button>
                  </Popconfirm>
                  <Popconfirm
                    title="Are you sure you want to delete this loop?"
                    onConfirm={() => deleteSong()}
                    placement="bottom"
                  >
                    <Tooltip
                      title="Delete Loop">

                      <Button
                        size="large"
                        icon={<DeleteOutlined />}
                        danger
                        type="link"

                      />
                    </Tooltip>
                  </Popconfirm>
                </>
              }
            </>
          }
        </Col>

        {/* <Col
        >
          <PrimaryButtons />
        </Col> */}
        {/* <Col
          span={10}
        >
          <Controls />
        </Col> */}
      </Row>
      {/* <Row> */}
      <Controls />
      <Divider />
      {/* </Row> */}
    </>
  );
}