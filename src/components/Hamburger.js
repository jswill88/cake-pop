import UnorderedListOutlined from '@ant-design/icons/UnorderedListOutlined';
import Menu from 'antd/es/menu';
import Dropdown from 'antd/es/dropdown';
import Button from 'antd/es/button';
import { Link } from 'react-router-dom'



export default function Hamburger() {

  const menu = (
    <Menu>
      <Menu.Item
        // style={{ fontSize: '1rem' }}
      >
        <Link to="/">
          Looper
        </Link>
      </Menu.Item>
      <Menu.Item
        // style={{ fontSize: '1rem' }}
      >
        <Link to="/info">
          Info
        </Link>
      </Menu.Item>
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
        style={{padding: 0}}
      >
        <UnorderedListOutlined
          style={{
            color: '#ffffff',
            marginRight: '1rem',
            fontSize: '1.3rem'
          }}
        />
      </Button>
    </Dropdown>

  )
}