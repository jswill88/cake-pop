import UnorderedListOutlined from '@ant-design/icons/UnorderedListOutlined';
import Dropdown from 'antd/es/dropdown';
import Button from 'antd/es/button';
import { Link } from 'react-router-dom';
import HomeOutlined from '@ant-design/icons/HomeOutlined';
import InfoCircleOutlined from '@ant-design/icons/InfoCircleOutlined';

export default function Hamburger() {
  const items = [
  {
    key: '1',
    label: <Link to="/">Home</Link>,
    icon: <HomeOutlined />
  },
  {
    key: '2',
    label: <Link to="/info">Info</Link>,
    icon: <InfoCircleOutlined />
  },
];

  return (
    <Dropdown
      menu={{ items }}
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