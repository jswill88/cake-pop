import { useContext } from 'react';
import { Context } from '../context/context'


import Typography from 'antd/es/typography';
const { Title } = Typography;

export default function SongTitle() {

  const {
    title,
    rename
  } = useContext(Context);
  
  return (
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
  )
}