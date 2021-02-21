import { useContext } from 'react';
import { Context } from '../context/context';
import { Button, Select } from 'antd';

const { Option } = Select;

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
      >Reset</Button>
      {/* <label>Number of beats:{' '} */}
        <Select
          title="Loop Length"
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