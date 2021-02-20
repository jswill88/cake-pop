import { useContext } from 'react';
import { Menu, Dropdown, Button } from 'antd';
import { Context } from '../context/context';
import { DownOutlined } from '@ant-design/icons';

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
        size="small"
      >
        Open<DownOutlined />
      </Button>
    </Dropdown>

  )
}