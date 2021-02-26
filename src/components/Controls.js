import { useContext, useState } from 'react';
import he from 'he';
import { Context } from '../context/context';
import { CHORDS } from '../lib/noteInfo';

import Button from 'antd/es/button';
import Select from 'antd/es/select';
import Typography from 'antd/es/typography';
import InputNumber from 'antd/es/input-number';
import Form from 'antd/es/form';
import Tooltip from 'antd/es/tooltip';
import Row from 'antd/es/row';
import Space from 'antd/es/space';
import Card from 'antd/es/card';

import QuestionCircleOutlined from '@ant-design/icons/QuestionCircleOutlined'

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
    handleChordChange,
    stopAudio
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
          label="Tempo&nbsp;"
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
            stopAudio()
            setLoopLength(parseInt(val))
          }}
        >
          {[8, 12, 16, 20, 24].map((beats, i) =>
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
              style={{minWidth: '2rem'}}
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