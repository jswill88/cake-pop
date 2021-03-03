import UnorderedListOutlined from '@ant-design/icons/UnorderedListOutlined';
import Menu from 'antd/es/menu';
import Dropdown from 'antd/es/dropdown';
import Divider from 'antd/es/divider'
import Button from 'antd/es/button';
import { Link } from 'react-router-dom'
import HomeOutlined from '@ant-design/icons/HomeOutlined'
import InfoCircleOutlined from '@ant-design/icons/InfoCircleOutlined'
// import color from 


export default function Hamburger() {

  const menu = (
    <Menu
    >
      <Menu.Item
        style={{ width: '50vw', fontSize: '1.2rem', /*color: '#000'*/ }}
        icon={<HomeOutlined style={{fontSize: '1.2rem' }}  />}
      >
        <Link to="/"
          // style={{color: '#000'}}
        >
          Looper
        </Link>
      </Menu.Item>
      <Divider style={{margin: 0}}/>
      <Menu.Item
        style={{ width: '50vw', fontSize: '1.2rem', /*color: '#ffffff'*/ }}
        icon={<InfoCircleOutlined style={{fontSize: '1.2rem' }}  />}
      >
        <Link
        to="/info"
        // style={{color: '#FFFFFF'}}
        >
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
        style={{ padding: 0 }}
      >
        <UnorderedListOutlined
          style={{
            color: '#000',
            marginRight: '1rem',
            fontSize: '1.3rem'
          }}
        />
      </Button>
    </Dropdown>

  )
}