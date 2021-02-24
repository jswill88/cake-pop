import { useContext, useState } from 'react';
import he from 'he';
import { Context } from '../context/context';
import { CHORDS } from '../lib/noteInfo';
import {
  Button,
  Select,
  Typography,
  InputNumber,
  Form,
  Tooltip,
  Row,
  Space,
  Card
} from 'antd';

import { QuestionCircleOutlined } from '@ant-design/icons'

const { Option } = Select;
const { Text } = Typography

export default function Controls() {

  const {
    reset,
    setPlayStatus,
    loopLength,
    setLoopLength,
    tempo,
    handleTempoChange,
    prog,
    handleChordChange
  } = useContext(Context)

  const [editTempo, setEditTempo] = useState(false);
  const [tempoError, setTempoError] = useState(false);

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
    <Card
    size="small"
    draggable={true}
    >
      <Row
      style={{...rowStyle, justifyContent:'space-between'}}
      >

      <Form
        layout="inline"
        component="span"
        colon
        style={{ lineHeight: 1, alignItems: 'center', justifyContent:'space-between' }}
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
      <Button
          onClick={() => {
            reset();
            setPlayStatus('stop')
          }}
          size="small"
          danger
        >
          Reset
      </Button>
      </Row>
      <Row
        style={rowStyle}
      >
        <Text>
          Loop Length&nbsp;
        <Tooltip
            title="Changes how many beats are in the loop. Changing the loop length will discard all progress"
            placement="bottom"
          >
            <QuestionCircleOutlined
              style={{ color: 'rgba(0, 0, 0, 0.45)' }}
            />
          </Tooltip>&nbsp;:&nbsp;
        </Text>

        <Select
          size="small"
          value={loopLength}
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
              {beats}
            </Option>
          )}
        </Select>

      </Row>
      <Row
        style={rowStyle}
      >
        <Text>Chords:&nbsp;</Text>
        <Space>
          {prog.map((progChord, i) =>
            <Select
              key={i}
              value={he.decode(progChord)}
              onChange={val => handleChordChange(val, i)}
              size="small"
            >
              {CHORDS && Object.keys(CHORDS).map((chord, j) =>
                <Option
                  key={j}
                  value={chord}
                >{he.decode(chord)}</Option>
              )}
            </Select>
          )}
        </Space>
      </Row>
    </Card>
  )
}

const rowStyle = { height: '32px', alignItems: 'center' }