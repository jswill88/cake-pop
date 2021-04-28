import { useContext, useState } from 'react';
import { Context } from '../context/context';

import Reset from './Reset';

import Button from 'antd/es/button';
import Select from 'antd/es/select';
import Typography from 'antd/es/typography';
import InputNumber from 'antd/es/input-number';
import Form from 'antd/es/form';
import Tooltip from 'antd/es/tooltip';
import Row from 'antd/es/row';
import Col from 'antd/es/col'

import QuestionCircleOutlined from '@ant-design/icons/QuestionCircleOutlined';
import CloseSquareOutlined from '@ant-design/icons/CloseCircleOutlined';
import colors from '../lib/colors';
import { SongSettingsContext, useStoppingFunctions } from '../context/SongSettingsContext';
import { ToneContext, useTone } from '../context/ToneContext';

const { Option } = Select;
const { Text } = Typography

export default function Controls() {
  const { isMobile } = useContext(Context);
  
  return (
    <>
      {isMobile ?
        <>
          <Row justify='space-between' style={{ margin: '1rem 0'}}>
            <LoopLength />
            <Reset />
          </Row>
          <Row
            justify="space-between"
            align="middle"
            style={{ height: '42px' }}
          >
            <Col
              span={24}
            >
              <TempoSetter />
            </Col>
          </Row>
        </>
        :
        <>
          <LoopLength />
          <TempoSetter />
        </>
      }
    </>
  )
}


function LoopLength() {
  const { isMobile } = useContext(Context)

  const { handleLoopLengthChange } = useStoppingFunctions();
  const { loopLength } = useContext(SongSettingsContext)

  return (
    <div>
      <Text>
        Length&nbsp;
        <Tooltip
          title="Changes how many beats are in the loop. Changing the loop length will discard all progress"
          placement="bottom"
        >
          <QuestionCircleOutlined
            style={{ color: colors.white }}
          />
        </Tooltip>&nbsp;:&nbsp;
        </Text>

      <Select
        title="test"
        size={isMobile ? "small" : "small"}
        value={loopLength}
        onChange={val => {
          handleLoopLengthChange(val);
        }}
        style={{ marginRight: '1rem' }}
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
    </div>
  )
}

function TempoSetter() {
  const { isMobile } = useContext(Context)

  const { tempo } = useContext(ToneContext);

  const { handleTempoChange } = useTone()

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
    <Form
      layout="inline"
      component="span"
      colon
      form={form}
      style={{ flexWrap: 'nowrap', height: '100%' }}
    >


      <Form.Item
        label="Tempo&nbsp;"
        name="tempo"
        tooltip={{
          title: "Enter a number between 50 and 320",
          icon: <QuestionCircleOutlined style={{ color: '#ffffff'}} />,
          placement: "bottom",
          style: {
            color: 'pink',
          }
        }}
        validateStatus={tempoError ? 'error' : 'success'}
        initialValue={tempo}
        style={isMobile && {flexWrap: 'nowrap', width: '5rem'}}
        >

        {!editTempo ?
          <Text
            editable
            onClick={() => setEditTempo(true)}
            
          >
            {tempo}
          </Text>
        :

        
          <InputNumber
          size={isMobile ? "small" : "small"}
          onChange={() => checkTempoErrors()}
          style={{width: isMobile && '5rem'}}
          />
        }
      </Form.Item>
        

      {editTempo &&
        <>
          <Form.Item>
            <Button
              size={isMobile ? "small" : "small"}
              onClick={() => updateTempo()}
              style={{marginLeft: isMobile && '5rem'}}
            >
              Set
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              size={isMobile ? "small" : "small"}
              onClick={() => {
                setEditTempo(false)
                form.resetFields();
              }}
              icon={<CloseSquareOutlined style={{color: colors.white}} />}
              danger
              type="text"
           />
          </Form.Item>
        </>
      }
    </Form>
  )
}