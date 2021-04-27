import { useContext } from 'react';


import Typography from 'antd/es/typography';
import { OpenSongContext, useOpenSong } from '../context/openSongContext/';
const { Title } = Typography;

export default function SongTitle() {

  const {
    title,
  } = useContext(OpenSongContext)

  const { rename } = useOpenSong()
  
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