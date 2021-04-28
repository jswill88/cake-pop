import { useContext, useState } from 'react';
import { Context } from '../context/context'
import { OpenSongContext, useOpenSong } from '../context/OpenSongContext/';
import SongDropDown from './SongDropDown';
import Button from 'antd/es/button';
import Modal from 'antd/es/modal';
import Form from 'antd/es/form';
import Input from 'antd/es/input';
import Popconfirm from 'antd/es/popconfirm';
import Tooltip from 'antd/es/tooltip';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';

export default function File() {

  const [showSaveAsModal, setShowSaveAsModal] = useState(false)

  const { isMobile } = useContext(Context)

  const { newSong, saveSong } = useOpenSong()

  const {
    title,
    openSongId
  } = useContext(OpenSongContext)

  const { deleteSong } = useOpenSong()

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

  const buttonSize = () => isMobile ? "small" : "large";

  return (
    <>
      <SongDropDown />
      {!openSongId ?
        <Button
          onClick={() => saveSong('new')}
          size="large"
          type="text"
        >
          Save
        </Button>
        :
        <>
          <Button
            onClick={() => saveSong('update')}
            size={buttonSize()}
            type="text"
          >
            Save
          </Button>
          <Button
            onClick={() => setShowSaveAsModal(true)}
            size={buttonSize()}
            type="text"
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
              size={buttonSize()}
              type="text"
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
                size={buttonSize()}
                icon={<DeleteOutlined />}
                danger
                type="text"

              />
            </Tooltip>
          </Popconfirm>
        </>
      }
    </>
  )
}