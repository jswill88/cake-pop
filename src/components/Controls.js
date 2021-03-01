import { useContext, useState } from 'react';
import { Context } from '../context/context';

import Button from 'antd/es/button';
import Select from 'antd/es/select';
import Typography from 'antd/es/typography';
import InputNumber from 'antd/es/input-number';
import Form from 'antd/es/form';
import Tooltip from 'antd/es/tooltip';
import Row from 'antd/es/row';
import Col from 'antd/es/col';

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
    <Row
      justify="space-between"
      // align="middle"
      style={{ marginTop: '1rem'}}
    >
            <Col
      // style={rowStyle}
      span={10}
      style={{display: 'flex', alignItems: 'center'}}
      // offset={1}
      >
        <Text>
          Length&nbsp;
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
          title="test"
          size="small"
          value={loopLength}
          onChange={val => {
            reset(true);
            setLoopLength(parseInt(val));
          }}
          style={{marginRight: '1rem'}}
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

      {/* </Col>
      <Col
        // style={{...rowStyle, justifyContent:'space-between'}}
        span={7}
      // style={{display: '  ', justifyContent: 'flex-start'}}
      > */}
        {/* // <Card
    // size="small"
    // > */}

        <Form
          layout="inline"
          component="span"
          colon
          // style={{ /*lineHeight: 1,*/ display: 'flex' ,justifyContent: 'flex-end', alignItems: 'flex-end', padding: '0 11px',  }}
          form={form}
        >

          <Form.Item
            label="BPM&nbsp;"
            name="tempo"
            tooltip={{
              title: "Enter a number between 50 and 320",
              placement: "bottom"
            }}
            validateStatus={tempoError ? 'error' : 'success'}
            initialValue={tempo}
            // style={{ /*lineHeight: 1,*/ justifyContent: 'flex-end', alignItems: 'flex-end',}}
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
            <>
              <Form.Item>
                <Button
                  size="small"
                  onClick={() => updateTempo()}
                >
                  Set
              </Button>
              </Form.Item>
              <Form.Item>
                <Button
                  size="small"
                  onClick={() => {
                    setEditTempo(false)
                    form.resetFields();
                  }}
                >
                  Cancel
              </Button>
              </Form.Item>
            </>

          }
        </Form>

      </Col>

      {/* <Col>
        <Text>Chords:&nbsp;</Text>
        <Space>
          {prog.map((progChord, i) =>
            <Select
              key={i}
              value={he.decode(progChord)}
              onChange={val => handleChordChange(val, i)}
              size="small"
              style={{ minWidth: '2rem' }}
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
 
      </Col> */}
      <Col
      // span={2}
      // offset={12}
      >
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
      </Col>
    </Row>
  )
}

// const rowStyle = { height: '32px', alignItems: 'center' }