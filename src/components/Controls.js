import { useContext } from 'react';
import { Context } from '../context/context';
import { Button, Select, Typography } from 'antd';


const { Option } = Select;
const { Text } = Typography

export default function Controls() {

  const {
    reset,
    setPlayStatus,
    loopLength,
    setLoopLength,
  } = useContext(Context)

  return (
    <>
      <Button
        onClick={() => {
          reset();
          setPlayStatus('stop')
        }}
        size="small"
      >Reset</Button>
      <Text>Loop Length: </Text>
        <Select
        size="small"
          defaultValue={loopLength}
          onChange={val => {
            reset();
            setLoopLength(parseInt(val))
          }}
        >
          {[8, 12, 16, 20, 24, 28, 32].map((beats,i) =>
            <Option
              key={i}
              value={beats}
            >
              {beats} Beats
            </Option>
          )}
        </Select>
      {/* </label> */}

    </>
  )
}