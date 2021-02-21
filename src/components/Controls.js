import { useContext, useState } from 'react';
import { Context } from '../context/context';
import {
  Button,
  Select,
  Typography,
  InputNumber,
  Form
} from 'antd';



const { Option } = Select;
const { Text } = Typography

export default function Controls() {

  const {
    reset,
    setPlayStatus,
    loopLength,
    setLoopLength,
    tempo,
    handleTempoChange
  } = useContext(Context)

  const [editTempo, setEditTempo] = useState(false);
  const [tempoError, setTempoError]  = useState(false);


  const [form] = Form.useForm();

  const updateTempo = async () => {
    try {
      const { tempo } = await form.validateFields();
      handleTempoChange(tempo)
      setEditTempo(false)
    } catch (e) {
      console.log(e)
    }
  }

  const checkTempoErrors = async () => {
    try {
      const { tempo } = await form.validateFields();
      if (!/^\d+$/.test(tempo) || tempo < 50 || tempo > 320) setTempoError(true)
      else setTempoError(false)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <Form
        layout="inline"
        component="span"
        colon
        style={{ lineHeight: 1 }}
        form={form}
      >

        <Form.Item
          label="Tempo"
          name="tempo"
          tooltip={{
            title: "Enter a number between 50 and 320",
            placement: "bottom"
          }}
          validateStatus={tempoError ? 'error' : 'success'}

          initialValue={tempo}
          // rules={[{
          //   type: 'number',
          // }
          // ]}
        >
          {!editTempo ?
            <Text
            editable
            onClick={() => setEditTempo(true)}
            >{tempo}</Text> :
            <InputNumber
              size="small"
              onChange={() => checkTempoErrors()}
            />

          }
        </Form.Item>
        {editTempo &&
          <Form.Item>
            <Button
              size="small"
              onClick={() => updateTempo()}
            >
              Set
            </Button>
          </Form.Item>

        }


      </Form>
      <Text>Loop Length: </Text>
      <Select
        size="small"
        defaultValue={loopLength}
        onChange={val => {
          reset();
          setLoopLength(parseInt(val))
        }}
      >
        {[8, 12, 16, 20, 24, 28, 32].map((beats, i) =>
          <Option
            key={i}
            value={beats}
          >
            {beats} Beats
            </Option>
        )}
      </Select>
      <br />
      <Button
        onClick={() => {
          reset();
          setPlayStatus('stop')
        }}
        size="small"
      >
        Reset
      </Button>
    </>
  )
}