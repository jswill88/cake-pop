import { useContext } from 'react';
import { Context } from '../context/context';

import Menu from 'antd/es/menu';
import Dropdown from 'antd/es/dropdown';
import Button from 'antd/es/button';
import DownOutlined from '@ant-design/icons/DownOutlined';

export default function SongDropDown() {
  const {
    songs,
    open
  } = useContext(Context)

  const handleSongChoice = e => open(songs[e.key].id);

  const menu = (
    <Menu
      onClick={handleSongChoice}
    >
      {songs.map(({ title, id }, i) =>
        <Menu.Item
          key={i}
          // style={{ fontSize: '1rem' }}
        >
          {title}
        </Menu.Item>
      )}
    </Menu>
  )

  return (

    <Dropdown
    overlay={menu}
    trigger="click"
    >
      <Button
        type="link"
        size="large"
      >
        Open<DownOutlined />
      </Button>
    </Dropdown>

  )
}