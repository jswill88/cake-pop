import { useContext, useEffect } from 'react';
import { Context } from '../context/context';
import { SongListContext } from '../context/songListContext/';
import { useOpenSong } from '../context/openSongContext/'

import Menu from 'antd/es/menu';
import Dropdown from 'antd/es/dropdown';
import Button from 'antd/es/button';
import DownOutlined from '@ant-design/icons/DownOutlined';

export default function SongDropDown() {

  const { isMobile } = useContext(Context)

  const { songs } = useContext(SongListContext);

  const { open } = useOpenSong();

  useEffect(() => console.log('songs in dropdown', songs), [songs])

  const handleSongChoice = e => open(e.key);

  const buttonSize = () => isMobile ? "small" : "large";

  const menu = (
    <Menu
      onClick={handleSongChoice}
      >
      {songs.map(({ title, id }, i) =>
        <Menu.Item
        key={id}
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
        type="text"
        size={buttonSize()}
        style={{paddingLeft: 0}}
      >
        Open<DownOutlined />
      </Button>
    </Dropdown>

  )
}